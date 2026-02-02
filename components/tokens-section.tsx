import { TokenCard } from './token-card'
import { MarketDataProvider } from './market-data-provider'

export default function TokensSection() {
  const tokens = [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      slug: 'btc',
      marketCap: '$2.1T',
      change: '+12.5%',
      color: 'from-orange-400 to-orange-600',
      description: 'The original cryptocurrency and digital gold. Bitcoin is a decentralized peer-to-peer electronic cash system.',
      tokenomics: '21 million maximum supply | Proof of Work consensus | ~10 minute block time',
      logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      slug: 'eth',
      marketCap: '$480B',
      change: '+8.3%',
      color: 'from-purple-400 to-purple-600',
      description: 'The leading smart contract platform enabling decentralized applications (dApps) and NFTs.',
      tokenomics: 'Unlimited supply | Proof of Stake consensus | 12 second block time',
      logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
    },
    {
      id: 3,
      name: 'BNB',
      symbol: 'BNB',
      slug: 'bnb',
      marketCap: '$89B',
      change: '+15.2%',
      color: 'from-yellow-400 to-yellow-600',
      description: 'Native token of Binance Chain and Smart Chain, used for fees and governance.',
      tokenomics: 'Token burning mechanism | BEP-2 and BEP-20 standards | Energy efficient',
      logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg',
    },
    {
      id: 4,
      name: 'Solana',
      symbol: 'SOL',
      slug: 'sol',
      marketCap: '$78B',
      change: '+18.7%',
      color: 'from-purple-500 to-pink-500',
      description: 'High-performance blockchain designed for fast, scalable, and decentralized applications.',
      tokenomics: '575 million supply | Proof of Stake consensus | Sub-second finality',
      logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
    },
    {
      id: 5,
      name: 'Cardano',
      symbol: 'ADA',
      slug: 'ada',
      marketCap: '$56B',
      change: '+6.4%',
      color: 'from-blue-400 to-blue-600',
      description: 'Research-driven blockchain platform emphasizing sustainability and scalability.',
      tokenomics: '45 billion supply | Ouroboros Proof of Stake | 20 second block time',
      logo: 'https://cryptologos.cc/logos/cardano-ada-logo.svg',
    },
    {
      id: 6,
      name: 'Polygon',
      symbol: 'MATIC',
      slug: 'matic',
      marketCap: '$12B',
      change: '+22.1%',
      color: 'from-indigo-400 to-indigo-600',
      description: 'Scaling solution for Ethereum providing faster and cheaper transactions.',
      tokenomics: 'Dynamic supply | Delegated Proof of Stake | 2 second block time',
      logo: 'https://cryptologos.cc/logos/polygon-matic-logo.svg',
    },
  ]

  return (
    <section id="tokens" className="py-20 sm:py-28 bg-secondary/30 dark:bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Top Assets
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
            Major Cryptocurrencies by Market Cap
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
            Explore the leading cryptocurrencies, their purposes, and tokenomics
          </p>
        </div>

        {/* Tokens grid */}
        <MarketDataProvider>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokens.map((token) => (
              <TokenCard
                key={token.id}
                slug={token.slug}
                name={token.name}
                symbol={token.symbol}
                description={token.description}
                tokenomics={token.tokenomics}
                logo={token.logo}
                fallbackMarketCap={token.marketCap}
                fallbackChange={token.change}
              />
            ))}
          </div>
        </MarketDataProvider>

        {/* Data Source Attribution */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Live market data powered by{' '}
          <a 
            href="https://www.coingecko.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            CoinGecko API
          </a>
        </p>

        {/* Additional info box */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800/50">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-bold text-foreground mb-2">Market Dynamics</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cryptocurrency markets operate 24/7 with real-time price discovery. Market cap = current price × circulating supply.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground mb-2">Consensus Mechanisms</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Proof of Work and Proof of Stake are the primary consensus methods that secure blockchains and validate transactions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground mb-2">Token Use Cases</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tokens serve as medium of exchange, store of value, governance rights, or utility within decentralized ecosystems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
