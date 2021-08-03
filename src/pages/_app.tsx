import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@utils/apollo'
import '../styles.css'
import DefaultLayout from '@components/DefaultLayout'

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialClientState)

  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <DefaultSeo defaultTitle="Devparty" titleTemplate="%s | Devparty" />
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
