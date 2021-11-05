import { ApolloError } from '@apollo/client'
import { User } from '@graphql/types.generated'
import { createContext, Dispatch } from 'react'

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
