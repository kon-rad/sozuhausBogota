import { defaultSnapOrigin } from '../config';
import { GetSnapsResponse, Snap } from '../types';

/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (): Promise<GetSnapsResponse> => {
  console.log('get Snaps called');
  
  return (await window.ethereum.request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
};

/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) => {
  console.log('connectSnap called - snapId, params', snapId, params);

  await window.ethereum.request({
    method: 'wallet_enable',
    params: [
      {
        wallet_snap: {
          [snapId]: {
            ...params,
          },
        },
      },
    ],
  });
};

/**
 * Get the snap from MetaMask.
 *
 * @param version - The version of the snap to install (optional).
 * @returns The snap object returned by the extension.
 */
export const getSnap = async (version?: string): Promise<Snap | undefined> => {

  console.log('getSnap called - version', version);

  try {
    const snaps = await getSnaps();
    console.log('snaps -> ', snaps);

    return Object.values(snaps).find(
      (snap) =>
        snap.id === defaultSnapOrigin && (!version || snap.version === version),
    );
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

/**
 * Invoke the "hello" method from the example snap.
 */

export const setAddress = async (address: string) => {
  console.log('setAddress called - address', address);

  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: [
      defaultSnapOrigin,
      {
        method: 'set_address',
        address
      },
    ],
  });
};

export const fetchAddress = async () => {
  console.log('fetchAddress called ');

  const result: any = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: [defaultSnapOrigin, { method: 'get_address' }],
  });
  if (result !== undefined) {
    console.log('resutl -> ', result);
    return;
  }
  console.log('no result wtf', result);
}

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
