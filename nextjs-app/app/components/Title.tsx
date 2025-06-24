type TitleProps = {
  children: React.ReactNode
}

export function Title({ children }: TitleProps) {
  return (
    <h1 className="text-4xl font-bold leading-tight tracking-tight mb-4">
      {children}
    </h1>
  )
}
