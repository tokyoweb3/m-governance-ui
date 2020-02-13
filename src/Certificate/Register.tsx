import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form, Header, DropdownProps, Segment } from 'semantic-ui-react';
import { cAPem } from './pemCerts';
import {createPKIJSCertificate} from './pkijshelpers';
import { getPair } from '../apihelpers';
const utils = require('pvtsutils');
const pkiJS = require('pkijs');
const helper = require('../Vote/helper.tsx');

interface Props {
  api: any;
  keyring: any;
  ws: any;
  caOptions: string[];
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
export default function Register ({api, keyring, ws, caOptions}: Props) {
  const keyringOptions = keyring.getPairs().map((account: { address: any; meta: { name: string; }; }) => ({
    key: account.address,
    value: account.address,
    text: account.meta.name.toUpperCase()
  }));
  const CAOptions = caOptions.map((v, i) => ({
    key: i,
    value: i,
    text: helper.hex2a(v)
  }));

  const [status, setStatus] = useState('');

  const initialState = {
      addressFrom: '',
      certificateIndex: '',
      hexThumbSignature: '',
      privateKeyIndex: '',
      CAIndex: 0
  };
  const [formState, setFormState] = useState<{addressFrom: string, certificateIndex: string; hexThumbSignature: string; privateKeyIndex: string; CAIndex: number;}>(initialState);
  const { addressFrom, hexThumbSignature, certificateIndex, CAIndex} = formState;

  const [certificateOptions, setCertificateOptions] = useState<Options[]>([]);

  const [selectedProvider, setSelectedProvider] = useState();
  const [requirements, setRequirements] = useState<{verified: boolean; validated: boolean; }>({verified: false, validated: false});
  const { verified, validated } = requirements;
  const [validateStatus, setValidateStatus] = useState("");
  const [providerOptions, setProviderOptions] = useState<{key:string, value: string, text: string}[]>([]);

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

  const getProviders = async() => {
    ws.info()
      .then((info: { providers: [{id: string; name: string}];}) => {
        setProviderOptions([]);
        for (const index in info.providers){
          setProviderOptions(oldValues => {
            return [
            ...oldValues,
            {
              key: info.providers[index].id,
              value: info.providers[index].id,
              text: info.providers[index].name
            }]
          });
        }
      });
  }

  const signAccount = async () => {
    try{
      const crypto = await ws.getCrypto(selectedProvider);
      const privateKey: any = await GetCertificateKey("private", crypto, certificateIndex);
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
      verify(rawSignature, message);
      }
      catch(e){console.error(e)};
  }
  
  const verify = async(signature: {}, message: string) => {
    const crypto = await ws.getCrypto(selectedProvider);
    const publicKey = await GetCertificateKey("public", crypto, certificateIndex);
    const alg = {name: "RSASSA-PKCS1-v1_5", hash: "SHA-256"};
    let rsassaPublicKey;

    if(publicKey.algorithm.name === "RSA-OAEP"){
      const spki = await crypto.subtle.exportKey("spki", publicKey);
      rsassaPublicKey = await crypto.subtle.importKey("spki", spki, {name: "RSASSA-PKCS1-v1_5", hash: "SHA-256"}, true, ["verify"]);
    }
    
    try{
      const ok = await crypto.subtle.verify(alg, rsassaPublicKey || publicKey, signature, message);
      setRequirements({
          verified: ok,
          validated: validated
        })
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

    let privateKeys:string[] = [];

    // get Private keys
    const getKey = async () =>{  
      const indexes = await crypto.keyStorage.keys();
      for (const index of indexes) {
        try {
          const item = await crypto.keyStorage.getItem(index);
          if (item.type === "private") {
            privateKeys.push(index);
          } 
        } catch (e) {
          console.error(`Cannot get ${index} from CertificateStorage`)
          console.error(e);
        }
      }}
    
    // get certs of which id matches with private key.(only takes certs with privatekeys, because sign and verificaiton requires one matching pair of public and privatekey)
    const getCert = async() => { 
      const certs:string[] = await crypto.certStorage.keys();
      setCertificateOptions([]);
      for(const keyId of privateKeys){
        const keyParts = keyId.split('-');
      for (const cert of certs) {
        const certParts = cert.split('-');
        if(keyParts[2] === certParts[2]){
        try {
          const item = await crypto.certStorage.getItem(cert);
            setCertificateOptions(certificateOptions => {
              return[
                ...certificateOptions,
                {
                  key: cert,
                  value: cert,
                  text: `${GetCommonName(item.subjectName)}: ${cert}`
                }
              ]
            });
        } catch (e) {
          console.error(`Cannot get ${cert} from CertificateStorage`)
          console.error(e);
        }
      }}
    }
    }
    await getKey();
    await getCert();
  }

  const validate =  async () => {
    const crypto = await ws.getCrypto(selectedProvider);
    const item = await crypto.certStorage.getItem(certificateIndex);
    const userPem = await crypto.certStorage.exportCert("PEM", item);

    const userRaw = createPKIJSCertificate(userPem);
    const caPem2 = await api.query.certificateModule.cAStore(CAIndex+1);

    const caRaw = createPKIJSCertificate(helper.hex2a(caPem2));
  
    const chainValidator = new pkiJS.CertificateChainValidationEngine({
      certs: [userRaw],
      trustedCerts: [caRaw]
    });
  
    const { result, resultCode, resultMessage } = await chainValidator.verify();
    console.log(result, resultCode, resultMessage);
    setRequirements({
        verified: verified,
        validated: result
    })
    setValidateStatus(result?"Validation Successful!": `Error: ${resultMessage}.`);
  }

  const GetCertificateKey = async (type: string, provider: any, certID: string) => {
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
    const fromPair = await getPair(api, keyring, addressFrom); 
    const crypto = await ws.getCrypto(selectedProvider);

    const cert = await crypto.certStorage.getItem(certificateIndex);
    const rawCert = await crypto.certStorage.exportCert("raw", cert);

    const thumbCert = await crypto.subtle.digest("SHA-256", rawCert);
    const hexThumbCert = utils.Convert.ToHex(thumbCert);

    const caPem = await api.query.certificateModule.cAStore(CAIndex+1);

    const caRaw = createPKIJSCertificate(helper.hex2a(caPem));
    const thumbCA = await crypto.subtle.digest("SHA-256", caRaw.tbs);
    const hexThumbCA = utils.Convert.ToHex(thumbCA);
    
    // console.log(thumbCert);
    console.log("hexThumbPub: ", hexThumbCert);
    console.log("hexThumbCA: ", hexThumbCA);

    setStatus('Sending...');

    await api.tx.certificateModule
    .registerAccount("0x"+hexThumbCA, "0x"+hexThumbCert, "0x"+hexThumbSignature)
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
        await getProviders();
    });
  }

  useEffect(() => {
    if(ws){
      main();
    }
  }, [])

  // const lineMaker = (str: string) =>{
  //   return str.replace(/(.{100})/g, "$1 ");
  // }
  
  const canRegister = () => {
    if(addressFrom && certificateIndex && hexThumbSignature && verified && validated){
      return false;
    } 
    return true;
  }
  const getColor =(v:boolean)=>{
    if(v){
      return {color:"green"}
    }
    return {color:"red"}
  }
  
  return(
    <Segment>  
      <h1>Register</h1>
      <h3>Requirements:</h3>
      <ul>
        <li style={getColor(!!formState.addressFrom)}>Account: {formState.addressFrom || "None"}</li>
        <li style={getColor(!!formState.hexThumbSignature)}>Signed Account: {formState.hexThumbSignature || "None"}</li>
        <li style={getColor(!!formState.certificateIndex)}>Certification: {formState.certificateIndex || "None"}</li>
        <li style={getColor(verified)}>Sign Verification: {verified?"True":"False"}</li>
        <li style={getColor(validated)}>Cert Validation: {validated?"True":"False"}</li>
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
                  placeholder='Select from your certificates'
                  fluid
                  label="certificateIndex"
                  onChange={onChange}
                  search
                  selection
                  state='certificateIndex'
                  options={certificateOptions}
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
        <h3>Verification: {`${verified}`}</h3>
      </div>
      
      <h2>Select Root CA to validate your certification.</h2>
      <Form>
          <Form.Field>
          <Dropdown
              placeholder='Select from registered CA'
              fluid
              label="CAOptions"
              onChange={onChange}
              search
              selection
              state='CAIndex'
              options={CAOptions}
          />
        </Form.Field>
        <Form.Field>
          <Button
              onClick={validate}
              primary
              type='submit'
          >
              Validate Certificate
          </Button>
          </Form.Field>
      </Form>
      {validateStatus}
      <Form>
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
      {status}
    </Segment>
  );
} 

function GetCommonName(name: string) {
  var reg = /CN=(.+),?/i;
  var res = reg.exec(name);
  return res ? res[1] : "Unknown";
}