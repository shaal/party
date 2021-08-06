import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

import { CurrentUserQuery } from './__generated__/DefaultLayout.generated'
import Footer from './shared/Footer'
import Navbar from './shared/Navbar'
import AppContext from './utils/AppContext'

const query = gql`
  query CurrentUserQuery {
    me {
      id
      username
    }
  }
`

interface Props {
  children: React.ReactNode
}

const DefaultLayout: React.FC<Props> = ({ children }) => {
  const { data, loading, error } = useQuery<CurrentUserQuery>(query)
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

  return (
    <AppContext.Provider value={injectedGlobalContext}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </div>
    </AppContext.Provider>
  )
}

export default DefaultLayout
