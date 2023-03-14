import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { ClientContextProvider } from '@/contexts/clientContext'

const inter = Inter({ subsets: ['latin'] })

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {

  return (
    <>
      <SessionProvider session={session}>
        <style jsx global>
          {`
          :root{
            --font-primary: ${inter.style.fontFamily} 
          }
          
          `}
        </style>
        
        <ClientContextProvider>
          <Component {...pageProps} />
        </ClientContextProvider>

      </SessionProvider>
    </>
  )
}
