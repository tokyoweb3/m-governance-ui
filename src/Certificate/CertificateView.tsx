import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { Segment, Tab, Container } from 'semantic-ui-react';
import { createPKIJSCertificate } from './pkijshelpers';
const helper = require('../Vote/helper.tsx');

interface Props {
  api: any;
  keyring: any;
}

const pemStyle = {
  height: '240px',
  width: '60%',
  border:'1px solid #ccc',
  font:'16px/26px Georgia, Garamond, Serif',
  overflow:'auto',
  // whiteSpace: 'pre-line',
}
export default function CertificateView({api, keyring}: Props) {
  const { index, hash } = useParams();
  const [accounts, setAccounts] = useState<string[]>([]);
  const [data, setData] = useState<string>();
  const [pem, setPem] = useState<string>('');
  const [rawCA, setRawCA] = useState<{notBefore?: {value: string}, notAfter?: {value: string}, version?: string, issuer?:{valueBeforeDecode: ArrayBuffer, typesAndValues:{value:{valueBlock: {value: string}}}[]}}>({});

  useEffect(() => {
    let unsubscribe: () => any;
    const f = async() => {
      await api.queryMulti([
        [api.query.certificateModule.accountsByCAHash, hash],
        [api.query.certificateModule.cADataByIndex, index],
        [api.query.certificateModule.cAStore, index],
      ], ([accounts, data, hexPem]:[string[], string, string]) => {
        setAccounts(accounts);
        setData(helper.hex2a(data));
        const pem = helper.hex2a(hexPem);
        setPem(pem);
        setRawCA(createPKIJSCertificate(pem));
      })
    }
      f()
      .then((unsub: any) => { unsubscribe = unsub; })
      .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [])

  const lineMaker = (str: string) =>{
    return str.replace(/(.{150})/g, "$1\n");
  }
  return(
    <Segment>
      {console.log(rawCA)}
      <h1>CertificateView #{index}</h1>
      <ul>
        <li>Hash: {hash}</li>
        <li>Data: {data}</li>
  <li>notBefore: {rawCA.notBefore && rawCA.notBefore.value.toString()}</li>
  <li>notAfter: {rawCA.notAfter && rawCA.notAfter.value.toString()}</li>
  <li>version: {rawCA.version && rawCA.version.toString()}</li>
  <li>issuer: 
    <ol>
      {rawCA.issuer && rawCA.issuer.typesAndValues.map((val:{value: {valueBlock:{value: string}}}, i)=>{
        return  <li key={i}>{val.value.valueBlock.value.toString()}</li>;
      })}
    </ol>
  </li>
        <li>Accounts: {accounts.length}
        <ul>
        {accounts.map((account, index)=>{
          return(
            <li key={index}>
              {account.toString()}
            </li>
          );
        })}
        </ul></li>
        <li>Votes</li>
        <li>Pem: <div style={pemStyle}><p>{lineMaker(pem)}</p></div></li>
      </ul>
      
    </Segment>
  );
}