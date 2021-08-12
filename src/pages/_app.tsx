import '../styles.css'

import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import DefaultLayout from 'src/components/DefaultLayout'
import { NProgress } from 'src/components/ui/NProgress'
import { useApollo } from 'src/utils/apollo'

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialClientState)

  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <DefaultSeo defaultTitle="Devparty" titleTemplate="%s | Devparty" />
        <NProgress />
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
