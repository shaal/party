import { ApolloError } from '@apollo/client'
import { createContext, Dispatch } from 'react'

import { User } from '../../__generated__/schema.generated'

export interface ContextType {
  currentUser: User | undefined
  currentUserLoading: boolean
  currentUserError?: ApolloError
  staffMode?: boolean
  setStaffMode: Dispatch<boolean>
}

const AppContext = createContext<ContextType>({
  currentUser: undefined,
  currentUserLoading: false,
  currentUserError: undefined,
  staffMode: false,
  setStaffMode: () => {}
})

export default AppContext
