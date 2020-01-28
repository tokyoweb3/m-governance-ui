import React, {useEffect, useState} from 'react';
import { Segment, Image, Grid } from 'semantic-ui-react';
import logo from '../images/logo.png';

interface Props {
  api: {rpc: any; };
  blockNumber: string;
}
interface NodeInfo {
  chain: string;
  nodeName: string;
  nodeVersion: string;
}

export default function NodeInfo({api, blockNumber}: Props) {
  const [nodeInfo, setNodeInfo] = useState<NodeInfo>({chain: '', nodeName: '', nodeVersion: ''});

  useEffect(() => {
    const getInfo = () => {
      Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version(),
      ])
      .then(([chain, nodeName, nodeVersion]) => {
        setNodeInfo ({
          chain,
          nodeName,
          nodeVersion,
        })
      })
      .catch((e) => console.error(e));
    }
    getInfo()
  },[]);
  
  return (
    <Segment className='info'>
      <Grid colums={2}>
          <Grid.Column style={{padding:'0', paddingTop:'5px'}}>
            <Image circular centered src={logo}/>
          </Grid.Column>
          <Grid.Column width={5}>
            <Grid.Row>
              <div className='chain' style={{fontSize:'16px'}}>
                M-Governance
              </div>
            </Grid.Row>
            <Grid.Row>
              <div className='chain' style={{fontSize:'16px'}}>
                {nodeInfo.chain} - {nodeInfo.nodeName} (ver. {nodeInfo.nodeVersion})
              </div>
            </Grid.Row>
            <Grid.Row>
              <div className='blockNumber' style={{fontSize:'16px', fontWeight:'bold'}}>
                {`# ${blockNumber}`}
              </div>
            </Grid.Row>
          </Grid.Column>
      </Grid>
    </Segment>
  )
}