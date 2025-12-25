import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '4KYC - Privacy-Respecting Age Verification',
  description: 'Zero-knowledge e-KYC platform using UIDAI Aadhaar API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
