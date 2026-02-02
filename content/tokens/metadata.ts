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
    logo: '/tokens/btc.svg',
    website: 'https://bitcoin.org',
    whitepaper: 'https://bitcoin.org/bitcoin.pdf',
  },
  eth: {
    name: 'Ethereum',
    symbol: 'ETH',
    tradingViewSymbol: 'BINANCE:ETHUSDT',
    marketCap: '$480B',
    color: 'from-purple-400 to-purple-600',
    logo: '/tokens/eth.svg',
    website: 'https://ethereum.org',
    whitepaper: 'https://ethereum.org/en/whitepaper/',
  },
  bnb: {
    name: 'BNB',
    symbol: 'BNB',
    tradingViewSymbol: 'BINANCE:BNBUSDT',
    marketCap: '$89B',
    color: 'from-yellow-400 to-yellow-600',
    logo: '/tokens/bnb.svg',
    website: 'https://www.bnbchain.org',
    whitepaper: 'https://github.com/bnb-chain/whitepaper',
  },
  sol: {
    name: 'Solana',
    symbol: 'SOL',
    tradingViewSymbol: 'BINANCE:SOLUSDT',
    marketCap: '$78B',
    color: 'from-purple-500 to-pink-500',
    logo: '/tokens/sol.svg',
    website: 'https://solana.com',
  },
}

export function getTokenMetadata(slug: string): TokenMetadata | undefined {
  return tokensMetadata[slug.toLowerCase()]
}

export function getAllTokenSlugs(): string[] {
  return Object.keys(tokensMetadata)
}
