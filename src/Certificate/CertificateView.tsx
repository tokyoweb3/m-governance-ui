import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { Segment, Tab } from 'semantic-ui-react';

interface Props {
  api: any;
  keyring: any;
}

export default function CertificateView({api, keyring}: Props) {
  const { index, hash } = useParams();
  const [accounts, setAccounts] = useState<string[]>([]);

  useEffect(() => {
    let unsubscribe: () => any;
    api.query.certificateModule.accountsByCAHash(hash, (accounts: string[]) => {
      setAccounts(accounts);
    })
    .then((unsub: any) => { unsubscribe = unsub; })
    .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [])

  return(
    <Segment.Group>    
      <h1>CertificateView #{index}</h1>
      <ul>
        <li>Hash: {hash}</li>
        <li>Provider: db.hash.provider</li>
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