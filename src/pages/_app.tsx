import '../styles.css'

import { ApolloProvider } from '@apollo/client'
import SiteLayout from '@components/SiteLayout'
import { useApollo } from '@utils/apollo'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'

const App = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps.initialClientState)

  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <Head>
          <title>Devparty</title>
        </Head>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
