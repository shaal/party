import { useRouter } from 'next/router'

export const useAuthRedirect = () => {
  const router = useRouter()

  return () => {
    window.location.replace((router.query.redirect as string) ?? '/')
  }
}
