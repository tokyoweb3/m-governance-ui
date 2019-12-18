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
      publicKeyIndex: '',
      certificateIndex: '',
      hexThumbSignature: '',
      privateKeyIndex: '',
  };
  const [formState, setFormState] = useState(initialState);
  const { addressFrom, hexThumbSignature, privateKeyIndex, publicKeyIndex, certificateIndex } = formState;

  const [privateKeyOptions, setPrivateKeyOptions] = useState([]);
  const [publicKeyOptions, setPublicKeyOptions] = useState([]);
  const [certificateOptions, setCertificateOptions] = useState([]);

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
    getItems(data.value);
  }

  const signAccount = async () => {
    try{
      const crypto = await ws.getCrypto(selectedProvider);
      const privateKey = await crypto.keyStorage.getItem(privateKeyIndex);
      console.log(privateKey);
      const alg = {
        name: privateKey.algorithm.name || "RSASSA-PKCS1-v1_5",
        hash: "SHA-256"
      };
      const message = utils.Convert.FromUtf8String(addressFrom);
      const rawSignature = await crypto.subtle.sign(alg, privateKey, message);
      const thumbSignature = await crypto.subtle.digest("SHA-256", rawSignature);
      const hexThumbSignature = utils.Convert.ToHex(thumbSignature);
      setFormState(formState=>{
        return{
          ...formState,
          hexThumbSignature
        };
      });
      console.log(hexThumbSignature);
      }
      catch(e){console.error(e)};
  }
  

  const getItems = async(providerId) => {
    const crypto = await ws.getCrypto(providerId);
    await crypto.reset();

    if (! await crypto.isLoggedIn()) {
      await crypto.login();
    }

    let indexes = await crypto.keyStorage.keys();
    setPrivateKeyOptions([]);
    setPublicKeyOptions([]);
    for (const index of indexes) {
      try {
        const item = await crypto.keyStorage.getItem(index);
        console.log(item);
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
        } else if(item.type === "public"){
          setPublicKeyOptions(publicKeyOptions => {
            return[
              ...publicKeyOptions,
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

    indexes = await crypto.certStorage.keys();
    setCertificateOptions([]);
    for (const index of indexes) {
      try {
        const item = await crypto.certStorage.getItem(index);
        console.log(item);
          setCertificateOptions(certificateOptions => {
            return[
              ...certificateOptions,
              {
                key: index,
                value: index,
                text: `${GetCommonName(item.subjectName)}: ${index}`
              }
            ]
          });
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
          await getItems(selectedProvider);
        }
    });
  }

    const registerAccount = async () => {
    const fromPair = keyring.getPair(addressFrom);
    const crypto = await ws.getCrypto(selectedProvider);
    const publicKey = await crypto.keyStorage.getItem(publicKeyIndex);
    const rawPub = await crypto.subtle.exportKey("raw", publicKey);

    const cert = await crypto.certStorage.getItem(certificateIndex);
    const rawCert = await crypto.certStorage.exportCert("raw", cert);

    const thumbPub = await crypto.subtle.digest("SHA-256", rawPub); // 32bytes: 256bits
    const thumbCert = await crypto.subtle.digest("SHA-256", rawCert);
    const hexThumbPub = utils.Convert.ToHex(thumbPub);
    const hexThumbCert = utils.Convert.ToHex(thumbCert);
    
    // console.log(thumbPub);
    console.log("hexThumbPub: ", hexThumbPub);
    // console.log(thumbCert);
    console.log("hexThumbPub: ", hexThumbCert);

    setStatus('Sending...');

    api.tx.myNumberModule
    .registerAccount(hexThumbPub, hexThumbCert, hexThumbSignature)
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
  const spaceMaker = (str) =>{
    return str.replace(/(.{2})(.{100})/g, "$1 ", "$2\n");
  }
  const canRegister = () => {
    if(addressFrom && publicKeyIndex && certificateIndex && hexThumbSignature && privateKeyIndex){
      return false;
    } 
    return false;
  }
  
  return(
    <>  
      <h1>Register</h1>
      <h3>Requirements:</h3>
      <ul>
        <li>Account: {formState.addressFrom || "None"}</li>
        <li>Signed Account: {formState.hexThumbSignature || "None"}</li>
        <li>PublicKey: {formState.publicKeyIndex || "None"}</li>
        <li>Certification: {formState.certificateIndex || "None"}</li>
      </ul>
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
        {formState.hexThumbSignature}
      </div>
      <h2>Register your Account</h2>

      <Form>
              <Form.Field>
              <Dropdown
                  placeholder='Select from your public keys'
                  fluid
                  label="PublicKeyOptions"
                  onChange={onChange}
                  search
                  selection
                  state='publicKeyIndex'
                  options={publicKeyOptions}
              />
            </Form.Field>
              <Form.Field>
              <Dropdown
                  placeholder='Select from your certificates'
                  fluid
                  label="CertificatesOptions"
                  onChange={onChange}
                  search
                  selection
                  state='certificateIndex'
                  options={certificateOptions}
              />
            </Form.Field>
              <Form.Field>
              <Button
                  onClick={registerAccount}
                  primary
                  disabled={canRegister()}
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

function GetCommonName(name) {
  var reg = /CN=(.+),?/i;
  var res = reg.exec(name);
  return res ? res[1] : "Unknown";
}