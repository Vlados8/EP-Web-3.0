import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
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
      <head>
        {/* Google Analytics / Google Ads (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-25DB3HVH1F"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-25DB3HVH1F');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
