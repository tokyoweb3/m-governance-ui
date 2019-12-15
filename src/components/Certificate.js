import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form, Input } from 'semantic-ui-react';
import Sign from './Sign.js';
import Provider from './Provider.js';

const urls = ["https://peculiarventures.github.io/pv-webcrypto-tests/src/asmcrypto.js", "https://peculiarventures.github.io/pv-webcrypto-tests/src/elliptic.js", "https://cdn.rawgit.com/dcodeIO/protobuf.js/6.8.0/dist/protobuf.js", "https://peculiarventures.github.io/webcrypto-local/webcrypto-socket.js", "https://peculiarventures.github.io/pv-webcrypto-tests/src/webcrypto-liner.min.js", "https://cdn.rawgit.com/jakearchibald/idb/97e4e878/lib/idb.js"];

export default function Certificate (props) {
  const { api, keyring } = props;
  const [status, setStatus] = useState('');
  const initialState = {
      addressFrom: '',
      pubKey: '0x',
      cert: '0x',
      encryptedAccount: '0x',
  };
  const [formState, setFormState] = useState(initialState);
  const { addressFrom, pubKey, cert, encryptedAccount } = formState;

  const keyringOptions = keyring.getPairs().map((account) => ({
      key: account.address,
      value: account.address,
      text: account.meta.name.toUpperCase()
  }));

  const onChange = (_, data) => {
      setFormState(FormState => {
        return {
          ...FormState,
          [data.state]: data.value
        };
      });
  }

  const registerAccount = () => {
    const fromPair = keyring.getPair(addressFrom);

    setStatus('Sending...');

    api.tx.myNumberModule
    .registerAccount(pubKey, cert, encryptedAccount)
    .signAndSend(fromPair, ({status}) => {
        if (status.isFinalized) {
        setStatus(`Completed at block hash #${status.asFinalized.toString()}`);
        } else {
        setStatus(`Current transfer status: ${status.type}`);
        }
    }).catch((e) => {
        setStatus(':( transaction failed');
        console.error('ERROR:', e);
    });
  }

  const [ws, setWs] = useState();
  const [wsReady, setWsReady] = useState(false);

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

  // get ws
  useEffect(() => {
    window.WebcryptoSocket && init();
  }, [window.WebcryptoSocket])

  const init = async () => {
    const WebcryptoSocket = window.WebcryptoSocket;
    const ws = new WebcryptoSocket.SocketProvider();
    setWs(ws);
    setWsReady(true);
  }

  if(!wsReady){
    return <h2>Connecting to WebcryptoSocket...</h2>
  }
  // pass it to provider
  

  return(
    <>
      <Provider ws={ws}/>
      <h1>Certificate</h1>
      <Form>
                <Form.Field>
                <Dropdown
                    placeholder='Select from your accounts'
                    fluid
                    label="From"
                    onChange={onChange}
                    search
                    selection
                    state='addressFrom'
                    options={keyringOptions}
                />
                </Form.Field>
                <Form.Field>
                <Input
                    label='Public Key'
                    fluid
                    onChange={onChange}
                    state='pubKey'
                    placeholder="0x...Public Key"
                    type='hex'
                />
                </Form.Field>
                <Form.Field>
                <Input
                    label='Certification'
                    fluid
                    onChange={onChange}
                    state='cert'
                    placeholder="0x...Certification hash≈"
                    type='text'
                />
                </Form.Field>
                <Form.Field>
                <Input
                    label='Encrypted Account'
                    fluid
                    onChange={onChange}
                    state='encryptedAccount'
                    placeholder="0x...Encrypted Account"
                    type='text'
                />
                </Form.Field>
                <Form.Field>
                <Button
                    onClick={registerAccount}
                    primary
                    type='submit'
                >
                    Send
                </Button>
                {status}
                </Form.Field>
            </Form>
        
        
        {/* <Sign /> */}
        
    </>
  );
}