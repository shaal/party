import { createContext } from 'react'

export interface ContextType {
  currentUser: any
  currentUserFetching: boolean
  currentUserError: any
  staffMode: any
  setStaffMode: any
}

const AppContext = createContext<ContextType>({
  currentUser: null,
  currentUserFetching: false,
  currentUserError: null,
  staffMode: false,
  setStaffMode: null
})

export default AppContext
