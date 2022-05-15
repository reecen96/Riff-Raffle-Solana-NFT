import { PublicKey } from '@solana/web3.js';
import { RaffleMetaData } from '../lib/types';
import { TESTING } from './misc';

const testWhitelist = new Map<string, RaffleMetaData>([
  // ['CU7ZkyUfKnxYjUY1Lo71sez2D1AJLqGoTbWtuUAst1qq', { name: 'Simple Raffle' }],
  // ['Aq5cZhbR28TYqt9SVAopGQVq5Q64BLmZE3kURxCHuv3U', { name: 'Second Raffle' }],
  // ['C8MksYdZq3jasJoLkuZN6frT9TuZ2STzCkCCDqnrmKhv', { name: 'Third Raffle' }],
  // ['3kTRXdm2xKejFkNfKxw88GV2cGZaASfkjysJ48fwNsYJ', { name: 'SOL Raffle' }],
  // ['HhppMJ3x9cdNnXPZKJTR8zCzWEmNx5RGLRgx94nt8AKQ', { name: 'SOL Raffle 2' }],
  // ['5Po1nyZ9UAQzjS2KdV8b6Lwk3y9hwxrL1po2dvfn6dr9', { name: 'MEME Raffle' }],
  // [
  //   '9FoUjfUpWwhHYaGKM9G5eYab7qow3oWqdo2G5Ehj3h5L',
  //   {
  //     name: 'Oh my dRaffle',
  //     overviewImageUri: '/resources/001-mainnet-launch.gif',
  //     alternatePurchaseMints: [
  //       new PublicKey('So11111111111111111111111111111111111111112'),
  //     ],
  //   },
  // ],
]);

const prodWhitelist = new Map<string, RaffleMetaData>([
  [
    'HpCtUDuAMzsjiZD9bBDbLDrfniw7qAP4CbxwUzobsBFq',
    {
      name: 'TEST raffle',
      // overviewImageUri: '/resources/quack.png',
    },
  ],
  [
    'EXJPFGP7FSUVdG1zEnbcCdnjpm7QBBsS6uBSRL3wv362',
    {
      name: 'SOL Raffle',
      // overviewImageUri: '/resources/stoned.png',
    },
  ],
]);

export const RAFFLES_WHITELIST = TESTING ? testWhitelist : prodWhitelist;
