/**
 * The snap origin to use.
 * Will default to the local hosted snap if no value is provided in environment.
 */

console.log('process.env.REACT_APP_SNAP_ORIGIN ', process.env.REACT_APP_SNAP_ORIGIN );
export const defaultSnapOrigin =
  process.env.REACT_APP_SNAP_ORIGIN ?? `local:http://localhost:3000`;
