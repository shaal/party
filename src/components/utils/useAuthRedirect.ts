import { useRouter } from 'next/router'

export function useAuthRedirect() {
  const router = useRouter()

  return () => {
    window.location.replace((router.query.redirect as string) ?? '/')
  }
}
