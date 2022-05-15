export const wrappedSOL = 'So11111111111111111111111111111111111111112';

const tokenRegistry = {
  So11111111111111111111111111111111111111112: {
    chainId: 101,
    address: wrappedSOL,
    symbol: 'SOL',
    name: 'SOL',
    decimals: 9,
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    tags: [],
    extensions: {
      website: 'https://solana.com/',
      serumV3Usdc: '9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT',
      serumV3Usdt: 'HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1',
      coingeckoId: 'solana',
      imageURI: '/resources/solana-logo.gif',
    },
  },
  '29a6AWBP44QUnfZKNpWSU7tkfrfDBym94EtCZBPvJ2ao': {
    chainId: 101,
    address: '29a6AWBP44QUnfZKNpWSU7tkfrfDBym94EtCZBPvJ2ao',
    symbol: '$A',
    name: 'A TOKEN',
    decimals: 9,
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9nusLQeFKiocswDt6NQsiErm1M43H2b8x6v5onhivqKv/logo.png',
    tags: [],
    extensions: {
      website: 'https://sollama.finance',
      twitter: 'https://twitter.com/SollamaFinance',
    },
  },
  '72UgZ7avdJZBbv3wR7hbWcFy6dyHHNAoJw7CimGA55Zh': {
    chainId: 101,
    address: '72UgZ7avdJZBbv3wR7hbWcFy6dyHHNAoJw7CimGA55Zh',
    symbol: '$PM1',
    name: 'USDT',
    decimals: 2,
    logoURI: `${process.env.REACT_APP_URL}/tether-usdt-logo.png`,
    tags: [],
    extensions: {
      website: 'https://sollama.finance',
      twitter: 'https://twitter.com/SollamaFinance',
    },
  },
  H32RbcbAoskfMVyPSTNQucEkYP2qvYLkmDg5ij4cPBhH: {
    chainId: 101,
    address: 'H32RbcbAoskfMVyPSTNQucEkYP2qvYLkmDg5ij4cPBhH',
    symbol: 'PM2',
    name: 'Prize Mint 2',
    decimals: 0,
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9nusLQeFKiocswDt6NQsiErm1M43H2b8x6v5onhivqKv/logo.png',
    tags: [],
    extensions: {
      website: 'https://sollama.finance',
      twitter: 'https://twitter.com/SollamaFinance',
    },
  },
  DCTo8EdRrycGpjRDntmdAMoaHdq77mQwdEchtoXAtje3: {
    chainId: 101,
    address: 'DCTo8EdRrycGpjRDntmdAMoaHdq77mQwdEchtoXAtje3',
    symbol: 'DCT',
    name: 'dRaffle Community Token',
    decimals: 6,
    logoURI: '/dRaffle-logo.png',
    tags: [],
  },
  '534G9F8dQuFJX6BMzzMPWBZEsZ7dZ5afjwVnTK5CTr4u': {
    chainId: 101,
    address: '534G9F8dQuFJX6BMzzMPWBZEsZ7dZ5afjwVnTK5CTr4u',
    symbol: 'RANDOTOKEN',
    name: 'TEST Community Token',
    decimals: 6,
    logoURI: '/dRaffle-logo.png',
    tags: [],
  },
  F6RHU6tNfzwpHbnYhx5szEY3vjJDyF5D1E6N9rrMgQ7x: {
    chainId: 101,
    address: 'F6RHU6tNfzwpHbnYhx5szEY3vjJDyF5D1E6N9rrMgQ7x',
    symbol: '$TOKEN',
    name: 'SPL-Token Community Token',
    decimals: 0,
    logoURI: '/dRaffle-logo.png',
    tags: [],
  },
  '4CHXmf6dkqL4pPY1DdmShw5yeow5DTM7mvZ9QXx4WkwD': {
    chainId: 101,
    address: '4CHXmf6dkqL4pPY1DdmShw5yeow5DTM7mvZ9QXx4WkwD',
    symbol: 'SAMO',
    name: 'SAMO',
    decimals: 9,
    logoURI: '/resources/samo-logo.png',
    tags: [],
  },
  ENNuzbdv7MiT9fjg7ApC2Fyf2F67PWww5Trm6A7W1BSn: {
    chainId: 101,
    address: 'ENNuzbdv7MiT9fjg7ApC2Fyf2F67PWww5Trm6A7W1BSn',
    symbol: 'QUACK',
    name: 'QUACKOIN',
    decimals: 6,
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ENNuzbdv7MiT9fjg7ApC2Fyf2F67PWww5Trm6A7W1BSn/logo.png',
    tags: [],
  },
};

export const tokenInfoMap = new Map(Object.entries(tokenRegistry));

export const UNKNOWN_TOKEN_INFO = {
  chainId: 101,
  symbol: '???',
  name: 'Unkown token',
  decimals: 0,
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9nusLQeFKiocswDt6NQsiErm1M43H2b8x6v5onhivqKv/logo.png',
  tags: [],
  extensions: {},
};
