import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { Segment, Tab } from 'semantic-ui-react';
const helper = require('../Vote/helper.tsx');

interface Props {
  api: any;
  keyring: any;
}

export default function CertificateView({api, keyring}: Props) {
  const { index, hash } = useParams();
  const [accounts, setAccounts] = useState<string[]>([]);
  const [data, setData] = useState<string>();

  useEffect(() => {
    let unsubscribe: () => any;
    const f = async() => {
      await api.queryMulti([
        [api.query.certificateModule.accountsByCAHash, hash],
        [api.query.certificateModule.cADataByIndex, index],
      ], ([accounts, data]:[string[], string]) => {
        setAccounts(accounts);
        setData(helper.hex2a(data));
      })
    }
    f()
    .then((unsub: any) => { unsubscribe = unsub; })
    .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [])

  return(
    <Segment.Group>
      <h1>CertificateView #{index}</h1>
      <ul>
        <li>Hash: {hash}</li>
        <li>Data: {data}</li>
        <li>Pem: db.hash.pem</li>
        <li>そのたいろいろ情報</li>
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
      </ul>
    </Segment.Group>
  );
}