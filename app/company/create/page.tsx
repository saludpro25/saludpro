"use client"

import { Suspense } from "react"
import { CompanyRegistrationFlow } from "@/components/company/company-registration-flow"
import { Loader2 } from "lucide-react"

export const dynamic = 'force-dynamic'

export default function CreateCompanyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      }>
        <CompanyRegistrationFlow />
      </Suspense>
    </div>
  )
}
