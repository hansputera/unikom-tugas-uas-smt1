/**
 * NIM: 10125905
 * Nama: HANIF DWY PUTRA S
 *
 * NIM: 10125903
 * Nama: ADITYA SYAHESTIANO
 */

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-primary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-foreground font-bold text-lg">Ⓑ</span>
              </div>
              <span className="font-bold text-lg">LearnBlock</span>
            </div>
            <p className="text-sm text-primary-foreground/70">
              Your comprehensive guide to understanding blockchain technology and cryptocurrency.
            </p>
          </div>

          {/* Learning */}
          <div>
            <h4 className="font-semibold mb-4">Learning</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Blockchain Basics', href: '/article/blockchain-basics' },
                { label: 'Decentralization', href: '/article/decentralization-explained' },
                { label: 'Consensus', href: '/article/what-is-consensus' },
                { label: 'Tokenomics', href: '/article/what-is-tokenomics' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'All Articles', href: '/articles' },
                { label: 'Tokens', href: '/#tokens' },
                { label: 'Playground', href: '/playground' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="grid md:grid-cols-2 gap-4 text-sm text-primary-foreground/70">
            <div>
              © {currentYear} LearnBlock. All rights reserved.
            </div>
            <div className="md:text-right">
              Made with <span className="text-green-400">❤</span> for blockchain education purposes.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
