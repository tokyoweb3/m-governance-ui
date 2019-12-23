import React, { useState } from 'react';
import { Button, Dropdown, Form, Input, DropdownProps, InputOnChangeData, Segment} from 'semantic-ui-react';

interface Props {
  api: {query: any, tx: any; };
  keyring: {getPairs: any, getPair: any ;};
}
interface Status{
  status: {
    isFinalized: boolean,
    asFinalized: string,
    type: string
  }
}

export default function Transfer ({api, keyring} : Props) {
  const [status, setStatus] = useState<string>('');
  const initialState = {
    addressFrom: '',
    addressTo: '',
    amount: 0
  };
  const [formState, setFormState] = useState(initialState);
  const { addressTo, addressFrom, amount } = formState;
  
  // get the list of accounts we possess the private key for
  const keyringOptions = keyring.getPairs().map((account: { address: any; meta: { name: { toUpperCase: () => void; }; }; }) => ({
    key: account.address,
    value: account.address,
    text: account.meta.name.toUpperCase()
  }));

  const onChange = (_: any, data: DropdownProps | InputOnChangeData) => {
    // formStateの中のdata.stateを変更
    setFormState(formState => {
      return {
        ...formState,
        [data.state]: data.value,
      };
    });
  };
  
  const makeTransfer = () => {
    const fromPair = keyring.getPair(addressFrom);

    setStatus('Sending...');

    api.tx.balances
    .transfer(addressTo, amount)
    .signAndSend(fromPair, ({ status }: Status) => {
        if (status.isFinalized) {
        setStatus(`Completed at block hash #${status.asFinalized.toString()}`);
        } else {
        setStatus(`Current transfer status: ${status.type}`);
        }
    }).catch((e: any) => {
        setStatus(':( transaction failed');
        console.error('ERROR:', e);
    });
  };

  return (
    <Segment.Group>
      <Segment><h1>Transfer</h1></Segment>
      <Form>
        <Form.Field>
          <Dropdown
            placeholder='Select from  your accounts'
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
          <Input
            onChange={onChange}
            label='To'
            fluid
            placeholder='address'
            state='addressTo'
            type='text'
          />
        </Form.Field>
        <Form.Field>
          <Input
            label='Amount'
            fluid
            onChange={onChange}
            state='amount'
            type='number'
          />
        </Form.Field>
        <Form.Field>
          <Button
            onClick={makeTransfer}
            primary
            type='submit'
          >
            Send
          </Button>
          {status}
        </Form.Field>
      </Form>
    </Segment.Group>
  );
}
