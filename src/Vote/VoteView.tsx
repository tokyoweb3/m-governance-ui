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
  vote_type?: number;
  approved?: string;
  creator?: string;
  vote_ends?: string 
  when?: string
  concluded?: string
  hash?: string
  aye?: string[]
  nay?: string[]
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
  const [voteState, setVoteState] = useState<VoteState>({});
  const { vote_type, approved, creator, vote_ends, when, concluded, hash, aye, nay } = voteState;
  const panes = [
    { menuItem: {key: 'voteView', icon: 'info', content: 'VoteView'}, render: ()=> 
    <Tab.Pane>
      {voteView()}
      <CastBallot api={api} keyring={keyring} id={id}/>
      <ResultChart aye={aye!} nay={nay!}/>
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
      [api.query.governanceModule.votedAccounts, [id, 0]],
      [api.query.governanceModule.votedAccounts, [id, 1]],
    ], ([vote, hash, aye, nay]:[VoteToString, string, string[], string[]]) => {
      setVoteState({
        vote_type: vote.vote_type.toString(),
        approved: vote.approved.toString(),
        creator: vote.creator.toString(),
        when: vote.when.toString(),
        vote_ends: vote.vote_ends.toString(),
        concluded: vote.concluded.toString(),
        hash: hash.toString(),
        aye,
        nay
      });
    });
    }
    f().then((unsub: any) => {unsubscribe = unsub;})
    .catch(console.error);
    
    return () => unsubscribe && unsubscribe();
  }, [ id ])

  const typeOfVote = (vote_type?: number) => {
    switch(vote_type) {
      case 0: return "Vote";
      case 1: return "LockVote";
      default: return "Undefined Vote";
    }
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
        <li>Aye:{aye && aye.length}
          <ul>
            {aye && aye.map((account, index) => {
              return (
                <li key={index}>{account.toString()}</li>
              );
            })}
          </ul>
        </li>
        <li>Nay:{nay && nay.length}
          <ul>
            {nay && nay.map((account, index) => {
              return (
                <li key={index}>{account.toString()}</li>
              );
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