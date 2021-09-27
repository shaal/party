const Hero: React.FC = () => {
  return (
    <div
      className="lg:col-span-7 md:col-span-12 col-span-12 bg-brand-600 dark:bg-brand-700 md:block hidden"
      style={{
        backgroundImage: `url('https://assets.devparty.io/images/heropatterns/topography.svg')`
      }}
    ></div>
  )
}

export default Hero
