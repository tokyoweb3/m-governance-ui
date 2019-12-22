import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form, Input, Container, Header, DropdownProps } from 'semantic-ui-react';
const utils = require('pvtsutils');

interface Props {
  api: any;
  keyring: any;
  ws: any;
  providerOptions: any;
}
interface Status{
  status: {
    isFinalized: boolean,
    asFinalized: string,
    type: string
  }
}
interface Options{
  key: string;
  value: string;
  text: string;
}
export default function Register ({api, keyring, ws, providerOptions}: Props) {
  const keyringOptions = keyring.getPairs().map((account: { address: any; meta: { name: string; }; }) => ({
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
      signature: {},
      message: ''
  };
  const [formState, setFormState] = useState(initialState);
  const { addressFrom, signature, message, hexThumbSignature, privateKeyIndex, publicKeyIndex, certificateIndex } = formState;

  const [privateKeyOptions, setPrivateKeyOptions] = useState<Options[]>([]);
  const [publicKeyOptions, setPublicKeyOptions] = useState<Options[]>([]);
  const [certificateOptions, setCertificateOptions] = useState<Options[]>([]);

  const [selectedProvider, setSelectedProvider] = useState();
  const [verified, setVerified] = useState(false);

  const onChange = (_: any, data: DropdownProps) => {
    console.log(data.value);
      setFormState(FormState => {
        return {
          ...FormState,
          [data.state]: data.value
        };
      });
  }
  const onChangeProvider = async (_: any, data: DropdownProps) => {
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
      console.log(utils.Convert.ToHex(message));
      const rawSignature = await crypto.subtle.sign(alg, privateKey, message);
      const thumbSignature = await crypto.subtle.digest("SHA-256", rawSignature);
      const hexThumbSignature = utils.Convert.ToHex(thumbSignature);
      setFormState((formState: any)=>{
        return{
          ...formState,
          hexThumbSignature,
          signature: rawSignature,
          message
        };
      });
      console.log(utils.Convert.ToHex(rawSignature));
      }
      catch(e){console.error(e)};
  }
  
  const verify = async(signature: {}, message: string) => {
    const crypto = await ws.getCrypto(selectedProvider);
    const publicKey = await crypto.keyStorage.getItem(publicKeyIndex);
    const alg = {name: "RSASSA-PKCS1-v1_5", hash: "SHA-256"};
    let rsassaPublicKey;

    if(publicKey.algorithm.name === "RSA-OAEP"){
      const spki = await crypto.subtle.exportKey("spki", publicKey);
      rsassaPublicKey = await crypto.subtle.importKey("spki", spki, {name: "RSASSA-PKCS1-v1_5", hash: "SHA-256"}, true, ["verify"]);
    }
    
    try{
      const ok = await crypto.subtle.verify(alg, rsassaPublicKey || publicKey, signature, message);
      setVerified(ok);
    }
    catch (e){
      console.error(e);
    }
  }

  const getItems = async(providerId: any) => {
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
        if (item.type === "private") {
          console.log(item);
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
        const certChain = await crypto.certStorage.getChain(item);
        console.log(item);
        console.log(certChain);
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

  async function GetCertificateKey(type: string, provider: any, certID: string) {
    const keyIDs = await provider.keyStorage.keys()
    for (const keyID of keyIDs) {
      const parts = keyID.split("-");
      // parts = type-id-certId
      if (parts[0] === type && parts[2] === certID.split("-")[2]) {
        const key = await provider.keyStorage.getItem(keyID);
        if (key) {
          return key;
        }
      }
    }
    if (type === "public") {
      const cert = await provider.certStorage.getItem(certID);
      if (cert) {
        return cert.publicKey;
      }
    }
    return null;
  }

  const registerAccount = async () => {
    const fromPair = keyring.getPair(addressFrom);
    const crypto = await ws.getCrypto(selectedProvider);
    const publicKey = await crypto.keyStorage.getItem(publicKeyIndex);
    const rawPub = await crypto.subtle.exportKey("raw", publicKey);

    const cert = await crypto.certStorage.getItem(certificateIndex);
    const rawCert = await crypto.certStorage.exportCert("raw", cert);
    const hexPub = utils.Convert.ToHex(rawPub);
    const thumbPub = await crypto.subtle.digest("SHA-256", rawPub); // 32bytes: 256bits
    const thumbCert = await crypto.subtle.digest("SHA-256", rawCert);
    const hexThumbPub = utils.Convert.ToHex(thumbPub);
    const hexThumbCert = utils.Convert.ToHex(thumbCert);
    
    console.log(hexPub);
    console.log("hexThumbPub: ", hexThumbPub);
    // console.log(thumbCert);
    console.log("hexThumbPub: ", hexThumbCert);

    setStatus('Sending...');

    await api.tx.myNumberModule
    .registerAccount("0x"+hexPub, "0x"+hexThumbCert, "0x"+hexThumbSignature)
    .signAndSend(fromPair, ({status}: Status) => {
        if (status.isFinalized) {
        setStatus(`Completed at block hash #${status.asFinalized.toString()}`);
        } else {
        setStatus(`Current transfer status: ${status.type}`);
        }
    }).catch((e: any) => {
        setStatus(':( transaction failed');
        console.error('ERROR:', e);
    });
    verify(signature, message);
  }

  const main = async () => {
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
        if(selectedProvider){
          await getItems(selectedProvider);
        }
    });
  }

  useEffect(() => {
    main();
  }, [])

  // const lineMaker = (str: string) =>{
  //   return str.replace(/(.{100})/g, "$1 ");
  // }
  
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
              </Form.Field>
      </Form>
      <h3>Verification: {`${verified}`}</h3>
      {status}
    </>
  );
} 

function GetCommonName(name: string) {
  var reg = /CN=(.+),?/i;
  var res = reg.exec(name);
  return res ? res[1] : "Unknown";
}