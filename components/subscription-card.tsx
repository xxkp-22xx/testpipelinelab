import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CreditCard, MoreVertical, RefreshCw, XCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

interface SubscriptionCardProps {
  subscription: {
    id: string
    name: string
    plan: string
    price: string
    currency: string
    nextBilling: string
    status: string
    logo: string
  }
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const isActive = subscription.status === "active"
  const nextBillingDate = new Date(subscription.nextBilling).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Card className={isActive ? "" : "opacity-70"}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Image
              src={subscription.logo || "/placeholder.svg"}
              alt={subscription.name}
              width={40}
              height={40}
              className="rounded-md"
            />
            <div>
              <CardTitle className="text-xl">{subscription.name}</CardTitle>
              <CardDescription>{subscription.plan} Plan</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Change Plan</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Cancel Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold">
            {subscription.price} <span className="text-sm font-normal">{subscription.currency}</span>
          </div>
          <Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Active" : "Expired"}</Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            {isActive ? <span>Next billing on {nextBillingDate}</span> : <span>Expired on {nextBillingDate}</span>}
          </div>
          <div className="flex items-center text-muted-foreground">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Paid with {subscription.currency}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        {isActive ? (
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="w-full" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Renew
            </Button>
            <Button variant="outline" className="w-full text-destructive" size="sm">
              <XCircle className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        ) : (
          <Button className="w-full" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reactivate
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

