import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '../context/AuthContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps:{session,...pageProps} }) {
  return (
    <AuthProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </AuthProvider>
  )
}

export default MyApp
