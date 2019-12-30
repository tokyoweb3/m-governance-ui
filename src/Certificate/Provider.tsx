import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form, Table, DropdownProps, Segment, Dimmer, Loader, Image} from 'semantic-ui-react';

declare function require(x: string): any;
const jwkToPem = require('jwk-to-pem');
const utils = require('pvtsutils');

export default function Provider ({ws, wsReady} : {ws: any, wsReady: boolean}) {
  const initialOption = [
    {
    key: "None",
    value: "None",
    text: "None"}
  ];

  const [selectedProvider, setSelectedProvider] = useState<string | undefined>("");
  const [providerOptions, setProviderOptions] = useState<{key: string; value: string; text:string;}[]>([]);
  const [providers, setProviders] = useState<{id: string; name: string; atr: string; }[]>([]);
  const [items, setItems ] = useState<{index:string; id: string; type: string; subjectName: string}[]>([]);

  const onChange = (_: any, data:DropdownProps) => {
    setSelectedProvider(data.value?.toString());
  }

  useEffect(() => {
    if(ws){
      main();
    }
  }, [wsReady])

  const refresh = async () => {
    if(selectedProvider) {
      getItems(selectedProvider);
    }
  }

  async function main() {
    ws.connect("127.0.0.1:31337")
      .on("error", function (e: any) {
        console.error(e);
      })
      .on("listening", async (e: any) => {
        // Check if end-to-end session is approved
        if (! await ws.isLoggedIn()) {
          const pin = await ws.challenge();
          // show PIN
          setTimeout(() => {
            alert("2key session PIN:" + pin);
          }, 100)
          // ask to approve session
          await ws.login();
        }
        await fillProviders();
        if(selectedProvider){
          await getItems(selectedProvider);
        }
        ws.cardReader
          .on("insert", fillProviders)
          .on("remove", fillProviders);
    });
  }
  const fillProviders = async() => {
    ws.info()
      .then((info: { providers: {id: string; name: string; atr: string}[] }) => {
        setProviderOptions([]);
        setProviders([]);
        for (const index in info.providers){
          setProviderOptions(oldValues => {
            return [
              ...oldValues,
              {
                key: info.providers[index].id,
                value: info.providers[index].id,
                text: info.providers[index].name
              }
            ];
          })
          setProviders(oldValues => {
            return[
              ...oldValues,
              {
                id: info.providers[index].id,
                name: info.providers[index].name,
                atr: info.providers[index].atr || "None"
              }
            ];
          })
        }
      });
  }

  async function getItems(providerId: string){
    const crypto = await ws.getCrypto(providerId);
    // console.log(crypto);
    await crypto.reset();
    // Check provider login
    if (! await crypto.isLoggedIn()) {
      // Request provider for PIN window
      await crypto.login();
    }

    let indexes = await crypto.certStorage.keys();

    let pubKey;

    setItems([]);
    // get certification as items
    for (const index of indexes) {
      try {
        const item = await crypto.certStorage.getItem(index);

        if(index === indexes[1]){
          pubKey = item.publicKey;
        }

        setItems(items => {
          return [
            ...items,
            {
              index,
              id: item.id,
              type: item.type,
              subjectName: item.subjectName,
            }
          ]
        })
      } catch (e) {
        console.error(`Cannot get ${index} from CertificateStorage`)
        console.error(e);
      }
    }

    // get keys as items
    indexes = await crypto.keyStorage.keys();
    for (const index of indexes) {
      try {
        const item = await crypto.keyStorage.getItem(index);
        setItems(items => {
          return [
            ...items,
            {
              index,
              id: item.id,
              type: item.type,
              subjectName: item.algorithm.name,
            }
          ]
        })
      } catch (e) {
        console.error(`Cannot get ${index} from CertificateStorage`)
        console.error(e);
      }
    }
  }
  
  async function downloadItem(e: { preventDefault: () => void; }, index: string){
    e.preventDefault();
    try{
    const crypto = await ws.getCrypto(selectedProvider);
    // await crypto.reset();
    if (! await crypto.isLoggedIn()) {
      await crypto.login();
    }
    const parts = index.split("-");
    let item;
    let pem;
    let hex;
    switch(parts[0]){
      case "x509":
        item = await crypto.certStorage.getItem(index);
        pem = await crypto.certStorage.exportCert("PEM", item);
        break;
      case "public":
        item = await crypto.keyStorage.getItem(index);
        const jwk = await crypto.subtle.exportKey("jwk", item);
        pem = jwkToPem(jwk);
        hex = utils.Convert.ToHex(pem);
        break;
      default: break;
    }
    console.log(pem);
    console.log(hex);
    // const thumbprint = await crypto.subtle.digest("SHA-1", raw);
    // console.log(thumbprint);

    // Download the certobject in json

    // let certObj={
    //   id: cert.id,
    //   issuerName: cert.issuerName,
    //   serialNumber: cert.serialNumber,
    //   version: cert.version,
    //   providerID: cert.providerID,
    //   notAfter: cert.notAfter,
    //   notBefore: cert.notBefore,
    //   subjectName: cert.subjectName,
    //   type: cert.type,
    //   publicKey:{
    //     algorithm: cert.publicKey.algorithm.name,
    //     extractable: cert.publicKey.extractable,
    //     id: cert.publicKey.id,
    //     hex: utils.Convert.ToHex(cert.raw),
    //   }
    // }

    // var dataStr = "data:text/pem;charset=utf-8," + encodeURIComponent(pem);
    // var downloadAnchorNode = document.createElement('a');
    // downloadAnchorNode.setAttribute("href",     dataStr);
    // downloadAnchorNode.setAttribute("download", index + ".pem");
    // document.body.appendChild(downloadAnchorNode); // required for firefox
    // downloadAnchorNode.click();
    // downloadAnchorNode.remove();
  }catch(e){console.error(e)}
  }

  if(!wsReady){
    return (
      <Segment>
      <Dimmer active inverted>
        <Loader size='large'>Connecting to WebcryptoSocket.
        Please install Fortify to use this feature!
        </Loader>
        
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Segment>
    );
  }
  return(
    <Segment>
      <h2>Enumerate providers and their contents</h2>
      <Form>
        <h3>1: Select provider:</h3>
        <Form.Field>
        <Dropdown
          placeholder='Providers'
          fluid
          label="Providers"
          onChange={onChange}
          search
          selection
          state='providers'
          options={providerOptions.length>0 ? providerOptions : initialOption}
        />
        </Form.Field>
        <Form.Field>
        <Button
            onClick={refresh}
            primary
            type='submit'
        >
            Refresh
        </Button>
        </Form.Field>
      </Form>

      <div>
        <h3>Providers:</h3>
        <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>ATR</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {providers.map((provider, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{provider.id}</Table.Cell>
                <Table.Cell>{provider.name}</Table.Cell>
                <Table.Cell>{provider.atr || "none"}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
        </Table>

        <h3>Items:</h3>
        <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Index</Table.HeaderCell>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {items.map((item, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell onClick={(e: any) => downloadItem(e, item.index)}>{item.index}
                </Table.Cell>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.type}</Table.Cell>
                <Table.Cell>{item.subjectName || "none"}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
        </Table>
      </div>
    </Segment>
  );
}

