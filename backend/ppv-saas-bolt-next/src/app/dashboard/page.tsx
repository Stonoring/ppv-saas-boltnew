import { Metadata } from "next"
import { Suspense } from "react"

import CompanySection from "@/components/dashboard/CompanySection"
import Timeline from "@/components/dashboard/Timeline"
import RegulatoryFramework from "@/components/dashboard/RegulatoryFramework"
import Benefits from "@/components/dashboard/Benefits"
import Documentation from "@/components/dashboard/Documentation"
import Support from "@/components/dashboard/Support"
import Chatbot from "@/components/chat/Chatbot"
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton"

export const metadata: Metadata = {
  title: "PPV SaaS - Tableau de bord",
  description: "Tableau de bord de l'application PPV SaaS",
}

export default function DashboardPage() {
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

        <Chatbot />
      </div>
    </Suspense>
  )
}
