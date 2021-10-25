import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import { ProgressBar } from '@components/UI/ProgressBar'
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Finish: React.FC = () => {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/home')
  }

  return (
    <div className="onboarding-bg page-center">
      <Card className="w-full sm:max-w-xl border-2 shadow-lg">
        <CardBody className="linkify space-y-2">
          <div className="flex items-center mb-5 space-x-5">
            <Link href="/onboarding/follow" passHref>
              <Button
                className="mx-auto rounded-full"
                size="lg"
                variant="secondary"
                icon={<ArrowLeftIcon className="h-4 w-4" />}
                outline
              />
            </Link>
            <ProgressBar percentage={100} />
            <Button
              className="mx-auto"
              icon={<CheckCircleIcon className="h-4 w-4" />}
              onClick={handleContinue}
            >
              Finish
            </Button>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">Join our community!</div>
            <div className="text-gray-500">
              Join Devparty community accross the internet and stay updated with
              new features and releases.
            </div>
          </div>
          <div className="pt-5 space-y-4">
            <div>
              <a
                href="https://discord.gg/zxHM7uwDmk"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  className="bg-[#5865F2] hover:bg-[#5865F2] border border-[#5865F2] text-white focus:ring-[#5865F2]"
                  icon={
                    <img
                      className="h-5 w-5 mr-1"
                      src="https://assets.devparty.io/images/brands/discord-white.svg"
                    />
                  }
                >
                  Join our Discord
                </Button>
              </a>
            </div>
            <div>
              <a
                href="https://twitter.com/devpartyio?ref_src=twsrc%5Etfw"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  className="border bg-transparent border-[#2aa9e0] text-[#2aa9e0] hover:bg-transparent focus:ring-[#2aa9e0]"
                  icon={
                    <img
                      className="h-3 mr-1"
                      src="https://assets.devparty.io/images/brands/twitter.svg"
                    />
                  }
                >
                  Follow on Twitter
                </Button>
              </a>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Finish
