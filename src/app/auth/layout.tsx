"use client"
import '../globals.css'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <main className={`w-screen h-screen flex items-center justify-center`}>
            {children}
        </main>
        </body>
        </html>
    )
}