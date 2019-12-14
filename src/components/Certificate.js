import React, { useState } from 'react';
import { Button, Dropdown, Form, Input } from 'semantic-ui-react';
import Sign from './Sign.js';
import Provider from './Provider.js';

export default function Certificate (props) {
  const { api, keyring } = props;
  const [status, setStatus] = useState('');
  const initialState = {
      addressFrom: '',
      pubKey: '0x',
      cert: '0x',
      encryptedAccount: '0x',
  };
  const [formState, setFormState] = useState(initialState);
  const { addressFrom, pubKey, cert, encryptedAccount } = formState;

  const keyringOptions = keyring.getPairs().map((account) => ({
      key: account.address,
      value: account.address,
      text: account.meta.name.toUpperCase()
  }));

  const onChange = (_, data) => {
      setFormState(FormState => {
        return {
          ...FormState,
          [data.state]: data.value
        };
      });
  }

  const registerAccount = () => {
    const fromPair = keyring.getPair(addressFrom);

    setStatus('Sending...');

    api.tx.myNumberModule
    .registerAccount(pubKey, cert, encryptedAccount)
    .signAndSend(fromPair, ({status}) => {
        if (status.isFinalized) {
        setStatus(`Completed at block hash #${status.asFinalized.toString()}`);
        } else {
        setStatus(`Current transfer status: ${status.type}`);
        }
    }).catch((e) => {
        setStatus(':( transaction failed');
        console.error('ERROR:', e);
    });
  }

  return(
    <>
      <h1>Certificate</h1>
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
                <Input
                    label='Public Key'
                    fluid
                    onChange={onChange}
                    state='pubKey'
                    placeholder="0x...Public Key"
                    type='hex'
                />
                </Form.Field>
                <Form.Field>
                <Input
                    label='Certification'
                    fluid
                    onChange={onChange}
                    state='cert'
                    placeholder="0x...Certification hash≈"
                    type='text'
                />
                </Form.Field>
                <Form.Field>
                <Input
                    label='Encrypted Account'
                    fluid
                    onChange={onChange}
                    state='encryptedAccount'
                    placeholder="0x...Encrypted Account"
                    type='text'
                />
                </Form.Field>
                <Form.Field>
                <Button
                    onClick={registerAccount}
                    primary
                    type='submit'
                >
                    Send
                </Button>
                {status}
                </Form.Field>
            </Form>
        
        <Provider />
        {/* <Sign /> */}
        
    </>
  );
}