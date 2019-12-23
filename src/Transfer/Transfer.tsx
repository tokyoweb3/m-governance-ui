import React, { useState } from 'react';
import { Button, Dropdown, Form, Input, DropdownProps, InputOnChangeData, Segment, Message} from 'semantic-ui-react';

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
  const [message, setMessage] = useState({header: "", content:"", success:false, error:false, warning:false});
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

    setMessage({...message, header: 'Just one second', content: 'Sending...', warning: true});
    api.tx.balances
    .transfer(addressTo, amount)
    .signAndSend(fromPair, ({ status }: Status) => {
      if (status.isFinalized) {
        setMessage({...message, header: 'Transaction Completed!', content:`Completed at block hash #${status.asFinalized.toString()}`, success:true});
        } else {
        setMessage({...message, header: '', content: `Current transfer status: ${status.type}`, warning: true});
        }
      }).catch((e: any) => {
        setMessage({...message, header: 'Error', content: ':( transaction failed. Check the log.', error: true});
        console.error('ERROR:', e);
      });
  };

  return (
    <Segment>
      <h1>Transfer</h1>
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
        </Form.Field>
      </Form>
      {message.content && <Message
        success={message.success}
        error={message.error}
        warning={message.warning}
        header={message.header}
        content={message.content}
      />}
    </Segment>
  );
}
