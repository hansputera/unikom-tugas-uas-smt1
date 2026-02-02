'use client'

import { useState } from 'react'
import { Database, Link2, Shield, AlertTriangle, CheckCircle, Users, Server, Edit3, Trash2 } from 'lucide-react'

interface Record {
  id: number
  from: string
  to: string
  amount: number
  timestamp: number
}

interface BlockchainRecord extends Record {
  hash: string
  previousHash: string
  verified: boolean
}

function generateHash(data: string): string {
  let hash = 5381
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) + hash) + data.charCodeAt(i)
  }
  return Math.abs(hash).toString(16).padStart(8, '0').toUpperCase()
}

// Fixed timestamps to avoid hydration mismatch
const FIXED_TIMESTAMPS = {
  record1: 1700000000000,
  record2: 1700000005000,
  record3: 1700000010000,
}

export function ComparisonTool() {
  // Traditional Database State
  const [traditionalRecords, setTraditionalRecords] = useState<Record[]>([
    { id: 1, from: 'Alice', to: 'Bob', amount: 100, timestamp: FIXED_TIMESTAMPS.record1 },
    { id: 2, from: 'Bob', to: 'Charlie', amount: 50, timestamp: FIXED_TIMESTAMPS.record2 },
    { id: 3, from: 'Charlie', to: 'Diana', amount: 25, timestamp: FIXED_TIMESTAMPS.record3 },
  ])
  const [traditionalTampered, setTraditionalTampered] = useState(false)
  const [traditionalDeleted, setTraditionalDeleted] = useState(false)

  // Blockchain State
  const [blockchainRecords, setBlockchainRecords] = useState<BlockchainRecord[]>(() => {
    const records: BlockchainRecord[] = []
    let previousHash = '00000000'
    
    const baseRecords = [
      { id: 1, from: 'Alice', to: 'Bob', amount: 100, timestamp: FIXED_TIMESTAMPS.record1 },
      { id: 2, from: 'Bob', to: 'Charlie', amount: 50, timestamp: FIXED_TIMESTAMPS.record2 },
      { id: 3, from: 'Charlie', to: 'Diana', amount: 25, timestamp: FIXED_TIMESTAMPS.record3 },
    ]

    for (const record of baseRecords) {
      const dataString = `${record.id}${record.from}${record.to}${record.amount}${previousHash}`
      const hash = generateHash(dataString)
      records.push({
        ...record,
        hash,
        previousHash,
        verified: true,
      })
      previousHash = hash
    }
    return records
  })
  const [blockchainTamperAttempted, setBlockchainTamperAttempted] = useState(false)
  const [blockchainDeleteAttempted, setBlockchainDeleteAttempted] = useState(false)

  // Traditional Database Actions
  const tamperTraditional = () => {
    const newRecords = [...traditionalRecords]
    if (newRecords[0]) {
      newRecords[0] = { ...newRecords[0], amount: 1000000, to: 'Hacker' }
    }
    setTraditionalRecords(newRecords)
    setTraditionalTampered(true)
  }

  const deleteTraditional = () => {
    setTraditionalRecords(traditionalRecords.filter(r => r.id !== 2))
    setTraditionalDeleted(true)
  }

  // Blockchain Actions
  const attemptTamperBlockchain = () => {
    setBlockchainTamperAttempted(true)
    // Mark all records as invalid since chain is broken
    setBlockchainRecords(blockchainRecords.map((r, i) => ({
      ...r,
      verified: i === 0 ? false : false,
    })))
  }

  const attemptDeleteBlockchain = () => {
    setBlockchainDeleteAttempted(true)
  }

  const resetAll = () => {
    setTraditionalRecords([
      { id: 1, from: 'Alice', to: 'Bob', amount: 100, timestamp: FIXED_TIMESTAMPS.record1 },
      { id: 2, from: 'Bob', to: 'Charlie', amount: 50, timestamp: FIXED_TIMESTAMPS.record2 },
      { id: 3, from: 'Charlie', to: 'Diana', amount: 25, timestamp: FIXED_TIMESTAMPS.record3 },
    ])
    setTraditionalTampered(false)
    setTraditionalDeleted(false)

    let previousHash = '00000000'
    const newBlockchainRecords: BlockchainRecord[] = []
    const baseRecords = [
      { id: 1, from: 'Alice', to: 'Bob', amount: 100, timestamp: FIXED_TIMESTAMPS.record1 },
      { id: 2, from: 'Bob', to: 'Charlie', amount: 50, timestamp: FIXED_TIMESTAMPS.record2 },
      { id: 3, from: 'Charlie', to: 'Diana', amount: 25, timestamp: FIXED_TIMESTAMPS.record3 },
    ]

    for (const record of baseRecords) {
      const dataString = `${record.id}${record.from}${record.to}${record.amount}${previousHash}`
      const hash = generateHash(dataString)
      newBlockchainRecords.push({
        ...record,
        hash,
        previousHash,
        verified: true,
      })
      previousHash = hash
    }
    setBlockchainRecords(newBlockchainRecords)
    setBlockchainTamperAttempted(false)
    setBlockchainDeleteAttempted(false)
  }

  return (
    <div className="space-y-8">
      {/* Reset Button */}
      <div className="flex justify-end">
        <button
          onClick={resetAll}
          className="px-4 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors text-sm"
        >
          Reset Both Systems
        </button>
      </div>

      {/* Comparison Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Traditional Database */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <Database size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Traditional Database</h3>
              <p className="text-sm text-muted-foreground">Centralized, Controlled by Admin</p>
            </div>
          </div>

          {/* Properties */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
              <Server size={16} className="text-orange-600 mb-1" />
              <p className="text-xs text-orange-700 dark:text-orange-300">Single Server</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
              <Users size={16} className="text-orange-600 mb-1" />
              <p className="text-xs text-orange-700 dark:text-orange-300">Admin Control</p>
            </div>
          </div>

          {/* Records */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="bg-orange-500/10 px-4 py-2 border-b border-border">
              <p className="text-sm font-medium text-foreground">Transaction Records</p>
            </div>
            <div className="divide-y divide-border">
              {traditionalRecords.map((record) => (
                <div key={record.id} className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{record.from}</span>
                      {' → '}
                      <span className={`font-medium ${record.id === 1 && traditionalTampered ? 'text-red-500' : ''}`}>
                        {record.to}
                      </span>
                    </p>
                    <p className={`text-lg font-bold ${record.id === 1 && traditionalTampered ? 'text-red-500' : 'text-foreground'}`}>
                      ${record.amount}
                    </p>
                  </div>
                  {record.id === 1 && traditionalTampered && (
                    <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 px-2 py-1 rounded">
                      Modified!
                    </span>
                  )}
                </div>
              ))}
              {traditionalDeleted && (
                <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 text-center">
                  <p className="text-sm text-red-600">Record #2 was deleted!</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={tamperTraditional}
              disabled={traditionalTampered}
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Edit3 size={16} />
              Tamper Record
            </button>
            <button
              onClick={deleteTraditional}
              disabled={traditionalDeleted}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Trash2 size={16} />
              Delete Record
            </button>
          </div>

          {/* Result */}
          {(traditionalTampered || traditionalDeleted) && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-500 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-red-700 dark:text-red-300">Attack Successful! ❌</p>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    The admin (or a hacker with access) modified the database. 
                    There&apos;s no way to detect this change or prove what the original data was.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Blockchain */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <Link2 size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Blockchain</h3>
              <p className="text-sm text-muted-foreground">Decentralized, Immutable</p>
            </div>
          </div>

          {/* Properties */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <Users size={16} className="text-green-600 mb-1" />
              <p className="text-xs text-green-700 dark:text-green-300">Distributed Network</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <Shield size={16} className="text-green-600 mb-1" />
              <p className="text-xs text-green-700 dark:text-green-300">Cryptographic Security</p>
            </div>
          </div>

          {/* Records */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="bg-green-500/10 px-4 py-2 border-b border-border">
              <p className="text-sm font-medium text-foreground">Transaction Blocks</p>
            </div>
            <div className="divide-y divide-border">
              {blockchainRecords.map((record) => (
                <div key={record.id} className={`px-4 py-3 ${!record.verified ? 'bg-red-50 dark:bg-red-900/20' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{record.from}</span>
                        {' → '}
                        <span className="font-medium">{record.to}</span>
                      </p>
                      <p className="text-lg font-bold text-foreground">${record.amount}</p>
                    </div>
                    {record.verified ? (
                      <span className="flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 px-2 py-1 rounded">
                        <CheckCircle size={12} />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-600 px-2 py-1 rounded">
                        <AlertTriangle size={12} />
                        Invalid
                      </span>
                    )}
                  </div>
                  <code className="text-xs text-muted-foreground font-mono">
                    Hash: {record.hash}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={attemptTamperBlockchain}
              disabled={blockchainTamperAttempted}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Edit3 size={16} />
              Try to Tamper
            </button>
            <button
              onClick={attemptDeleteBlockchain}
              disabled={blockchainDeleteAttempted}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Trash2 size={16} />
              Try to Delete
            </button>
          </div>

          {/* Result */}
          {blockchainTamperAttempted && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="text-green-500 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-green-700 dark:text-green-300">Attack Detected & Blocked! ✅</p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    The tampered block&apos;s hash doesn&apos;t match! All nodes in the network can detect this 
                    and reject the fraudulent change. The chain is marked as invalid.
                  </p>
                </div>
              </div>
            </div>
          )}

          {blockchainDeleteAttempted && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="text-green-500 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-green-700 dark:text-green-300">Deletion Impossible! ✅</p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    You cannot delete a block! Every block references the previous block&apos;s hash. 
                    Removing one would break the entire chain, which all network nodes would reject.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Comparison Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Feature</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-orange-600">Traditional DB</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-green-600">Blockchain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-6 py-4 text-sm text-foreground">Data Storage</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Centralized server</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Distributed network</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-foreground">Can be modified?</td>
                <td className="px-6 py-4 text-sm text-red-600">Yes, by admin</td>
                <td className="px-6 py-4 text-sm text-green-600">No, immutable</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-foreground">Tamper detection</td>
                <td className="px-6 py-4 text-sm text-red-600">None built-in</td>
                <td className="px-6 py-4 text-sm text-green-600">Cryptographic proof</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-foreground">Single point of failure</td>
                <td className="px-6 py-4 text-sm text-red-600">Yes</td>
                <td className="px-6 py-4 text-sm text-green-600">No</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-foreground">Trust model</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Trust the admin</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Trust the math</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
