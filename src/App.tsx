// React API
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Polkadot API
import { ApiPromise, WsProvider } from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';
// Styles, tools
import { Container, Dimmer, Loader, Grid} from 'semantic-ui-react';
import types from './Type';
// Components
import HomepageLayout from './HomepageLayout';
import MenuBar from './Menu/MenuBar';
import Footer from './Menu/Footer';
import Balances from './Transfer/Balances';
import NodeInfo from './Menu/NodeInfo';
import Transfer from './Transfer/Transfer';
import CreateVote from './Vote/createVote';
import VoteListings from './Vote/VoteListings';
import VoteView from './Vote/VoteView';
import Certificate from './Certificate/Certificate';
import Tutorial from './Tutorial/Tutorial';

import 'semantic-ui-css/semantic.min.css'
import CertificateView from './Certificate/CertificateView';
import ChainInfo from './Vote/ChainInfo';

export default function App () {
  const [api, setApi] = useState();
  const [apiReady, setApiReady] = useState();
  const [blockNumber, setBlockNumber] = useState('0');

  let WS_PROVIDER = window.location.hostname == "localhost"? 'ws://localhost:9944' : 'wss://m-governance.org';

  useEffect(() => {
    const provider = new WsProvider(WS_PROVIDER);
    console.log("WS endpoint=" + WS_PROVIDER);
    ApiPromise.create({provider, types})
      .then((api: { isReady: Promise<any>; }) => {
        setApi(api);
        api.isReady.then(() => setApiReady(true));
      })
      .catch((e: any) => console.error(e));
  }, []);

  useEffect(() => { 
    keyring.loadAll({
      isDevelopment: true
    });
  },[]); 

  useEffect(() => {
    if(apiReady){
      let unsubscribe: () => void;
      const f = async () => api.rpc.chain.subscribeNewHeads((header: { number: string; }) => {
        setBlockNumber(header.number);
      });
      f().then(unsub => {
        unsubscribe = unsub;
      }).catch(console.error);
      return () => unsubscribe && unsubscribe();
    }
  },[apiReady]);

  const loader = function (text: string){
    return (
      <Dimmer active>
        <Loader size='small'>{text}</Loader>
      </Dimmer>
    );
  };
  
  if(!apiReady){
    return loader('Connecting to the blockchain')
  }
  
  return (
    <Container fluid>
      <NodeInfo
        api={api}
        blockNumber={blockNumber}
      />

      <Router>
          <MenuBar/>
          <Switch>
            <Route 
              path="/vote/:id" 
              children={<VoteView api={api} keyring={keyring} blockNumber={blockNumber}/>}
            />
            <Route path="/vote">
            <VoteListings
              api={api}
              keyring={keyring}
              blockNumber={blockNumber}
            />
            <Grid>
              <Grid.Row>
              <Grid.Column width={10}>
                <CreateVote
                  api={api}
                  keyring={keyring}
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <ChainInfo 
                  api={api}
                  blockNumber={blockNumber}
                  />
              </Grid.Column>
              </Grid.Row>
            </Grid>
            </Route>

            <Route path="/tutorial">
              <Tutorial />
            </Route>
            <Route path="/transfer">
            <Balances
              keyring={keyring}
              api={api}
            />
            <Transfer
              api={api}
              keyring={keyring}
            />
            </Route>
            <Route 
              path="/certificate/:index/:hash" 
              children={<CertificateView api={api} keyring={keyring}/>}
            />
            <Route path="/certificate">
              <Certificate
                api={api}
                keyring={keyring}
              />
            </Route>
            <Route path="/">
            <HomepageLayout />
            </Route>
          </Switch>
      </Router>
      <Footer />
    </Container>
  );
}