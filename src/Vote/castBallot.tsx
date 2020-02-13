import React, {useState, useEffect} from 'react';
import { Button, Dropdown, Form, DropdownProps, Message, Segment, Popup, Input, InputOnChangeData } from 'semantic-ui-react';
import { getPair } from '../apihelpers';
const helper = require('./helper.tsx');

interface Props {
  api: any;
  keyring: any;
  id: string;
  options: string[];
  voteType: number | string;
}
interface Form {
  addressFrom:string;
  reference_id: string;
  ballot: number;
  deposit: number;
  duration: number;
}
const popup = {
  borderRadius: 0,
  opacity: 0.7,
  padding: '2em',
}

export default function CastBallot({api, keyring, id, options, voteType}: Props) {
  const [message, setMessage] = useState({header: "", content:"", success:false, error:false, warning:false});
  const initialState = {
    addressFrom: '',
    reference_id: id,
    ballot: -1,
    deposit: 0,
    duration: 0
  };
  const [formState, setFormState] = useState<Form>(initialState);
  const { addressFrom, reference_id, ballot, deposit, duration } = formState;
  const ballotOptions = options.map((v,i)=>{
    return {key: i, value: i, text: helper.hex2a(v)}
  });

  const keyringOptions = keyring.getPairs().map((account:{address: string; meta:{name: string}}) => ({
      key: account.address,
      value: account.address,
      text: account.meta.name.toUpperCase()
  }));

  const onChange = (_: any, data: DropdownProps | InputOnChangeData) => {
    setFormState((FormState:Form) => {
      return {
        ...FormState,
        [data.state]: data.value
      };
    });
  }

  //TODO: reset formstate and dropdown on id change
  // useEffect(() => {
  //   setFormState({...formState, ballot:-1})
  // }, [id])

  const canSend = () => {
    if(voteType === 0 && addressFrom && reference_id && ballot >= 0){
      return false;
    }
    else if(voteType == 1 && addressFrom && reference_id && ballot >= 0 && deposit && duration ){
      return false;
    }
    return true;
  }

  const castBallot = () => {
    switch (voteType){
      case '0':
        normalVote();
        break;
      case '1':
        lockVote();
        break;
      default: break;
    }
  }
  // fn cast_lockvote(origin, reference_index: ReferenceIndex, ballot: Ballot, deposit: BalanceOf<T>, duration: T::BlockNumber) -> Result {
  const lockVote = async () => {
    const fromPair = await getPair(api, keyring, addressFrom);
    setMessage({...message, header: 'Just one second', content: 'Sending...', warning: true});
    api.tx.governanceModule
    .castLockvote(reference_id, ballot, deposit, duration)
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

  const normalVote = () => {
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

  const showLockVote = () => {
    return(
      <>
        <Form.Field>
        <Popup
          trigger={<Input
            label='Deposit'
            fluid
            onChange={onChange}
            state='deposit'
            placeholder='Balance: u64'
            type='number'
        />}
          content='Voting power is deposit amount multiplied with lock duration.'
          style={popup}
          inverted
          on={"click"}
        />
        </Form.Field>
        <Form.Field>
        <Popup
          trigger={<Input
            label='Lock Duration'
            fluid
            onChange={onChange}
            state='duration'
            placeholder='BlockNumber: u64'
            type='number'
        />}
          content='Locked duration must be bigger than vote expiry. You can only use your balance after withdrawal following concluding the expired vote.'
          style={popup}
          inverted
          on={"click"}
        />
      </Form.Field>
    </>
    );
  }
  return(
    <Segment>
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
        {/* show extra input fields depending on votetype */}
        {voteType==1?showLockVote():null}
        <Form.Field>
          <Button
            onClick={castBallot}
            primary
            disabled={canSend()}
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
