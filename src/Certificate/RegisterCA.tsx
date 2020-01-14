import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form, TextArea, TextAreaProps, DropdownProps, Segment, Message, Input, InputOnChangeData } from 'semantic-ui-react';
import {createPKIJSCertificate, removePemArmoring} from './pkijshelpers';
const utils = require('pvtsutils');
const pkiJS = require('pkijs');

interface Props {
  api: any;
  keyring: any;
}
interface Status{
  status: {
    isFinalized: boolean,
    asFinalized: string,
    type: string
  }
}

export default function RegisterCA ({api, keyring}: Props) {
  const keyringOptions = keyring.getPairs().map((account: { address: any; meta: { name: string; }; }) => ({
    key: account.address,
    value: account.address,
    text: account.meta.name.toUpperCase()
  }));
  const [message, setMessage] = useState({header: "", content:"", success:false, error:false, warning:false});
  const [formState, setFormState] = useState<{addressFrom: string; data: string; pem: string}>({addressFrom: '', data: '', pem: ''});
  const { addressFrom, data, pem } = formState;

  const onChange = (_: any, data: DropdownProps | TextAreaProps | InputOnChangeData) => {
      setFormState(FormState => {
        return {
          ...FormState,
          [data.state]: data.value
        };
      });
  }
  const registerCA = async () => {
    try{
    const fromPair = keyring.getPair(addressFrom);
    const rawCA = createPKIJSCertificate(pem);
    const thumbCA = await crypto.subtle.digest("SHA-256", rawCA.tbs);
    const hexThumbCA = utils.Convert.ToHex(thumbCA);
    console.log(hexThumbCA);
    console.log(rawCA.tbs);
    const unarmored = removePemArmoring(pem);
    console.log(unarmored);
    
    await api.tx.certificateModule
    .registerCa("0x"+hexThumbCA, unarmored, data)
    .signAndSend(fromPair, ({status}: Status) => {
      if (status.isFinalized) {
        setMessage({...message, header: 'Transaction Completed!', content:`Completed at block hash #${status.asFinalized.toString()}`, success:true});
        } else {
        setMessage({...message, header: '', content: `Current transfer status: ${status.type}`, warning: true});
        }
      }).catch((e: any) => {
        setMessage({...message, header: 'Error', content: ':( transaction failed. Check the log.', error: true});
        console.error('ERROR:', e);
      });
    } catch(e){
      setMessage({...message, header: 'Error', content: `Registration failed: ${e}`, error: true});
      console.error('ERROR:', e);
    };
  }

  return (
    <Segment>
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
          label='Data'
          fluid
          onChange={onChange}
          state='data'
          type='string'
        />
      </Form.Field>
      <Form.Field
      control={TextArea}
      onChange={onChange}
      state='pem'
      label='pem'
      placeholder='Paste a PEM formatted text.'
    />
      <Form.Field>
        <Button
            onClick={registerCA}
            primary
            type='submit'
        >
            Register
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
  )
}