import { Button } from '../ui/Button'

export function SignedOut() {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      <Button href="/login" variant="secondary">
        Login
      </Button>

      <Button href="/signup" variant="secondary">
        Sign Up
      </Button>
    </div>
  )
}
