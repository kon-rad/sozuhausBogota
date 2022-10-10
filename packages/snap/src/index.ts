import { OnRpcRequestHandler } from '@metamask/snap-types';
import { Mutex } from 'async-mutex';

type State = {
  dao: string[];
};

/**
 * Get a message from the origin. For demonstration purposes only.
 *
 * @param originString - The origin string.
 * @returns A message based on the origin.
 */
export const getMessage = (originString: string): string =>
  `Hello, ${originString}!`;

async function getDaoAddress(): Promise<any> {
  const state = await wallet.request({
    method: 'snap_manageState',
    params: ['get'],
  });
  console.log('inside getdaoaddress ', state);
  if (
    state === null
  ) {
    return { dao: [] };
  }
  return state;
}

async function satAddress(newState: any) {
  // The state is automatically encrypted behind the scenes by MetaMask using snap-specific keys
  await wallet.request({
    method: 'snap_manageState',
    params: ['update', { dao: newState }],
  });
}

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns `null` if the request succeeded.
 * @throws If the request method is not valid for this snap.
 * @throws If the `snap_confirm` call failed.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }: any) => {
  const state = await getDaoAddress();
  console.log("snap request ", origin, request);

  let daoAddress;

  switch (request.method) {

    // case 'set_address':
    //   ({ address } = request);
    //   await saveMutex.runExclusive(async () => {
    //     const oldState = await getPasswords();
    //     oldState.dao = 
    //     const newState = {
    //       ...oldState,
    //       [website]: { username, password },
    //     };
    //     await savePasswords(newState);
    //   });
    //   return 'OK';
    case 'get_address':
      
      return state.dao;

    case 'set_address':;

      console.log('request.address ', request.address);
      state.dao.push(request.address);

      satAddress(request.address);
    default:
      throw new Error('Method not found.');
  }
};
