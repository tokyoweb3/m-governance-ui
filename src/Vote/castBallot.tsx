import React, {useState} from 'react';
import { Button, Dropdown, Form, DropdownProps, Message, Segment } from 'semantic-ui-react';
const helper = require('./helper.tsx');

interface Props {
  api: any;
  keyring: any;
  id: string| undefined;
  options: string[];
}
interface Form {
  addressFrom:string;
  reference_id?: string;
  ballot?: number;
}

export default function CastBallot({api, keyring, id, options}: Props) {
  const [message, setMessage] = useState({header: "", content:"", success:false, error:false, warning:false});
  const initialState = {
    addressFrom: '',
    reference_id: id,
  };
  const [formState, setFormState] = useState<Form>(initialState);
  const { addressFrom, reference_id, ballot } = formState;
  const ballotOptions = options.map((v,i)=>{
    return {key: i, value: i, text: helper.hex2a(v)}
  });

  const keyringOptions = keyring.getPairs().map((account:{address: string; meta:{name: string}}) => ({
      key: account.address,
      value: account.address,
      text: account.meta.name.toUpperCase()
  }));

  const onChange = (_: any, data: DropdownProps) => {
    setFormState((FormState:Form) => {
      return {
        ...FormState,
        [data.state]: data.value
      };
    });
  }

  const castBallot = () => {
    const fromPair = keyring.getPair(addressFrom);
    setMessage({...message, header: 'Just one second', content: 'Sending...', warning: true});

    api.tx.governanceModule
    .castBallotWithOptions(reference_id, ballot)
    .signAndSend(fromPair, ({status}: {status:{isFinalized: boolean; asFinalized: string; type: string; }}) => {
      if (status.isFinalized) {
        setMessage({...message, header: 'Transaction Completed!', content:`Completed at block hash #${status.asFinalized.toString()}`, success:true});
        } else {
        setMessage({...message, header: '', content: `Current transfer status: ${status.type}`, warning: true});
        }
    }).catch((e: any) => {
      setMessage({...message, header: 'Error', content: ':( transaction failed. Check the log.', error: true});
      console.error('ERROR:', e);
    });
  }
  return(
    <Segment>
      {console.log(formState)}
      <h1>Cast Ballot</h1>
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
          <Dropdown
            placeholder='Select your answer'
            label='Ballot'
            fluid
            onChange={onChange}
            search
            selection
            state='ballot'
            options={ballotOptions}
          />
        </Form.Field>
        <Form.Field>
          <Button
            onClick={castBallot}
            primary
            type='submit'>
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