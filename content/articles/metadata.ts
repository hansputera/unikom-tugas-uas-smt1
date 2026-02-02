export interface ArticleMetadata {
  title: string;
  date: string;
  readTime: string;
  category: string;
  icon: string;
}

export const articlesMetadata: Record<string, ArticleMetadata> = {
  'blockchain-basics': {
    title: "Blockchain Basics: A Beginner's Guide",
    date: 'January 25, 2025',
    readTime: '6 min read',
    category: 'Fundamentals',
    icon: '🔗',
  },
  'decentralization-explained': {
    title: 'Decentralization: Power to Everyone',
    date: 'January 24, 2025',
    readTime: '6 min read',
    category: 'Fundamentals',
    icon: '🌐',
  },
  'blockchain-vs-traditional': {
    title: 'Blockchain vs Traditional: When to Use What',
    date: 'January 23, 2025',
    readTime: '7 min read',
    category: 'Fundamentals',
    icon: '⚖️',
  },
  'what-is-consensus': {
    title: 'What is Consensus? How Blockchains Agree',
    date: 'January 20, 2025',
    readTime: '5 min read',
    category: 'Basics',
    icon: '🤝',
  },
  'what-is-tokenomics': {
    title: 'Tokenomics: Understanding Crypto Economics',
    date: 'January 18, 2025',
    readTime: '6 min read',
    category: 'Economics',
    icon: '📊',
  },
  'proof-of-work': {
    title: 'Proof of Work: Mining Explained Simply',
    date: 'January 16, 2025',
    readTime: '7 min read',
    category: 'Consensus',
    icon: '⛏️',
  },
  'proof-of-stake': {
    title: 'Proof of Stake: Earn While You Hold',
    date: 'January 14, 2025',
    readTime: '7 min read',
    category: 'Consensus',
    icon: '🏦',
  },
}

export function getArticleMetadata(slug: string): ArticleMetadata | undefined {
  return articlesMetadata[slug]
}

export function getAllArticleSlugs(): string[] {
  return Object.keys(articlesMetadata)
}
