import React, { useEffect, useState } from 'react';
import { Table, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface Props {
  api: any;
  keyring: any;
  blockNumber: string | number;
}

interface VoteToString {
  id: {toString: () => any};
  vote_type:  {toString: () => any};
  approved: { toString: () => any};
  creator: { toString: () => any};
  when: { toString: () => any};
  vote_ends: { toString: () => any};
  concluded: { toString: () => any};
}
interface Vote {
  id: number;
  vote_type:  number;
  approved: string;
  creator: string;
  when: number;
  vote_ends: string;
  concluded: string;
}

export default function VoteListings ({api, blockNumber}: Props) {

  const [voteCountState, setVoteCountState] = useState<number>(0);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [arrayState, setArrayState] = useState<number[]>([]);

  useEffect(() => {
    let unsubscribe: () => any;
    api.query.governanceModule.allVoteCount((count: { words: string; }) => {
      setVoteCountState(parseInt(count.words));
    })
    .then((unsub: any) => { unsubscribe = unsub; })
    .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api.query.governanceModule.createVote])

  useEffect(() => {
    let unsubscribeAll: () => any;
    let voteArray:number[] = [...Array(voteCountState).keys()].map(x=> ++x)
    setArrayState(voteArray);
    setVotes([]);
    api.query.governanceModule.votesByIndex
      .multi(voteArray, (votes:  VoteToString[]) => {
        // assign each voteArrayIndex with votes[index] json
        for(let vote of votes){
          setVotes(prev => {
            return[
              ...prev,
              {
                id: vote.id.toString(), 
                vote_type: vote.vote_type.toString(),
                approved: vote.approved.toString(),
                creator: vote.creator.toString(),
                when: vote.when.toString(),
                vote_ends: vote.vote_ends.toString(),
                concluded: vote.concluded.toString()
              }
            ];
          })
        }
      })
      .then((unsub: any) => { unsubscribeAll = unsub; })
      .catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [voteCountState]);
  
  const typeOfVote = (vote_type: any) => {
    switch(vote_type) {
      case '0': return "Vote";
      case '1': return "LockVote";
      default: return "Undefined Vote";
    }
  }


  const colorByExpired = (vote_ends: string) =>{
    if(parseInt(vote_ends) > blockNumber){
      return {color: 'green'};
    } 
    return {color: 'red'};
  }
  const colorByBool = (bool: string) =>{
    if(bool === 'true'){
      return {color: 'green'}
    } else{
      return {color: 'red'}
    }
  }
  return (
    <Segment.Group>
      <Segment><h1>Votes: {voteCountState}</h1></Segment>
      <Segment.Group>
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
          {arrayState.map((id: number, index: number) => {
            return (
              <Table.Row key={id}>
                <Table.Cell textAlign='right'><Link to={`/vote/${id}`}>{id}</Link>
                </Table.Cell>
                <Table.Cell>{votes[index] && typeOfVote(votes[index].vote_type)}</Table.Cell>
                <Table.Cell style={colorByBool(votes[index] && votes[index].approved)}>{votes[index] && votes[index].approved}</Table.Cell>
                <Table.Cell>{votes[index] && votes[index].creator}</Table.Cell>
                <Table.Cell>{votes[index] && votes[index].when}</Table.Cell>
                <Table.Cell style={colorByExpired(votes[index] && votes[index].vote_ends)}>{votes[index] && votes[index].vote_ends}</Table.Cell>
                <Table.Cell style={colorByBool(votes[index] && votes[index].concluded)}>{votes[index] && votes[index].concluded}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      </Segment.Group>
    </Segment.Group>
  );
}
  