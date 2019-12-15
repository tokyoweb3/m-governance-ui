import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form, Input, Container, Header } from 'semantic-ui-react';
const utils = require('pvtsutils');

export default function Register ({api, keyring, ws, providerOptions}) {
  const keyringOptions = keyring.getPairs().map((account) => ({
    key: account.address,
    value: account.address,
    text: account.meta.name.toUpperCase()
  }));
  const [status, setStatus] = useState('');
  const [registerHidden, setRegisterHidden] = useState(true);

  const initialState = {
      addressFrom: '',
      privateKey: {},
      pubKey: '',
      cert: '',
      encryptedAccount: '',
  };
  const [formState, setFormState] = useState(initialState);
  const { addressFrom, privateKeyIndex, pubKey, cert, encryptedAccount } = formState;

  const [privateKeyOptions, setPrivateKeyOptions] = useState([]);
  const [publicKeyOptions, setPublicKeyOptions] = useState([]);

  const [selectedProvider, setSelectedProvider] = useState();

  const onChange = (_, data) => {
    console.log(data.value);
      setFormState(FormState => {
        return {
          ...FormState,
          [data.state]: data.value
        };
      });
  }
  const onChangeProvider = async (_, data) => {
    setSelectedProvider(data.value);
    getPrivateKey(data.value);
  }

  const signAccount = async () => {
    const crypto = await ws.getCrypto(selectedProvider);
    const privateKey = await crypto.keyStorage.getItem(privateKeyIndex);
    const alg = {
      name: privateKey.algorithm.name,
      hash: "SHA-256"
    };
    const message = utils.Convert.FromUtf8String(addressFrom);
    const signature = await crypto.subtle.sign(alg, privateKey, message);
    const hexValue = utils.Convert.ToHex(signature);
    setFormState(formState=>{
      return{
        ...formState,
        encryptedAccount: hexValue
      };
    });
    console.log(hexValue);
  }

  const getPrivateKey = async(providerId) => {
    const crypto = await ws.getCrypto(providerId);
    await crypto.reset();

    if (! await crypto.isLoggedIn()) {
      await crypto.login();
    }

    const indexes = await crypto.keyStorage.keys();
    setPrivateKeyOptions([]);
    for (const index of indexes) {
      try {
        const item = await crypto.keyStorage.getItem(index);
        if (item.type === "private") {
          setPrivateKeyOptions(privateKeyOptions => {
            return[
              ...privateKeyOptions,
              {
                key: index,
                value: index,
                text: `${index}: ${item.id}`
              }
            ]
          });
        } 
      } catch (e) {
        console.error(`Cannot get ${index} from CertificateStorage`)
        console.error(e);
      }
    }
  }

  const main = async () => {
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
        if(selectedProvider){
          await getPrivateKey(selectedProvider);
        }
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

  useEffect(() => {
    main();
  }, [])

  const lineMaker = (str) =>{
    return str.replace(/(.{100})/g, "$1 ");
  }
  
  return(
    <>  
      <h1>Register</h1>
      <h2>Sign your Account</h2>
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
              <Dropdown
                  placeholder='Select from your providers'
                  fluid
                  label="Provider"
                  onChange={onChangeProvider}
                  search
                  selection
                  state='provider'
                  options={providerOptions}
              />
            </Form.Field>
            <Form.Field>
              <Dropdown
                  placeholder='Select from your private key'
                  fluid
                  label="PrivateKeyIndex"
                  onChange={onChange}
                  search
                  selection
                  state='privateKeyIndex'
                  options={privateKeyOptions}
              />
            </Form.Field>
            <Form.Field>
              <Button
                  onClick={signAccount}
                  primary
                  type='submit'
              >
                  Sign
              </Button>
            </Form.Field>
      </Form>
      <div style={{whiteSpace: 'pre-line'}}>
        <Header as='h3'>Signature: </Header>
        {lineMaker(formState.encryptedAccount)}
      </div>
      <h2>Register your Account</h2>

      <Form>
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
              <Button
                  onClick={registerAccount}
                  primary
                  disabled={registerHidden}
                  type='submit'
              >
                  Register
              </Button>
              {status}
              </Form.Field>
          </Form>
    </>
  );
}