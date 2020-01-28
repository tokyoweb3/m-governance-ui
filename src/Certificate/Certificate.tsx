import React, { useState, useEffect } from 'react';
import {Tab} from 'semantic-ui-react';

// import components
import Provider from './Provider';
import Register from './Register';
import RegisterCA from './RegisterCA';
import CAListings from './CAListings';

// var protobuf = require("protobufjs");
// var WebcryptoSocket = require("@webcrypto-local/client");
// console.log(protobuf);

const urls = ["https://peculiarventures.github.io/pv-webcrypto-tests/src/asmcrypto.js", "https://peculiarventures.github.io/pv-webcrypto-tests/src/elliptic.js", "https://cdn.rawgit.com/dcodeIO/protobuf.js/6.8.0/dist/protobuf.js", "https://unpkg.com/@webcrypto-local/client@1.0.14/build/webcrypto-socket.js", "https://peculiarventures.github.io/pv-webcrypto-tests/src/webcrypto-liner.min.js", "https://cdn.rawgit.com/jakearchibald/idb/97e4e878/lib/idb.js"];

interface Props {
  api: {query: any, tx: any; };
  keyring: {getPairs: any, getPair: any ;};
}
interface MyWindow extends Window {  
  WebcryptoSocket: any;
}  
declare var window: MyWindow;  

export default function Certificate ({ api, keyring }: Props) {
  const [ws, setWs] = useState();
  const [wsReady, setWsReady] = useState(false)
  const [caOptions, setCaOptions] = useState<string[]>([]);

  const panes = [
    { menuItem: {key: 'providers', icon: 'rss', content: 'Providers'}, render: ()=> <Tab.Pane><Provider ws={ws} wsReady={wsReady}/></Tab.Pane>},
    { menuItem: {key: 'register', icon: 'book', content: 'Register'}, render: ()=> <Tab.Pane><Register api={api} keyring={keyring} ws={ws} caOptions={caOptions}/></Tab.Pane>},
    { menuItem: {key: 'centralAuthority', icon: 'building', content: 'Central Authority'}, render: ()=> <Tab.Pane><CAListings api={api} /></Tab.Pane>},
    { menuItem: {key: 'registerCA', icon: 'building', content: 'Register CA'}, render: ()=> <Tab.Pane><RegisterCA api={api} keyring={keyring} /></Tab.Pane>},
  ];

  // load libs
  useEffect(() => { 
    for (const id in urls) {
      let tag = document.createElement('script');
      tag.async = false;
      tag.src = urls[id];
      let body = document.getElementsByTagName('body')[0];
      body.appendChild(tag);
    }
    let unsubscribe: () => any;
    api.query.certificateModule.cAData((ca_data: string[]) =>{
      setCaOptions(ca_data);
    }).then((unsub: any) => {unsubscribe = unsub; })
      .catch(console.error);
    return () => unsubscribe && unsubscribe();
  },[]); 

  // get webcryptosocket
  useEffect(() => {
    window.WebcryptoSocket && init();
  }, [window.WebcryptoSocket])

  const init = async () => {
    const WebcryptoSocket = window.WebcryptoSocket;
    const ws = new WebcryptoSocket.SocketProvider({
      storage: await WebcryptoSocket.BrowserStorage.create(),
    });
    setWs(ws);
    setWsReady(true);
  }

  return(
    <>
      <Tab menu={{color: 'grey', inverted: true}} panes={panes} />
    </>
  );
}