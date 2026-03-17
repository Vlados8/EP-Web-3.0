import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Photovoltaik & Wärmepumpe – Installation in Norddeutschland',
  description: 'Installation von Photovoltaik und Wärmepumpen in Norddeutschland (Bremen + 100km). Beratung, Planung und Umsetzung vom Profi. Jetzt Angebot anfragen!',
  generator: 'v0.app',
  keywords: ['Photovoltaik', 'Wärmepumpen', 'Erneuerbare Energien', 'Solarstrom', 'Saubere Energie'],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#f8fafc',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
