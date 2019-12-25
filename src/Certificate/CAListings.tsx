import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form, Input, Container, Header, DropdownProps, Segment, Table } from 'semantic-ui-react';
import { cAPem } from './pemCerts';
import {createPKIJSCertificate} from './pkijshelpers';
import { Link } from 'react-router-dom';
const utils = require('pvtsutils');
const pkiJS = require('pkijs');

interface Props {
  api: {query: any}
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
export default function CAListings ({api}: Props) {
  const [caCount, setCaCount] = useState(0);
  const [hashState, setHashState] = useState<string[]>([])

  useEffect(() => {
    let unsubscribe: () => any;
    api.query.certificateModule.cAHashes(0, (caHashes: string[]) => {
      setCaCount(caHashes.length);
      setHashState(caHashes);
    })
    .then((unsub: any) => { unsubscribe = unsub; })
    .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [])

  return (
    <Segment.Group>
    <Segment><h1>Registered Central Authority: {caCount}</h1></Segment>
    <Segment.Group>
      <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>CAHash</Table.HeaderCell>
          {/* <Table.HeaderCell>Registered Accounts</Table.HeaderCell> */}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {hashState.map((hash: string, index: number) => {
          return (
            <Table.Row key={index}>
              <Table.Cell textAlign='right'><Link to={`/certificate/0x${utils.Convert.ToHex(hash)}`}>{index+1}</Link>
              </Table.Cell>
              <Table.Cell>0x{utils.Convert.ToHex(hash)}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
    </Segment.Group>
  </Segment.Group>
  )
}