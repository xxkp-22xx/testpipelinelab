"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { BarChart, LineChart, PieChart } from "@/components/charts"

// Sample data
const users = [
  { id: "1", name: "John Doe", email: "john@example.com", subscriptions: 3, status: "active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", subscriptions: 2, status: "active" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", subscriptions: 1, status: "inactive" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", subscriptions: 4, status: "active" },
  { id: "5", name: "Charlie Davis", email: "charlie@example.com", subscriptions: 0, status: "inactive" },
]

const plans = [
  { id: "1", service: "Netflix", plan: "Basic", price: "9.99", currency: "USDT", subscribers: 120 },
  { id: "2", service: "Netflix", plan: "Standard", price: "15.99", currency: "USDT", subscribers: 250 },
  { id: "3", service: "Netflix", plan: "Premium", price: "19.99", currency: "USDT", subscribers: 85 },
  { id: "4", service: "Spotify", plan: "Individual", price: "9.99", currency: "DAI", subscribers: 180 },
  { id: "5", service: "Spotify", plan: "Family", price: "14.99", currency: "DAI", subscribers: 95 },
]

export default function AdminPage() {
  const [newPlan, setNewPlan] = useState({
    service: "",
    plan: "",
    price: "",
    currency: "USDT",
  })

  const handleAddPlan = (e: React.FormEvent) => {
    e.preventDefault()
    // Add plan logic would go here
    alert("Plan added successfully!")
    setNewPlan({
      service: "",
      plan: "",
      price: "",
      currency: "USDT",
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader />

      <div className="container px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage subscriptions, users, and platform settings</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Revenue</CardTitle>
              <CardDescription>Monthly subscription revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$12,546.78</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              <div className="h-[80px] mt-4">
                <BarChart />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Active Users</CardTitle>
              <CardDescription>Users with active subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+3.2% from last month</p>
              <div className="h-[80px] mt-4">
                <LineChart />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Subscription Distribution</CardTitle>
              <CardDescription>By service type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[120px]">
                <PieChart />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="plans" className="space-y-4">
          <TabsList>
            <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="disputes">Disputes & Refunds</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Subscription Plan</CardTitle>
                <CardDescription>Create a new subscription plan for your service</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddPlan} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="service">Service</Label>
                    <Input
                      id="service"
                      placeholder="e.g. Netflix"
                      value={newPlan.service}
                      onChange={(e) => setNewPlan({ ...newPlan, service: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="plan">Plan Name</Label>
                    <Input
                      id="plan"
                      placeholder="e.g. Premium"
                      value={newPlan.plan}
                      onChange={(e) => setNewPlan({ ...newPlan, plan: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="e.g. 9.99"
                      value={newPlan.price}
                      onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={newPlan.currency}
                      onValueChange={(value) => setNewPlan({ ...newPlan, currency: value })}
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ETH">ETH</SelectItem>
                        <SelectItem value="USDT">USDT</SelectItem>
                        <SelectItem value="DAI">DAI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2 lg:col-span-4 flex justify-end">
                    <Button type="submit">Add Plan</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Plans</CardTitle>
                <CardDescription>Manage your existing subscription plans</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Currency</TableHead>
                      <TableHead>Subscribers</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">{plan.service}</TableCell>
                        <TableCell>{plan.plan}</TableCell>
                        <TableCell>{plan.price}</TableCell>
                        <TableCell>{plan.currency}</TableCell>
                        <TableCell>{plan.subscribers}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Input placeholder="Search users..." className="max-w-sm" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Subscriptions</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.subscriptions}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disputes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Disputes & Refunds</CardTitle>
                <CardDescription>Manage customer disputes and process refunds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40 border rounded-md">
                  <p className="text-muted-foreground">No active disputes at this time</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

