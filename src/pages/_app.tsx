import '../styles.css'

import { ApolloProvider } from '@apollo/client'
import SiteLayout from '@components/SiteLayout'
import { useApollo } from '@utils/apollo'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import NextNprogress from 'nextjs-progressbar'

const App = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps.initialClientState)

  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <Head>
          <title>Devparty</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, viewport-fit=cover"
          />
        </Head>
        <SiteLayout>
          <NextNprogress
            color="#8B5CF6"
            height={2}
            options={{ showSpinner: false }}
            showOnShallow
          />
          <Component {...pageProps} />
        </SiteLayout>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
