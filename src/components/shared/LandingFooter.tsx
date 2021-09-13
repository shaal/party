import Link from 'next/link'

const LandingFooter: React.FC = () => {
  return (
    <>
      <footer className="leading-7 flex flex-wrap">
        <span className="text-gray-500 dark:text-gray-300 font-bold pr-3">
          © Devparty
        </span>
        <span className="pr-3">
          <Link href="/">About</Link>
        </span>
        <span className="pr-3">
          <Link href="/">Terms</Link>
        </span>
        <span className="pr-3">
          <Link href="/">Privacy</Link>
        </span>
        <a
          href="https://gitlab.com/yo/devparty"
          target="_blank"
          rel="noreferrer"
        >
          Status
        </a>
      </footer>
      <a
        className="mt-2 hover:font-bold"
        href="https://vercel.com/?utm_source=Devparty&utm_campaign=oss"
        target="_blank"
        rel="noreferrer"
      >
        ▲ Powered by Vercel
      </a>
    </>
  )
}

export default LandingFooter
