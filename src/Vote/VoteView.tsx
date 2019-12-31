import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { Segment, Tab } from 'semantic-ui-react';

// components
import CastBallot from './castBallot';
import ConcludeVote from './concludeVote';
import ResultChart from './ResultChart';

interface Props {
  api: any;
  keyring: any;
  blockNumber: string;
}
interface VoteState {
  vote_type: number;
  approved?: string;
  creator?: string;
  vote_ends?: string 
  when?: string
  concluded?: string
  hash?: string
}
interface VoteToString {
  vote_type:  {toString: () => any};
  approved: { toString: () => any};
  creator: { toString: () => any};
  when: { toString: () => any};
  vote_ends: { toString: () => any};
  concluded: { toString: () => any};
}

// Details about Vote of specific id
// query: votesByIndex, voteResult, votedAccounts
// tx: ballot, conclude, lockvote, withdraw
export default function VoteView({api, keyring, blockNumber}: Props) {
  const { id } = useParams();
  const [voteState, setVoteState] = useState<VoteState>({vote_type: 0});
  const { vote_type, approved, creator, vote_ends, when, concluded, hash } = voteState;
  const [optionState, setOptionState] = useState<string[]>([]);
  const [accounts, setAccounts] = useState<string[][]>([]);

  const panes = [
    { menuItem: {key: 'voteView', icon: 'info', content: 'VoteView'}, render: ()=> 
    <Tab.Pane>
      {voteView()}
      <CastBallot api={api} keyring={keyring} id={id} options={optionState}/>
      <ResultChart options={optionState} accounts={accounts}/>
    </Tab.Pane>},
    { menuItem: {key: 'conclude', icon: 'check circle', content: 'Conclude'}, render: ()=> <Tab.Pane>
      <ConcludeVote api={api} keyring={keyring} id={id!} vote_ends={parseInt(vote_ends!)} concluded={concluded!} blockNumber={parseInt(blockNumber!)}/>
    </Tab.Pane>},
  ]

  // get vote, put it in voteState
  useEffect(() => {
    let unsubscribe: () => any;
    const f = async () => { await api.queryMulti([
      [api.query.governanceModule.votesByIndex, id],
      [api.query.governanceModule.voteIndexHash, id],
      [api.query.governanceModule.voteOptions, id],
    ], ([vote, hash, options]:[VoteToString, string, string[] ]) => {
      setVoteState({
        vote_type: vote.vote_type.toString(),
        approved: vote.approved.toString(),
        creator: vote.creator.toString(),
        when: vote.when.toString(),
        vote_ends: vote.vote_ends.toString(),
        concluded: vote.concluded.toString(),
        hash: hash.toString(),
      });
      setOptionState(options);
      getAccounts(options);
    });
    }
    f().then((unsub: any) => {unsubscribe = unsub;})
    .catch(console.error);
    
    return () => unsubscribe && unsubscribe();
  }, [ id ])

  const getAccounts = async (options: string[]) => {
    let optionArr = [...Array(options.length).keys()].map(x=> ++x);
    await api.query.governanceModule.accountsByOption
      .multi(optionArr.map(val => [id, val-1]), (accounts: string[][])=>{
        setAccounts(accounts);
    })
  }

  const typeOfVote = (vote_type: any) => {
    switch(vote_type) {
      case '0': return "Vote";
      case '1': return "LockVote";
      default: return "Undefined Vote";
    }
  }
  function hex2a(hexx: any) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }

  const voteView = () => {
    return(
      <Segment>
      <div style={{float:'left'}}><Link to={`/vote/${parseInt(id!)-1}`}><h3>Before</h3></Link></div>
      <div style={{paddingLeft: '20px', float:'left'}}><Link to={`/vote/${parseInt(id!)+1}`}><h3>Next</h3></Link></div>

      <h1 style={{clear:'both'}}>Vote#{id}</h1>
      <ul style={{listStyleType:"none"}}>
        <li>Hash: {hash}</li>
        <li>CreatedAt# {when}</li>
        <li>Creator: {creator}</li>
        <li>VoteType: {typeOfVote(vote_type)}</li>
        <li>Approved: {approved}</li>
        <li>VoteEndsAt# {vote_ends}</li>
        <li>Concluded: {concluded}</li>
        <li>
          <ul>Options:
            {optionState.map((option, index) => {
              return(
                <li key={index}>
                  <ul>{hex2a(option)}: {accounts[index] && accounts[index].length}
                    {accounts[index] && accounts[index].map((account, i)=>{
                      return (
                      <li key={i}>
                        {account.toString()}
                      </li>
                      );
                    })}
                  </ul>
                </li>
              )
            })}

          </ul>

        </li>
      </ul>
      </Segment>
      
    );
  }
  return(
    <Segment.Group>    
      <Tab menu={{color: 'grey', inverted: true}} panes={panes} />
    </Segment.Group>
  );
}