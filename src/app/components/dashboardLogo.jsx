
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="p-4 flex justify-center
    ">
      <Image src="/skylogo.svg" alt="Skynova Logo" width={150} height={80} />
    </div>
  );
};

export default Logo;
