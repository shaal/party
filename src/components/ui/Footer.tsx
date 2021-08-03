import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="p-5 flex justify-between items-center">
      <div className="flex justify-between items-center gap-7">
        <img className="h-10" src="/footer-logo.svg" alt="Devparty" />
        <Link href="/">About</Link>
        <Link href="/">Terms</Link>
        <Link href="/">Privacy</Link>
        <a
          href="https://gitlab.com/yo/devparty"
          target="_blank"
          rel="noreferrer"
        >
          GitLab
        </a>
      </div>
      <div>
        <a href="https://vercel.com/?utm_source=Devparty&utm_campaign=oss">
          <img
            className="h-9"
            src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg"
            alt="Vercel"
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer
