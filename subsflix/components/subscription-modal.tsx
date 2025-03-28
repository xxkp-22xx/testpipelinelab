"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, CreditCard, Loader2 } from "lucide-react"
import Image from "next/image"

interface SubscriptionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SubscriptionModal({ open, onOpenChange }: SubscriptionModalProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedService, setSelectedService] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("crypto")

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Process subscription
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        onOpenChange(false)
        // Reset form
        setStep(1)
        setSelectedService("")
        setSelectedPlan("")
        setPaymentMethod("crypto")
      }, 2000)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Subscribe to a Service</DialogTitle>
          <DialogDescription>Choose a service and plan to subscribe using blockchain payments.</DialogDescription>
        </DialogHeader>

        <div className="flex justify-between mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step > i ? <Check className="h-4 w-4" /> : i}
              </div>
              <span className="text-xs mt-1">{i === 1 ? "Service" : i === 2 ? "Plan" : "Payment"}</span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="service">Select a Service</Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="netflix">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/placeholder.svg?height=20&width=20&text=N"
                        alt="Netflix"
                        width={20}
                        height={20}
                        className="rounded-sm"
                      />
                      Netflix
                    </div>
                  </SelectItem>
                  <SelectItem value="spotify">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/placeholder.svg?height=20&width=20&text=S"
                        alt="Spotify"
                        width={20}
                        height={20}
                        className="rounded-sm"
                      />
                      Spotify
                    </div>
                  </SelectItem>
                  <SelectItem value="amazon">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/placeholder.svg?height=20&width=20&text=A"
                        alt="Amazon Prime"
                        width={20}
                        height={20}
                        className="rounded-sm"
                      />
                      Amazon Prime
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Select a Plan</Label>
              <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="basic" id="basic" />
                    <Label htmlFor="basic" className="flex-1 cursor-pointer">
                      <div className="font-medium">Basic</div>
                      <div className="text-sm text-muted-foreground">$9.99/month</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="font-medium">Standard</div>
                      <div className="text-sm text-muted-foreground">$15.99/month</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="premium" id="premium" />
                    <Label htmlFor="premium" className="flex-1 cursor-pointer">
                      <div className="font-medium">Premium</div>
                      <div className="text-sm text-muted-foreground">$19.99/month</div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 py-2">
            <Tabs defaultValue="crypto" value={paymentMethod} onValueChange={setPaymentMethod}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="crypto">Crypto</TabsTrigger>
                <TabsTrigger value="fiat">Credit Card</TabsTrigger>
              </TabsList>
              <TabsContent value="crypto" className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Cryptocurrency</Label>
                  <Select defaultValue="eth">
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                      <SelectItem value="usdt">Tether (USDT)</SelectItem>
                      <SelectItem value="dai">Dai (DAI)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border p-4">
                  <div className="text-sm font-medium mb-2">Transaction Details</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service:</span>
                      <span>{selectedService || "Netflix"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Plan:</span>
                      <span>{selectedPlan || "Standard"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span>15.99 USDT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gas Fee (est.):</span>
                      <span>~0.002 ETH</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="fiat" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <div className="flex">
                    <Input id="card-number" placeholder="4242 4242 4242 4242" />
                    <CreditCard className="ml-2 h-4 w-4 opacity-50 self-center" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button onClick={handleContinue} disabled={loading} className="ml-auto">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {step < 3 ? "Continue" : "Confirm Subscription"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

