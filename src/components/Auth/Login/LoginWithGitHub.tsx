import { Button } from '@components/ui/Button'
import mixpanel from 'mixpanel-browser'
import React from 'react'
import { STATIC_ASSETS } from 'src/constants'

const LoginWithGitHub: React.FC = () => {
  return (
    <a href="/api/auth/github">
      <Button
        size="lg"
        type="button"
        variant="success"
        onClick={() => mixpanel.track('login.github.click')}
        className="w-full justify-center text-[#0d1117] border-[#0d1117] hover:bg-[#dadada] focus:ring-[#0d1117]"
        icon={
          <img
            src={`${STATIC_ASSETS}/brands/github-dark.svg`}
            className="h-4 w-4"
            alt="GitHub Logo"
          />
        }
        outline
      >
        GitHub
      </Button>
    </a>
  )
}

export default LoginWithGitHub
