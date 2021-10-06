import { STATIC_ASSETS } from 'src/constants'

const Hero: React.FC = () => {
  return (
    <div
      className="lg:col-span-7 md:col-span-12 col-span-12 bg-brand-600 dark:bg-brand-700 md:block hidden"
      style={{
        backgroundImage: `url('${STATIC_ASSETS}/patterns/topography.svg')`
      }}
    ></div>
  )
}

export default Hero
