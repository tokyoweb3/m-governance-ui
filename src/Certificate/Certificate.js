import React, { useState, useEffect } from 'react';
import {Loader, Dimmer, Segment, Image} from 'semantic-ui-react';

// import components
import Provider from './Provider.js';
import Register from './Register.js';

const urls = ["https://peculiarventures.github.io/pv-webcrypto-tests/src/asmcrypto.js", "https://peculiarventures.github.io/pv-webcrypto-tests/src/elliptic.js", "https://cdn.rawgit.com/dcodeIO/protobuf.js/6.8.0/dist/protobuf.js", "https://peculiarventures.github.io/webcrypto-local/webcrypto-socket.js", "https://peculiarventures.github.io/pv-webcrypto-tests/src/webcrypto-liner.min.js", "https://cdn.rawgit.com/jakearchibald/idb/97e4e878/lib/idb.js"];

export default function Certificate (props) {
  const { api, keyring } = props;
  const [ws, setWs] = useState();
  const [wsReady, setWsReady] = useState(false);
  const [providerOptions, setProviderOptions] = useState([]);
  const [providers, setProviders] = useState([]);

  // load libs
  useEffect(() => { 
    for (const id in urls) {
      let tag = document.createElement('script');
      tag.async = false;
      tag.src = urls[id];
      let body = document.getElementsByTagName('body')[0];
      body.appendChild(tag);
    }
  },[]); 

  // get webcryptosocket
  useEffect(() => {
    window.WebcryptoSocket && init();
  }, [window.WebcryptoSocket])

  const init = () => {
    const WebcryptoSocket = window.WebcryptoSocket;
    const ws = new WebcryptoSocket.SocketProvider();
    setWs(ws);
    setWsReady(true);
  }
  const getProviders = async() => {
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

  const main = async() => {
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
      await getProviders();
    }); 
  }


  useEffect(() => {
    if(wsReady){
      main();
    }
  }, [wsReady]);


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
    <>
      <Register api={api} keyring={keyring} ws={ws} providerOptions={providerOptions}/>     
      <Provider ws={ws}/>
    </>
  );
}