import React, {useEffect, useState} from 'react';

export default function NodeInfo(props) {
  const {api, blockNumber} = props;
  const [nodeInfo, setNodeInfo] = useState({});

  useEffect(() => {
    let unsubscribe;
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

    return ()=> unsubscribe && unsubscribe();
  },[api.rpc.system]);
  
  return (
    <>
      {nodeInfo.chain} - {nodeInfo.nodeName} (v{nodeInfo.nodeVersion})
      <br/>
      {`#CurrentBlock: ${blockNumber}`}
      <hr/>
    </>
  )
}