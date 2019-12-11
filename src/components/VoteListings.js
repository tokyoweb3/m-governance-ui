import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// TODO: remove let voteArray????, instead use arrayState

export default function VoteListings (props) {
  const { api, blockNumber } = props;

  const [voteCountState, setVoteCountState] = useState(0);
  const [votes, setVotes] = useState({});
  const [arrayState, setArrayState] = useState({list:[]});
  let voteArray = [];

  useEffect(() => {
    let unsubscribe;
    api.query.governanceModule.allVoteCount(count => {
      setVoteCountState(count.words);
    })
    .then(unsub => { unsubscribe = unsub; })
    .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api.query.governanceModule.allVoteCount, setVotes])

  useEffect(() => {
    let unsubscribeAll;
    voteArray = [...Array(parseInt(voteCountState)).keys()].map(x=> ++x)
    setArrayState({ list:voteArray });
    api.query.governanceModule.votesByIndex
      .multi(voteArray, (votes) => {
        // assign each voteArrayIndex with votes[index] json
        const votesMap = voteArray.reduce((acc, vote, index) => ({
          ...acc,
          [vote]: {
            id: votes[index].id.toString(), 
            vote_type: votes[index].vote_type.toString(),
            approved: votes[index].approved.toString(),
            creator: votes[index].creator.toString(),
            when: votes[index].when.toString(),
            vote_ends: votes[index].vote_ends.toString(),
            concluded: votes[index].concluded.toString()
          }
        }), {});
        setVotes(votesMap);
      })
      .then(unsub => { unsubscribeAll = unsub; })
      .catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [voteCountState, api.query.governanceModule]);
  
  const typeOfVote = (vote_type) => {
    switch(vote_type) {
      case '0': return "Vote";
      case '1': return "LockVote";
      default: return "Undefined Vote";
    }
  }


  const colorByExpired = (expiry) =>{
    if(expiry < blockNumber){
      return {color: 'red'}
    } else{
      return {color: 'green'}
    }
  }
  const colorByApproved = (approved) =>{
    if(approved === 'false'){
      return {color: 'red'}
    } else{
      return {color: 'green'}
    }
  }
  return (
    <>
      <h1>Votes: {voteCountState}</h1>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>VoteType</Table.HeaderCell>
            <Table.HeaderCell>Approved</Table.HeaderCell>
            <Table.HeaderCell>Creator</Table.HeaderCell>
            <Table.HeaderCell>When</Table.HeaderCell>
            <Table.HeaderCell>VoteEnds</Table.HeaderCell>
            <Table.HeaderCell>Concluded</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {arrayState.list.map((id, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell textAlign='right'><Link to={`/vote/${id}`}>{id}</Link>
                </Table.Cell>
                <Table.Cell>{votes[id] && typeOfVote(votes[id].vote_type)}</Table.Cell>
                <Table.Cell style={colorByApproved(votes[id] && votes[id].approved)}>{votes[id] && votes[id].approved}</Table.Cell>
                <Table.Cell>{votes[id] && votes[id].creator}</Table.Cell>
                <Table.Cell>{votes[id] && votes[id].when}</Table.Cell>
                <Table.Cell style={colorByExpired(votes[id] && votes[id].vote_ends)}>{votes[id] && votes[id].vote_ends}</Table.Cell>
                <Table.Cell>{votes[id] && votes[id].concluded}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
  