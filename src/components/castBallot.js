import React, {useState} from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react';

export default function CastBallot(props) {
  const { api, keyring, id } = props;
  const [status, setStatus] = useState('');
  const initialState = {
    addressFrom: '',
    reference_id: id,
    ballot: ''
  };
  const [formState, setFormState] = useState(initialState);
  const { addressFrom, reference_id, ballot } = formState;
  const ballotOptions = [
    {key: "Aye", value: "Aye", text: "Aye"},
    {key: "Nay", value: "Nay", text: "Nay"}
  ];
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

  const castBallot = () => {
    const fromPair = keyring.getPair(addressFrom);
    setStatus('Sending...');

    api.tx.governanceModule
    .castBallot(reference_id, ballot)
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
          {status}
        </Form.Field>
      </Form>
    </>
  );
}