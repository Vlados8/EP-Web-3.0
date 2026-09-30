import { NextResponse } from "next/server"

export async function GET() {
  const crmUrl = process.env.CRM_API_URL || "https://admin.empire-premium.de/api/v1"
  const crmKey = process.env.CRM_API_KEY || ""

  try {
    const response = await fetch(`${crmUrl}/categories`, {
      headers: {
        "x-api-key": crmKey,
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch categories from CRM" },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Server API /api/categories error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
