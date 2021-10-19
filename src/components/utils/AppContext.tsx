import { createContext } from 'react'

export interface ContextType {
  currentUser: any
  currentUserLoading: boolean
  currentUserError: any
  staffMode: any
  setStaffMode: any
  viewingPost: any
  setViewingPost: any
}

const AppContext = createContext<ContextType>({
  currentUser: null,
  currentUserLoading: false,
  currentUserError: null,
  staffMode: false,
  setStaffMode: null,
  viewingPost: null,
  setViewingPost: null
})

export default AppContext
