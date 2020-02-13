import React, {useState, useEffect} from 'react';
import { Popup, Button, Dropdown, Form, Input, DropdownProps, InputOnChangeData, Segment, Message, ButtonContentProps } from 'semantic-ui-react';
import { getPair } from '../apihelpers';
const helper = require('./helper.tsx');

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
const voteTypeOptions = [
  {key: 0, value: 0, text: 'Normal Vote'},
  {key: 1, value: 1, text: 'Lock Vote'},
  {key: 2, value: 2, text: 'Quadratic Vote'}
];
const popup = {
  borderRadius: 0,
  opacity: 0.7,
  padding: '2em',
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
    const[ vals, setVals ] = useState<any[]>([]);
    const [ caOptions, setCaOptions ] = useState<{key: any; value: any; text: string;}[]>([{key: -1, value: -1, text: 'Permissionless'}]);

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

    // get CA list
    useEffect(() => {
      let unsubscribe: () => any;
      api.query.certificateModule.cAData((dataList: number[])=> {
        for (let index in dataList) {
          if (parseInt(index) >= 0) {
          setCaOptions(prev => {
            return[
              ...prev,
              {
                key: index,
                value: index,
                text: helper.hex2a(dataList[index])
              }
            ]
          })
          }
        }
      })
      .then((unsub: any) => { 
        unsubscribe = unsub; 
      })
      .catch(console.error);
  
      return () => unsubscribe && unsubscribe();
    }, [])

    const createVote = async () => {
        const fromPair = await getPair(api, keyring, addressFrom);
        const options:string[] = Object.values(vals).map(val => val)
        setMessage({...message, header: 'Just one second', content: 'Sending...', warning: true});
        
        api.tx.governanceModule
        .createVote(voteType, expLength, data, approved+1, options)
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

    // options
    const [count, setCount] = useState<number>(2);
    // add or remove option input
    const onClickOption= (_: any, data: ButtonContentProps) => {
      // setCount(data.state==='add'?count+1 : count-1);
      if(data.state==='add'){
        setCount(count+1);
      } else {
        setCount(count-1);
        let newVals = vals;
        delete newVals[count-1];
        setVals(newVals);
      }
    }

    const canSend = () => {
      if(addressFrom && expLength && data && approved && vals[0] && vals[1]){
        return false;
      } 
      return true;
    }

    return (
        <Segment>
          <h1>CreateVote</h1>
          <Segment.Group>
            <Form>
                <Form.Field>
                <Popup
                  trigger={<Dropdown
                    placeholder='Select from your accounts'
                    fluid
                    label="From"
                    onChange={onChange}
                    search
                    selection
                    state='addressFrom'
                    options={keyringOptions}
                />}
                  content='Select an account that you want to create a vote with. The account must own some free balance.'
                  style={popup}
                  inverted
                  on={"click"}
                />
                </Form.Field>
                <Form.Field>
                <Popup
                  trigger={<Dropdown
                    placeholder='Select Vote type'
                    fluid
                    label="VoteType"
                    onChange={onChange}
                    search
                    selection
                    state='voteType'
                    options={voteTypeOptions}
                />}
                  content='Each vote method has different ways of casting and tallying.'
                  style={popup}
                  inverted
                  on={"click"}
                />
                </Form.Field>
                <Form.Field>
                <Popup
                  trigger={<Input
                    label='Expire Length'
                    fluid
                    onChange={onChange}
                    state='expLength'
                    placeholder='BlockNumber: u64'
                    type='number'
                />}
                  content='Any vote can be concluded after block expiration period. After the expiration, the vote no longer accept a ballot.'
                  style={popup}
                  inverted
                  on={"click"}
                />
                </Form.Field>

                <Form.Field>
                <Popup
                  trigger={<Dropdown
                    placeholder='Select CA from the list'
                    fluid
                    label="Approved"
                    onChange={onChange}
                    search
                    selection
                    state='approved'
                    options={caOptions}
                />}
                  header='Central Authority'
                  content='Only accounts registered with a digital certificate which is cryptographically signed by the Central Authoriy can participate in this vote. You can add a new CA or register your account in Certificate tab. Permissionless means any account can participate in the voting.'
                  style={popup}
                  inverted
                  on={"click"}
                />

                </Form.Field>
                <Form.Field>
                <Popup
                  trigger={<Input
                    label='Data'
                    fluid
                    onChange={onChange}
                    state='data'
                    type='string'
                />}
                  content='Any string data less than 256bytes. (e.g. title, url, description, etc..)'
                  style={popup}
                  inverted
                  on={"click"}
                />
                </Form.Field>
                <Form.Field>
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
                <div>
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
                </div>
                </Form.Field>

                <Form.Field>
                <Button
                    onClick={createVote}
                    primary
                    disabled={canSend()}
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