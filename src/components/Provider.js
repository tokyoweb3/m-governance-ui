import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form, Table} from 'semantic-ui-react';

const urls = ["https://peculiarventures.github.io/pv-webcrypto-tests/src/asmcrypto.js", "https://peculiarventures.github.io/pv-webcrypto-tests/src/elliptic.js", "https://cdn.rawgit.com/dcodeIO/protobuf.js/6.8.0/dist/protobuf.js", "https://peculiarventures.github.io/webcrypto-local/webcrypto-socket.js", "https://peculiarventures.github.io/pv-webcrypto-tests/src/webcrypto-liner.min.js", "https://cdn.rawgit.com/jakearchibald/idb/97e4e878/lib/idb.js"];

export default function Provider () {
  const initialOption = [
    {
    key: "None",
    value: "None",
    text: "None"}
  ];
  
  const [selectedProvider, setSelectedProvider] = useState("");
  const [providerOptions, setProviderOptions] = useState([]);
  const [providers, setProviders] = useState([]);
  const [items, setItems ] = useState([]);
  const [webS, setWebS] = useState();

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
    await crypto.reset();
    // Check provider login
    if (! await crypto.isLoggedIn()) {
      // Request provider for PIN window
      await crypto.login();
    }
    let indexes = await crypto.certStorage.keys();
    setItems([]);
    for (const index of indexes) {
      try {
        const item = await crypto.certStorage.getItem(index);
        setItems(items => {
          return [
            ...items,
            {
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
  }

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
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {items.map((item, index) => {
            return (
              <Table.Row key={index}>
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

