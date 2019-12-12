import React, {useState, useEffect} from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react';

export default function ConcludeVote(props) {
  const { api, keyring, id, blockNumber, vote_ends, concluded } = props;
  const [status, setStatus] = useState('');

  // when all requirements are set true, clickable
  const requirements = {
    isExpired: false,
    isConcluded: false,
    isSelected: false
  };
  const [clickable, setClickable] = useState({requirements});
  
  const { isExpired, isConcluded, isSelected } = clickable;

  const initialState = {
    addressFrom: '',
    reference_id: id,
  };
  const [formState, setFormState] = useState(initialState);
  const { addressFrom, reference_id } = formState;

  const keyringOptions = keyring.getPairs().map((account) => ({
      key: account.address,
      value: account.address,
      text: account.meta.name.toUpperCase()
  }));

  const onChange = (_, data) => {
    setClickable(clickable => {
      return {
        ...clickable,
        isSelected: (data.state === 'addressFrom')? true:false
      }
    })
  
    setFormState(FormState => {
      return {
        ...FormState,
        [data.state]: data.value
      };
    });
  }

  const concludeVote = () => {
    const fromPair = keyring.getPair(addressFrom);
    setStatus('Sending...');

    api.tx.governanceModule
    .concludeVote(reference_id)
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

  useEffect(() => {
    let unsubscribe;
    if (vote_ends < blockNumber) {
      setClickable(clickable => {
        return {
          ...clickable,
          isExpired: (vote_ends > 0 && vote_ends < blockNumber)?true:false,
          isConcluded: (concluded === 'true')?true:false,
        };
      });
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [blockNumber, isSelected, concluded, vote_ends])
  
  // TODO:refactor this
  const isDisabled = (isConcluded, isSelected, isExpired) => {
    if(!isConcluded && isSelected && isExpired) {
      return false;
    }
    return true;
  }

  return(
    <>
      <h1>Conclude Vote</h1>
      <ul> Requirements
        <li>isConcluded: {isConcluded? 'True': 'False'}</li>
        <li>isExpired: {isExpired? 'True': 'False'}</li>
        <li>isSelected: {isSelected? 'True':'False'}</li>
      </ul>
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
          <Button
            onClick={concludeVote}
            disabled={isDisabled(isConcluded, isSelected, isExpired)}
            // isSelected: T F
            // isConcluded: F T
            // isExpired: T F
            primary
            type='submit'>
            Conclude
          </Button>
          {status}
        </Form.Field>
      </Form>
    </>
  );
}