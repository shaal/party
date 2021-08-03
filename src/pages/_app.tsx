import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import { ApolloProvider } from '@apollo/client'
import { NProgress } from '@components/NProgress'
import { useApollo } from '@utils/apollo'
import '../styles.css'

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialClientState)

  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <DefaultSeo defaultTitle="Devparty" titleTemplate="%s | Devparty" />
        <NProgress />
        <div className="flex flex-col min-h-screen">
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
