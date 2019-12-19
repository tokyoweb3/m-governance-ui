import React, {useEffect, useState} from 'react';

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
    <>
      {nodeInfo.chain} - {nodeInfo.nodeName} (v{nodeInfo.nodeVersion})
      <br/>
      {`#CurrentBlock: ${blockNumber}`}
      <hr/>
    </>
  )
}