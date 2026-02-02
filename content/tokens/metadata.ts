export interface TokenMetadata {
  name: string
  symbol: string
  tradingViewSymbol: string
  marketCap: string
  color: string
  logo: string
  website: string
  whitepaper?: string
}

export const tokensMetadata: Record<string, TokenMetadata> = {
  btc: {
    name: 'Bitcoin',
    symbol: 'BTC',
    tradingViewSymbol: 'BINANCE:BTCUSDT',
    marketCap: '$2.1T',
    color: 'from-orange-400 to-orange-600',
    logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
    website: 'https://bitcoin.org',
    whitepaper: 'https://bitcoin.org/bitcoin.pdf',
  },
  eth: {
    name: 'Ethereum',
    symbol: 'ETH',
    tradingViewSymbol: 'BINANCE:ETHUSDT',
    marketCap: '$480B',
    color: 'from-purple-400 to-purple-600',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
    website: 'https://ethereum.org',
    whitepaper: 'https://ethereum.org/en/whitepaper/',
  },
  bnb: {
    name: 'BNB',
    symbol: 'BNB',
    tradingViewSymbol: 'BINANCE:BNBUSDT',
    marketCap: '$89B',
    color: 'from-yellow-400 to-yellow-600',
    logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg',
    website: 'https://www.bnbchain.org',
    whitepaper: 'https://github.com/bnb-chain/whitepaper',
  },
  sol: {
    name: 'Solana',
    symbol: 'SOL',
    tradingViewSymbol: 'BINANCE:SOLUSDT',
    marketCap: '$78B',
    color: 'from-purple-500 to-pink-500',
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
    website: 'https://solana.com',
  },
  ada: {
    name: 'Cardano',
    symbol: 'ADA',
    tradingViewSymbol: 'BINANCE:ADAUSDT',
    marketCap: '$56B',
    color: 'from-blue-400 to-blue-600',
    logo: 'https://cryptologos.cc/logos/cardano-ada-logo.svg',
    website: 'https://cardano.org',
    whitepaper: 'https://docs.cardano.org/about-cardano/introduction',
  },
  matic: {
    name: 'Polygon',
    symbol: 'MATIC',
    tradingViewSymbol: 'BINANCE:MATICUSDT',
    marketCap: '$12B',
    color: 'from-indigo-400 to-indigo-600',
    logo: 'https://cryptologos.cc/logos/polygon-matic-logo.svg',
    website: 'https://polygon.technology',
    whitepaper: 'https://polygon.technology/papers/pol-whitepaper',
  },
}

export function getTokenMetadata(slug: string): TokenMetadata | undefined {
  return tokensMetadata[slug.toLowerCase()]
}

export function getAllTokenSlugs(): string[] {
  return Object.keys(tokensMetadata)
}
