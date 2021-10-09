import { gql, useQuery } from '@apollo/client'
import mixpanel from 'mixpanel-browser'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { IS_PRODUCTION } from 'src/constants'

import { CurrentUserQuery } from './__generated__/SiteLayout.generated'
import MobileFooter from './shared/MobileFooter'
import Navbar from './shared/Navbar'
import AppContext from './utils/AppContext'

mixpanel.init(IS_PRODUCTION ? 'ebe03e94eac57d2b33456503c24c02da' : '000')

export const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    me {
      id
      username
      isStaff
      spammy
      profile {
        id
        avatar
      }
    }
  }
`

interface Props {
  children: React.ReactNode
}

const SiteLayout: React.FC<Props> = ({ children }) => {
  const { resolvedTheme } = useTheme()
  const toastOptions = {
    style: {
      background: resolvedTheme === 'dark' ? '#18181B' : '',
      color: resolvedTheme === 'dark' ? '#fff' : ''
    },
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
  const { data, loading, error } =
    useQuery<CurrentUserQuery>(CURRENT_USER_QUERY)
  const [staffMode, setStaffMode] = useState<boolean>()

  useEffect(() => {
    setStaffMode(localStorage.staffMode === 'true')
  }, [])

  const injectedGlobalContext = {
    currentUser: data?.me,
    currentUserLoading: loading,
    currentUserError: error,
    staffMode,
    setStaffMode
  }

  if (data?.me) {
    mixpanel.identify(data?.me?.username)
  } else {
    mixpanel.identify('Anonymous')
  }

  return (
    <AppContext.Provider value={injectedGlobalContext}>
      <Toaster position="top-right" toastOptions={toastOptions} />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {children}
        {data?.me && <MobileFooter />}
      </div>
    </AppContext.Provider>
  )
}

export default SiteLayout
