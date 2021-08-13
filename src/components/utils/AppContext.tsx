import { createContext } from 'react'

export interface ContextType {
  currentUser: any
  currentUserLoading: boolean
  currentUserError: any
  staffMode: boolean
  setStaffMode: any
}

const AppContext = createContext<ContextType>({
  currentUser: null,
  currentUserLoading: false,
  currentUserError: null,
  staffMode: false,
  setStaffMode: null
})

export default AppContext
