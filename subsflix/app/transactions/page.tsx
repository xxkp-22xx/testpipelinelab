"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, Search } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DatePickerWithRange } from "@/components/date-range-picker"

// Sample transaction data
const transactions = [
  {
    id: "tx_1",
    service: "Netflix",
    amount: "15.99",
    currency: "USDT",
    date: "2025-03-15",
    status: "success",
    txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
  },
  {
    id: "tx_2",
    service: "Spotify",
    amount: "9.99",
    currency: "DAI",
    date: "2025-03-10",
    status: "success",
    txHash: "0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
  },
  {
    id: "tx_3",
    service: "Amazon Prime",
    amount: "119",
    currency: "ETH",
    date: "2025-02-22",
    status: "success",
    txHash: "0x2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t",
  },
  {
    id: "tx_4",
    service: "Disney+",
    amount: "7.99",
    currency: "USDT",
    date: "2025-03-01",
    status: "failed",
    txHash: "0x3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t",
  },
  {
    id: "tx_5",
    service: "YouTube Premium",
    amount: "17.99",
    currency: "DAI",
    date: "2025-03-05",
    status: "pending",
    txHash: "0x4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t",
  },
]

export default function TransactionsPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [currencyFilter, setCurrencyFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = transactions.filter((tx) => {
    // Apply status filter
    if (statusFilter !== "all" && tx.status !== statusFilter) return false

    // Apply currency filter
    if (currencyFilter !== "all" && tx.currency !== currencyFilter) return false

    // Apply search query
    if (searchQuery && !tx.service.toLowerCase().includes(searchQuery.toLowerCase())) return false

    return true
  })

  return (
    <DashboardShell>
      <DashboardHeader />

      <div className="container px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transaction History</h1>
            <p className="text-muted-foreground">View and manage your subscription payments</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              A list of all your subscription transactions with their status and details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by service..."
                  className="w-full md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-1 items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Currencies</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="DAI">DAI</SelectItem>
                  </SelectContent>
                </Select>

                <DatePickerWithRange className="w-full md:w-auto" />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Transaction Hash</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-medium">{tx.service}</TableCell>
                      <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {tx.amount} {tx.currency}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            tx.status === "success" ? "default" : tx.status === "pending" ? "outline" : "destructive"
                          }
                        >
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {tx.txHash.substring(0, 10)}...{tx.txHash.substring(tx.txHash.length - 4)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                          <a href={`https://etherscan.io/tx/${tx.txHash}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View on Etherscan</span>
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

