import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CreditCard, Info } from "lucide-react"

interface NotificationCenterProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationCenter({ open, onOpenChange }: NotificationCenterProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="all" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4 space-y-4">
            <div className="flex gap-4 items-start border-l-4 border-primary pl-4 py-2">
              <Bell className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Your Netflix subscription is expiring soon!</p>
                <p className="text-xs text-muted-foreground">Renew before March 15 to avoid service interruption.</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-4 items-start border-l-4 border-destructive pl-4 py-2">
              <CreditCard className="h-5 w-5 text-destructive mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Auto-renewal failed, please top up your wallet.</p>
                <p className="text-xs text-muted-foreground">
                  Your Spotify subscription payment failed due to insufficient funds.
                </p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex gap-4 items-start border-l-4 border-muted pl-4 py-2">
              <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Welcome to SubsFlix!</p>
                <p className="text-xs text-muted-foreground">Get started by adding your first subscription.</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="payments" className="mt-4 space-y-4">
            <div className="flex gap-4 items-start border-l-4 border-destructive pl-4 py-2">
              <CreditCard className="h-5 w-5 text-destructive mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Auto-renewal failed, please top up your wallet.</p>
                <p className="text-xs text-muted-foreground">
                  Your Spotify subscription payment failed due to insufficient funds.
                </p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="system" className="mt-4 space-y-4">
            <div className="flex gap-4 items-start border-l-4 border-primary pl-4 py-2">
              <Bell className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Your Netflix subscription is expiring soon!</p>
                <p className="text-xs text-muted-foreground">Renew before March 15 to avoid service interruption.</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-4 items-start border-l-4 border-muted pl-4 py-2">
              <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Welcome to SubsFlix!</p>
                <p className="text-xs text-muted-foreground">Get started by adding your first subscription.</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-6">
          <Button variant="outline" className="w-full">
            Mark all as read
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

