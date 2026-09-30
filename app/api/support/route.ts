import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const crmUrl = process.env.CRM_API_URL || "https://admin.empire-premium.de/api/v1"
  const crmKey = process.env.CRM_API_KEY || ""

  try {
    const body = await req.json()

    const forwardedFor = req.headers.get("x-forwarded-for")
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : req.headers.get("x-real-ip") || ""

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-api-key": crmKey,
    }
    if (clientIp) {
      headers["x-forwarded-for"] = clientIp
    }

    const response = await fetch(`${crmUrl}/support`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Server API /api/support error:", error)
    return NextResponse.json(
      { status: "error", message: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}
