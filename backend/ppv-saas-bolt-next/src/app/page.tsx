"use client"
import { Metadata } from "next"
import { Suspense, useState } from "react"

import CompanySection from "@/components/dashboard/CompanySection"
import Timeline from "@/components/dashboard/Timeline"
import RegulatoryFramework from "@/components/dashboard/RegulatoryFramework"
import Benefits from "@/components/dashboard/Benefits"
import Documentation from "@/components/dashboard/Documentation"
import Support from "@/components/dashboard/Support"
import ChatOverlay from "@/components/chat/ChatOverlay"
import { ChatDialog } from "@/components/chat/ChatDialog"
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton"



export default function Home() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <div className="space-y-6">
        <CompanySection />
        <Timeline />
        
        <div className="grid gap-6 md:grid-cols-2">
          <RegulatoryFramework />
          <Benefits />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Documentation />
          <Support />
        </div>

        <ChatDialog open={chatOpen} onOpenChange={setChatOpen} />
        <ChatOverlay onClick={() => setChatOpen(true)} />
      </div>
    </Suspense>
  )
}
