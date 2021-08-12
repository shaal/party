interface GridLayoutProps {
  children: React.ReactNode
}

export const GridLayout: React.FC<GridLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto max-w-screen-2xl flex-grow py-8 lg:px-16 md:px-10 sm:px-5 px-5">
      <div className="grid grid-cols-12 lg:gap-10">{children}</div>
    </div>
  )
}

export const GridItemFour: React.FC<React.ReactNode> = ({ children }) => {
  return (
    <div className="lg:col-span-4 md:col-span-12 col-span-12">{children}</div>
  )
}

export const GridItemEight: React.FC<React.ReactNode> = ({ children }) => {
  return (
    <div className="lg:col-span-8 md:col-span-12 col-span-12">{children}</div>
  )
}
