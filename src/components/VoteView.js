import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';

// components
import CastBallot from './castBallot';

// Details about Vote of specific id
// query: votesByIndex, voteResult, votedAccounts
// tx: ballot, conclude, lockvote, withdraw
export default function VoteView(props) {
  const { api, keyring } = props;
  const { id } = useParams();
  const [voteState, setVoteState] = useState({});
  const { vote_type, approved, creator, vote_ends, when, concluded, hash, aye, nay } = voteState;

  // get vote, put it in voteState
  useEffect(() => {
    let unsubscribe;
    const f = async () => { await api.queryMulti([
      [api.query.governanceModule.votesByIndex, id],
      [api.query.governanceModule.voteIndexHash, id],
      [api.query.governanceModule.votedAccounts, [id, 0]],
      [api.query.governanceModule.votedAccounts, [id, 1]],
    ], ([vote, hash, aye, nay]) => {
      setVoteState({
        id: vote.id.toString(), 
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
    f().then(unsub => {
      unsubscribe = unsub;
    }).catch(console.error);
    
    return () => unsubscribe && unsubscribe();
  }, [ api.query.governanceModule, id ])

  const typeOfVote = (vote_type) => {
    switch(vote_type) {
      case '0': return "Vote";
      case '1': return "LockVote";
      default: return "Undefined Vote";
    }
  }

  return(
    <>    
      <div style={{float:'left'}}><Link to={`/vote/${id-1}`}>Before</Link></div>
      <div style={{paddingLeft: '20px', float:'left'}}><Link to={`/vote/${parseInt(id)+1}`}>Next</Link></div>

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


      <CastBallot api={api} keyring={keyring} id={id}/>
    </>
  );
}