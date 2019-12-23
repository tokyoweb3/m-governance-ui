import React, { useEffect, useState } from 'react';
import { Table, Segment } from 'semantic-ui-react';

interface Props {
  api: {query: any; };
  keyring: {getPairs: any; };
}

export default function Balances ({api, keyring}: Props) {
  const accounts = keyring.getPairs();
  const addresses = accounts.map((account: { address: string; }) => account.address);
  const accountNames = accounts.map((account: { meta: { name: string; }; }) => account.meta.name);
  const [balances, setBalances] = useState<{[s:string]: number; }>({});

  useEffect(() => {
    let unsubscribeAll: () => void

    api.query.balances.freeBalance
      .multi(addresses, (currentBalances: { [x: string]: { toString: () => void; }; }) => {
        const balancesMap: {[s: string]: number} = addresses.reduce((acc: any, address: string, index: string | number) => ({
          ...acc,
          [address]: currentBalances[index].toString()
        }), {});
        setBalances(balancesMap);
      })
      .then((unsub: any) => { unsubscribeAll = unsub; })
      .catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [api.query.balances.freeBalance]);

  return (
    <Segment.Group>
      <Segment><h1>Balances</h1></Segment>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Balance</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {addresses.map((address: string, index: string | number) => {
            return (
              <Table.Row key={index}>
                <Table.Cell textAlign='right'>{accountNames[index]}</Table.Cell>
                <Table.Cell>{address}</Table.Cell>
                <Table.Cell>{balances && balances[address]}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Segment.Group>
  );
}
