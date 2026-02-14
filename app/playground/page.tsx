/**
 * NIM: 10125905
 * Nama: HANIF DWY PUTRA S
 *
 * NIM: 10125903
 * Nama: ADITYA SYAHESTIANO
 */

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { BlockchainSimulator } from './blockchain-simulator'
import { ComparisonTool } from './comparison-tool'
import { HashDemo } from './hash-demo'

export default function PlaygroundPage() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Ⓑ</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">LearnBlock</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-accent hover:underline font-medium">
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Back Home</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full border border-purple-200 dark:border-purple-800">
              <span className="text-2xl">🎮</span>
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Interactive Learning
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
              Blockchain Playground
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Learn how blockchain works through hands-on simulations. 
              Perfect for complete beginners!
            </p>
          </div>

          {/* Section 1: What is Hashing? */}
          <section className="mb-20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                🔐 Step 1: Understanding Hashing
              </h2>
              <p className="text-muted-foreground max-w-3xl">
                A hash is like a digital fingerprint. Any data you input creates a unique fixed-length code. 
                Even a tiny change creates a completely different hash!
              </p>
            </div>
            <HashDemo />
          </section>

          {/* Section 2: Build Your Own Blockchain */}
          <section className="mb-20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                ⛓️ Step 2: Build Your Own Blockchain
              </h2>
              <p className="text-muted-foreground max-w-3xl">
                Create blocks, add data, and see how they link together. 
                Try tampering with a block to see why blockchain is secure!
              </p>
            </div>
            <BlockchainSimulator />
          </section>

          {/* Section 3: Comparison Tool */}
          <section className="mb-20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                ⚖️ Step 3: Blockchain vs Traditional Database
              </h2>
              <p className="text-muted-foreground max-w-3xl">
                See the difference between how traditional systems and blockchain handle data. 
                Understand why blockchain is revolutionary for trust and security.
              </p>
            </div>
            <ComparisonTool />
          </section>

          {/* Key Takeaways */}
          <section className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800/50">
            <h2 className="text-2xl font-bold text-foreground mb-6">📚 Key Takeaways</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="text-3xl">🔗</div>
                <h3 className="font-semibold text-foreground">Blocks are Linked</h3>
                <p className="text-sm text-muted-foreground">
                  Each block contains the hash of the previous block, creating an unbreakable chain.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">🛡️</div>
                <h3 className="font-semibold text-foreground">Tamper-Proof</h3>
                <p className="text-sm text-muted-foreground">
                  Changing any data breaks the chain, making fraud immediately detectable.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">🌐</div>
                <h3 className="font-semibold text-foreground">Decentralized</h3>
                <p className="text-sm text-muted-foreground">
                  No single point of failure. The network validates and stores the data.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">✅</div>
                <h3 className="font-semibold text-foreground">Trustless</h3>
                <p className="text-sm text-muted-foreground">
                  You don't need to trust anyone. The math and network verify everything.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
