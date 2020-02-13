import { web3FromSource } from '@polkadot/extension-dapp';

const getPair = async (api: any, keyring: any, addressFrom: any) => {
  const fromPair = keyring.getPair(addressFrom);
  const { address, meta: { source, isInjected } } = fromPair;
  let fromParam;
  
  // set the signer
  if (isInjected) {
    const injected = await web3FromSource(source);
    fromParam = address;
    api.setSigner(injected.signer);
  } else {
    fromParam = fromPair;
  }
  return fromParam;
}

export {getPair}