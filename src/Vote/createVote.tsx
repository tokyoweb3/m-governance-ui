import React, {useState, useEffect} from 'react';
import { Button, Dropdown, Form, Input, DropdownProps, InputOnChangeData, Segment, Message, ButtonContentProps } from 'semantic-ui-react';

interface Status{
  status: {
    isFinalized: boolean,
    asFinalized: string,
    type: string
  }
}
interface Form {
  addressFrom: string;
  voteType: number;
  expLength: number;
  data: string;
  approved: number;
}

export default function CreateVote({api, keyring}: {api:any; keyring:any}) {
  const [message, setMessage] = useState({header: "", content:"", success:false, error:false, warning:false});
    const initialState = {
        addressFrom: '',
        voteType: 0,
        expLength: 0,
        data: '',
        approved: 0,
        key: '',
    };
    const [formState, setFormState] = useState<Form>(initialState);
    const { addressFrom, voteType, expLength, data, approved } = formState;
    const[vals, setVals] = useState<any[]>([]);

    const keyringOptions = keyring.getPairs().map((account: { address: any; meta: { name: string; }; }) => ({
        key: account.address,
        value: account.address,
        text: account.meta.name.toUpperCase()
    }));

    const onChange = (_: any, data: DropdownProps | InputOnChangeData) => {
        setFormState(FormState => {
          return {
            ...FormState,
            [data.state]: data.value
          };
        });
    }

    const onChangeOption = (_: any, data: InputOnChangeData) => {
      setVals(prev=>{
        return{
          ...prev,
          [data.state]: data.value
        }
      })
    }

    const createVote = () => {
        const fromPair = keyring.getPair(addressFrom);
        const options:string[] = Object.values(vals).map(val => val)
        setMessage({...message, header: 'Just one second', content: 'Sending...', warning: true});
        
        api.tx.governanceModule
        .createVote(voteType, expLength, data, approved, options)
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
    }

    const [count, setCount] = useState<number>(0);
    // add or remove option input
    const onClickOption= (_: any, data: ButtonContentProps) => {
      setCount(data.state==='add'?count+1 : count-1);
    }
    
    return (
        <Segment>
          <h1>CreateVote</h1>
          <Segment.Group>
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
                    onChange={onChange}
                    label='VoteType'
                    fluid
                    placeholder='voteType: u8'
                    state='voteType'
                    type='number'
                />
                </Form.Field>
                <Form.Field>
                <Input
                    label='Expire Length'
                    fluid
                    onChange={onChange}
                    state='expLength'
                    placeholder='BlockNumber: u64'
                    type='number'
                />
                </Form.Field>

                {/* TODO: Selection of index of CAHash */}
                <Form.Field>
                <Input
                    label='Approved'
                    fluid
                    onChange={onChange}
                    state='approved'
                    placeholder="CA Index: u64"
                    type='number'
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
                <div className='ui--Param-Vector-buttons'>
                  <Button
                    primary
                    onClick={onClickOption}
                    state='add'
                    content='Add item'
                    icon='add'
                  />
                  <Button
                    disabled={count === 0}
                    negative
                    onClick={onClickOption}
                    state='remove'
                    content='Remove item'
                    icon='minus'
                  />
                </div>
                {[...Array(count).keys()].map(x=> ++x).map((val, i)=>{
                  return(
                    <Input
                        key={i}
                        onChange={onChangeOption}
                        label='optionInput'
                        fluid
                        placeholder={`option: ${i}`}
                        state={i}
                        type='string'
                    />
                  )
                })}
                <Form.Field>
                <Button
                    onClick={createVote}
                    primary
                    type='submit'
                >
                    Send
                </Button>
                </Form.Field>
            </Form>
            </Segment.Group>
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