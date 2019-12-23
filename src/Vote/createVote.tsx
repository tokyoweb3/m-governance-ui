import React, {useState} from 'react';
import { Button, Dropdown, Form, Input, DropdownProps, InputOnChangeData, Segment } from 'semantic-ui-react';

interface Status{
  status: {
    isFinalized: boolean,
    asFinalized: string,
    type: string
  }
}

export default function CreateVote({api, keyring}: {api:any; keyring:any}) {
    const [status, setStatus] = useState('');
    const initialState = {
        addressFrom: '',
        voteType: 0,
        expLength: 0,
        data: '',
        approved: false
    };
    const [formState, setFormState] = useState(initialState);
    const { addressFrom, voteType, expLength, data, approved } = formState;

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

    const createVote = () => {
        const fromPair = keyring.getPair(addressFrom);

        setStatus('Sending...');

        api.tx.governanceModule
        .createVote(voteType, expLength, data, approved)
        .signAndSend(fromPair, ({status}: Status) => {
            if (status.isFinalized) {
            setStatus(`Completed at block hash #${status.asFinalized.toString()}`);
            } else {
            setStatus(`Current transfer status: ${status.type}`);
            }
        }).catch((e:any) => {
            setStatus(':( transaction failed');
            console.error('ERROR:', e);
        });
    }

    return (
        <Segment.Group>
          <Segment><h1>CreateVote</h1></Segment>
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
                    type='number'
                />
                </Form.Field>
                <Form.Field>
                <Dropdown
                    label='Approved'
                    fluid
                    onChange={onChange}
                    state='approved'
                    placeholder="Require Approval?"
                    selection
                    options={[{key:0, value: false, text: "False"}, {key:1, value: true, text: "True"}]}
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
                <Form.Field>
                <Button
                    onClick={createVote}
                    primary
                    type='submit'
                >
                    Send
                </Button>
                {status}
                </Form.Field>
            </Form>
          </Segment.Group>
        </Segment.Group>
    );
}