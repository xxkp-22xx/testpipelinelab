"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SubscriptionCard } from "@/components/subscription-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SubscriptionModal } from "@/components/subscription-modal"

// Sample data
const subscriptions = [
  {
    id: "1",
    name: "Netflix",
    plan: "Standard",
    price: "15.99",
    currency: "USDT",
    nextBilling: "2025-04-15",
    status: "active",
    logo: "/placeholder.svg?height=40&width=40&text=N",
  },
  {
    id: "2",
    name: "Spotify",
    plan: "Premium",
    price: "9.99",
    currency: "DAI",
    nextBilling: "2025-04-10",
    status: "active",
    logo: "/placeholder.svg?height=40&width=40&text=S",
  },
  {
    id: "3",
    name: "Amazon Prime",
    plan: "Annual",
    price: "119",
    currency: "ETH",
    nextBilling: "2025-05-22",
    status: "active",
    logo: "/placeholder.svg?height=40&width=40&text=A",
  },
  {
    id: "4",
    name: "Disney+",
    plan: "Basic",
    price: "7.99",
    currency: "USDT",
    nextBilling: "2025-03-30",
    status: "expired",
    logo: "/placeholder.svg?height=40&width=40&text=D",
  },
  {
    id: "5",
    name: "YouTube Premium",
    plan: "Family",
    price: "17.99",
    currency: "DAI",
    nextBilling: "2025-04-05",
    status: "active",
    logo: "/placeholder.svg?height=40&width=40&text=Y",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [sortBy, setSortBy] = useState("date")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredSubscriptions = subscriptions.filter((sub) => {
    if (activeTab === "active") return sub.status === "active"
    if (activeTab === "expired") return sub.status === "expired"
    return true
  })

  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    if (sortBy === "date") return new Date(a.nextBilling).getTime() - new Date(b.nextBilling).getTime()
    if (sortBy === "name") return a.name.localeCompare(b.name)
    return 0
  })

  return (
    <DashboardShell>
      <DashboardHeader />

      <div className="container px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Subscription Dashboard</h1>
            <p className="text-muted-foreground">Manage all your subscriptions in one place</p>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => setIsModalOpen(true)}>Add Subscription</Button>
          </div>
        </div>

        <div className="space-y-8">
          <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="expired">Expired</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search subscriptions..." className="w-full md:w-[200px]" />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Sort by Date</SelectItem>
                    <SelectItem value="name">Sort by Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="active" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedSubscriptions.map((subscription) => (
                  <SubscriptionCard key={subscription.id} subscription={subscription} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="expired" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedSubscriptions.map((subscription) => (
                  <SubscriptionCard key={subscription.id} subscription={subscription} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedSubscriptions.map((subscription) => (
                  <SubscriptionCard key={subscription.id} subscription={subscription} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <SubscriptionModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </DashboardShell>
  )
}

