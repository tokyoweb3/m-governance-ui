import React, {useEffect, useState} from 'react';
import { UnsubscriptionError } from 'rxjs';

export default function NodeInfo(props) {
  const {api, blockNumber} = props;
  const [nodeInfo, setNodeInfo] = useState({});
  // const [blockNumber, setBlockNumber] = useState('0');

  useEffect(() => {
    let unsubscribe;
    // const getBlockNumber = () => {
    //   api.rpc.chain.getBlock(blockNumber => {
    //     setBlockNumber(blockNumber.block.header.number);
    //   })
    //   .then((unsub)=> {unsubscribe = unsub; })
    //   .catch((e) => console.error(e))
    // }

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
          // blockNumber: blockNumber.block.header.number
        })
      })
      .catch((e) => console.error(e));
    }
    getInfo()
    // getBlockNumber();

    return ()=> unsubscribe && unsubscribe();
  },[api.rpc.system, api.rpc.chain, blockNumber]);
  
  return (
    <>
      {nodeInfo.chain} - {nodeInfo.nodeName} (v{nodeInfo.nodeVersion})
      <br/>
      {`#CurrentBlock: ${blockNumber}`}
      <hr/>
    </>
  )
}