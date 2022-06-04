import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import { AuthProvider } from '../context/AuthContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps:{session,...pageProps} }) {
  return (
    <AuthProvider>
      <SessionProvider session={session}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </AuthProvider>
  )
}

export default MyApp
