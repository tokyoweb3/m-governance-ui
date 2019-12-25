import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { Segment, Tab } from 'semantic-ui-react';

interface Props {
  api: any;
  keyring: any;
  blockNumber: string;
}

export default function CertificateView() {
  const { hash } = useParams();

  return(
    <Segment.Group>    
      <h1>CertificateView</h1>
      {hash}
      <ul>
        <li>Provider</li>
        <li>Pem</li>
        <li>そのたいろいろ情報</li>
        <li>Accounts</li>
        <li>Votes</li>
      </ul>
    </Segment.Group>
  );
}