import '../styles.css'

import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

import DefaultLayout from '../components/DefaultLayout'
import { NProgress } from '../components/ui/NProgress'
import { useApollo } from '../utils/apollo'

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialClientState)

  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <DefaultSeo defaultTitle="Devparty" titleTemplate="%s | Devparty" />
        <NProgress />
        <Toaster />
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
