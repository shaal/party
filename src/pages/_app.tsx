import '../styles.css'

import { ApolloProvider } from '@apollo/client'
import DefaultLayout from '@components/DefaultLayout'
import { NProgress } from '@components/ui/NProgress'
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
        <NProgress />
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
