import '../styles.css'

import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

import DefaultLayout from '~/components/DefaultLayout'
import { NProgress } from '~/components/ui/NProgress'
import { useApollo } from '~/utils/apollo'

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialClientState)
  const toastOptions = {
    success: {
      className: 'border border-green-500',
      iconTheme: {
        primary: '#10B981',
        secondary: 'white'
      }
    },
    error: {
      className: 'border border-red-500',
      iconTheme: {
        primary: '#EF4444',
        secondary: 'white'
      }
    },
    loading: { className: 'border border-gray-300' }
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <DefaultSeo defaultTitle="Devparty" titleTemplate="%s | Devparty" />
        <NProgress />
        <Toaster position="top-right" toastOptions={toastOptions} />
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
