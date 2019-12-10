import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';

export default function ViewVote (props) {
    const { api } = props;

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
              concluded: votes[index].concluded.toString(),
            }
          }), {});
          setVotes(votesMap);
        })
        .then(unsub => { unsubscribeAll = unsub; })
        .catch(console.error);
  
      return () => unsubscribeAll && unsubscribeAll();
    }, [voteCountState, api.query.governanceModule.votesByIndex]);
  
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
                  <Table.Cell textAlign='right'>{id}</Table.Cell>
                  <Table.Cell>{votes[id] && votes[id].vote_type}</Table.Cell>
                  <Table.Cell>{votes[id] && votes[id].approved}</Table.Cell>
                  <Table.Cell>{votes[id] && votes[id].creator}</Table.Cell>
                  <Table.Cell>{votes[id] && votes[id].when}</Table.Cell>
                  <Table.Cell>{votes[id] && votes[id].vote_ends}</Table.Cell>
                  <Table.Cell>{votes[id] && votes[id].concluded}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </>
    );
  }
  