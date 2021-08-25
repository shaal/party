import '../styles.css'

import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider, useTheme } from 'next-themes'
import toast, { Toaster } from 'react-hot-toast'

import DefaultLayout from '~/components/DefaultLayout'
import { NProgress } from '~/components/ui/NProgress'
import { useApollo } from '~/utils/apollo'

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialClientState)
  const { theme } = useTheme()
  toast.loading('hello')

  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <DefaultSeo defaultTitle="Devparty" titleTemplate="%s | Devparty" />
        <NProgress />
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'border border-gray-300',
            success: {
              className: 'border border-green-500'
            },
            error: {
              className: 'border border-red-500'
            }
          }}
        />
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
