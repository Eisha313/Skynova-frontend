import Image from 'next/image'

interface SideLayoutProps {
  children: React.ReactNode;
}

export default function SideLayout({ children }: SideLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 relative">
        <Image
          src="/layoutplane.svg"
          alt="plane image"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>
      <div className="w-1/2 flex items-center justify-center p-4 m-8">
        {children}
      </div>
    </div>
  )
}

