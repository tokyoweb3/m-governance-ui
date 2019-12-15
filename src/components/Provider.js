import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form, Table} from 'semantic-ui-react';
const utils = require('pvtsutils');

const urls = ["https://peculiarventures.github.io/pv-webcrypto-tests/src/asmcrypto.js", "https://peculiarventures.github.io/pv-webcrypto-tests/src/elliptic.js", "https://cdn.rawgit.com/dcodeIO/protobuf.js/6.8.0/dist/protobuf.js", "https://peculiarventures.github.io/webcrypto-local/webcrypto-socket.js", "https://peculiarventures.github.io/pv-webcrypto-tests/src/webcrypto-liner.min.js", "https://cdn.rawgit.com/jakearchibald/idb/97e4e878/lib/idb.js"];

export default function Provider () {
  const [webS, setWebS] = useState();
  const initialOption = [
    {
    key: "None",
    value: "None",
    text: "None"}
  ];
  const initialForm = {
    alg: { 
      name: "",
      hash: "SHA-256",
    },
    message: "",
    key: ""
  };
  const [selectedProvider, setSelectedProvider] = useState("");
  const [providerOptions, setProviderOptions] = useState([]);
  const [providers, setProviders] = useState([]);
  const [items, setItems ] = useState([]);
  
  const [publicKeys, setPublicKeys] = useState([]);
  const [privateKeys, setPrivateKeys] = useState([]);
  const [signForm, setSignForm] = useState(initialForm);

  const onChange = (_, provider) => {
    setSelectedProvider(provider.value);
  }

  useEffect(() => { 
    for (const id in urls) {
      let tag = document.createElement('script');
      tag.async = false;
      tag.src = urls[id];
      let body = document.getElementsByTagName('body')[0];
      body.appendChild(tag);
    }
  },[]); 

  // initialize webcryptosocket
  useEffect(() => {
    window.WebcryptoSocket && main();
  }, [window.WebcryptoSocket])

  const refresh = async () => {
    if(selectedProvider) {
      getItems(selectedProvider, webS);
    }
  }

  async function main() {
    const WebcryptoSocket = window.WebcryptoSocket;
    const ws = new WebcryptoSocket.SocketProvider();
    setWebS(ws);
    ws.connect("127.0.0.1:31337")
      .on("error", function (e) {
        console.error(e);
      })
      .on("listening", async (e) => {
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
        await fillProviders(ws);
        if(selectedProvider){
          await getItems(selectedProvider, ws);
        }
        // ws.cardReader
        //   .on("insert", fillProviders(ws))
        //   .on("remove", fillProviders(ws));
      });
  }

  const fillProviders = async (ws) => {
    ws.info()
      .then(info => {
        for (const index in info.providers){
          setProviderOptions(oldValues => {
            const newValues = [...oldValues];
            newValues[index] = {
              key: info.providers[index].id,
              value: info.providers[index].id,
              text: info.providers[index].name
            };
            return newValues;
          });

          setProviders(oldValues => {
            const newValues = [...oldValues];
            newValues[index] =  {
              id: info.providers[index].id,
              name: info.providers[index].name,
              atr: info.providers[index].atr || "None"
            };
            return newValues;
          });
        }
      });
  }

  async function getItems(providerId, ws){
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
    // get certification
    for (const index of indexes) {
      try {
        const item = await crypto.certStorage.getItem(index);
        console.log(item);
        // console.log(item.publicKey);
        console.log(utils.Convert.ToHex(item.publicKey.raw));

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

    // get keys
    indexes = await crypto.keyStorage.keys();
    for (const index of indexes) {
      try {
        const item = await crypto.keyStorage.getItem(index);
        if (item.type === "private") {
          setPrivateKeys(keys => {
            return[
              ...keys,
              item
            ]
          });
        } else {
          setPublicKeys(keys => {
            return[
              ...keys,
              item
            ]
          });
        }

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

  const sign = async() => {
    const {alg, key, message} = signForm;
    const privateKey = privateKeys[0];
    // const message = utils.Convert.FromUtf8String("d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d");
    const signature = await crypto.subtle.sign(alg, key, message);
    const hexValue = utils.Convert.ToHex(signature);
    console.log("Signed!");
  }

  // const verify = async() => {
  //   //TODO: verify with publickey
  //   // signature = await crypto.subtle.sign(alg, privateKey, message);
  //   // console.log(signature);
  //   for (const index in publicKeys) {
  //     try{
  //       alg = {
  //         name: publicKeys[index].algorithm.name,
  //         hash: "SHA-256",
  //       }
  //       const ok = await crypto.subtle.verify(alg, publicKeys[index], signature, message);
  //       console.log(ok);
  //     }
  //     catch (e){
  //       console.error(e);
  //     }
  //   }
  // }

  return(
    <>
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
                <Table.Cell>{item.index}</Table.Cell>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.type}</Table.Cell>
                <Table.Cell>{item.subjectName || "none"}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
        </Table>
      </div>
    </>
  );
}

