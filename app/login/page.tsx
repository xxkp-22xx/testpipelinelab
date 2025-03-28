"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [email, setEmail] = useState("")
  const router = useRouter()

  const handleConnectWallet = async () => {
    setIsConnecting(true)
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false)
      router.push("/dashboard")
    }, 1500)
  }

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate magic link
    alert(`Magic link sent to ${email}`)
  }

  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="SubsFlix Logo"
            width={40}
            height={40}
            className="mr-2 rounded-md"
          />
          SubsFlix
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "SubsFlix has completely transformed how I manage my subscriptions. The transparency of blockchain
              payments gives me peace of mind."
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your account to manage your subscriptions</p>
          </div>
          <Tabs defaultValue="wallet" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
            </TabsList>
            <TabsContent value="wallet">
              <Card>
                <CardHeader>
                  <CardTitle>Connect Wallet</CardTitle>
                  <CardDescription>Connect your Web3 wallet to access your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-between" onClick={handleConnectWallet} disabled={isConnecting}>
                    <div className="flex items-center">
                      <Image
                        src="/placeholder.svg?height=24&width=24&text=M"
                        alt="MetaMask"
                        width={24}
                        height={24}
                        className="mr-2 rounded-full"
                      />
                      MetaMask
                    </div>
                    {isConnecting ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-primary"></div>
                    ) : (
                      <ArrowRight className="h-5 w-5" />
                    )}
                  </Button>
                  <Button className="w-full justify-between" variant="outline">
                    <div className="flex items-center">
                      <Image
                        src="/placeholder.svg?height=24&width=24&text=W"
                        alt="WalletConnect"
                        width={24}
                        height={24}
                        className="mr-2 rounded-full"
                      />
                      WalletConnect
                    </div>
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                  <Button className="w-full justify-between" variant="outline">
                    <div className="flex items-center">
                      <Image
                        src="/placeholder.svg?height=24&width=24&text=C"
                        alt="Coinbase Wallet"
                        width={24}
                        height={24}
                        className="mr-2 rounded-full"
                      />
                      Coinbase Wallet
                    </div>
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="email">
              <Card>
                <CardHeader>
                  <CardTitle>Email Login</CardTitle>
                  <CardDescription>We'll send you a magic link to your email</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleEmailLogin}>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full mt-4">
                      Send Magic Link
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

