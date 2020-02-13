// React API
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Polkadot API
import { ApiPromise, WsProvider } from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';
import  { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
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
  const [accountLoaded, setAccountLoaded] = useState(false);
  const [blockNumber, setBlockNumber] = useState('0');

  let WS_PROVIDER = window.location.hostname == "localhost"? 'ws://localhost:9944' : 'wss://m-governance.org';
  // let basename = window.location.hostname == "localhost"? '/': '/apps.m-governance.org';

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

  // new hook to get injected accounts
  useEffect(() => {
    web3Enable('M-Governance')
    .then((extensions) => {
    // web3Accounts promise returns an array of accounts
    // or an empty array if our user doesn't have an extension or hasn't given the
    // access to any of their account.
    web3Accounts()
        .then((accounts) => {
            // add the source to the name to avoid confusion
            return accounts.map(({ address, meta }) => ({
                address,
                meta: {
                ...meta,
                name: `${meta.name} (${meta.source})`
                }
            }));
        })
        // load our keyring with the newly injected accounts
        .then((injectedAccounts) => {
            loadAccounts(injectedAccounts);
        })
        .catch(console.error);
    })
    .catch(console.error);
  }, []);
  
  const loadAccounts = (injectedAccounts:any) => {
  keyring.loadAll({
      isDevelopment: true
  }, injectedAccounts);
  setAccountLoaded(injectedAccounts.length?true:false);
  };

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

      <Router basename={`/#`}>
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