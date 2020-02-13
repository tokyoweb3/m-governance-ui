import React, {useRef, useEffect, useState} from 'react';
import Timer from 'react-compound-timer';
import { Segment, Grid } from 'semantic-ui-react';

type Message = {
  block:string; 
  length:number; 
  contents:string[] | undefined;
};

const styles = { 
  number: {
    fontSize: 64,
    margin: 'none',
    textAlign: 'center' as 'center'
  },
  ul: {
    listStyleType:"none",
    paddingLeft: '0'
  },
  detailsOl: {
    margin: '0 0 .5em .5em'
  },
  details:{
    border: '1px solid #aaa',
    borderRadius: '4px',
    padding: '.5em .5em 0',
  },
  summary: {
    string: 'bold',
    margin: '-.5em -.5em 0',
    padding: '.5em'
  }
}

export default function ChainInfo({api, blockNumber}: {api:any; blockNumber:string}) {
  const timer = useRef<any>(null);
  const [prevBlock, setPrevBlock]= useState('0');
  const [messages, setMessages] = useState<Message[]>([]);
  const MAX_MESSAGES = 25;
  useEffect(() => {
    timer.current.reset();
  }, [blockNumber])
  
  if(prevBlock !== blockNumber) {
    api.query.system.events((events:any) => {
      let contents:string[] = [];

      // Loop through the Vec<EventRecord>
      events.forEach((record: { event: any; phase: any; }) => {
        // Extract the phase, event and the event types
        const { event, phase } = record;
        const types = event.typeDef;

        // Show what we are busy with
        contents.push(`${event.section}:${event.method}:: (phase=${phase.toString()})`);
        contents.push(`${event.meta.documentation.toString()}`);

        // Loop through each of the parameters, displaying the type and data
        event.data.forEach((data: { toString: () => any; }, index: string | number) => {
          contents.push(`${types[index].type}: ${data.toString()}`);
        });
      });
      let message:Message = {block: blockNumber.toString(), length: events.length, contents};

      setPrevBlock(blockNumber);

      let newMessages = [message, ...messages].slice(0, MAX_MESSAGES);
      setMessages(newMessages);
    });
  }

  return (
        <Segment>
          <Grid celled='internally'>
            <Grid.Row>
            <h3 style={{marginLeft:'.8em'}}>Current Block:</h3>
            <p style={styles.number}>{`#${blockNumber}`}</p>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column width={8}>
              <h3>Last Block:</h3>
              <Timer ref={timer}>
                <p style={styles.number}><Timer.Seconds />
                {/* <Timer.Milliseconds /> */}
                s</p>
              </Timer>
            </Grid.Column>
            <Grid.Column width={8}>
              <h3>Target:</h3>
                <p style={styles.number}>6s</p>
            </Grid.Column>
            </Grid.Row>
          </Grid>
          
          <h3>Events:</h3>
          <ul style={styles.ul}>{messages.map((message, i)=>{
            return <li key={i}>
              <details style={styles.details}>
                <summary style={styles.summary}>#{message.block}: {message.length} Event(s)</summary>
              <ol style={styles.detailsOl}>
                {message.contents && message.contents.map((message, i) => {
                  return <li key={i}>{message}</li>
                })}
              </ol>
            </details></li>
          })}</ul>
        </Segment>
    );
}
