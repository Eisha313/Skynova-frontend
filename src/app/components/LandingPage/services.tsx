
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"; // Import ShadCN components

// const services = [
//   {
//     id: 1,
//     title: "Web Development",
//     description: "Building high-quality websites.",
//     imgSrc: "/webdev.png",
//     link: "/web-development",
//   },
//   {
//     id: 2,
//     title: "ERP Solutions",
//     description: "Enterprise Resource Planning solutions.",
//     imgSrc: "/vercel.svg",
//     link: "/vercel.svg",
//   },
//   {
//     id: 3,
//     title: "Mobile Development",
//     description: "Mobile apps development.",
//     imgSrc: "/mobiledev.png",
//     link: "/mobile-development",
//   },
//   {
//     id: 4,
//     title: "Cloud Services",
//     description: "Cloud computing solutions.",
//     imgSrc: "/cloudservices.png",
//     link: "/cloud-services",
//   },
// ];

// export default function ServicesCarousel() {
//   const [hovered, setHovered] = useState<number | null>(null);

//   return (
//     <div className="mt-24 relative"> {/* Adjusted margin-top */}
//       <Carousel >
//         <CarouselContent className="flex space-x-4">
//           {services.map((service) => (
//             <CarouselItem
//               key={service.id}
//               className="relative group w-[300px] h-[400px] md:basis-1/2 lg:basis-1/3 p-4 shrink-0" // Adjusted for responsive display
//             >
//               <Link href={service.link}>
//                 <div
//                   className="w-full h-full rounded-lg overflow-hidden border shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl"
//                   onMouseEnter={() => setHovered(service.id)}
//                   onMouseLeave={() => setHovered(null)}
//                 >
//                   {/* Image */}
//                   <Image
//                     src={service.imgSrc}
//                     alt={service.title}
//                     layout="fill"
//                     objectFit="cover"
//                     className="rounded-lg"
//                   />
//                   {/* Hover Effect */}
//                   {hovered === service.id && (
//                     <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white p-4 rounded-lg">
//                       <h3 className="text-xl font-semibold mb-2">
//                         {service.title}
//                       </h3>
//                       <p className="text-center">{service.description}</p>
//                     </div>
//                   )}
//                 </div>
//               </Link>
//             </CarouselItem>
//           ))}
//         </CarouselContent>

//         {/* Left and Right Controls */}
//         <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-500 p-2 rounded-full text-white hover:bg-gray-700">
//           &#9664;
//         </CarouselPrevious>
//         <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-500 p-2 rounded-full text-white hover:bg-gray-700">
//           &#9654;
//         </CarouselNext>
//       </Carousel>
//     </div>
//   );
// }
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"; 

const services = [
  {
    id: 1,
    title: "Cockpits",
    description: "Cockpits Visualization.",
    imgSrc: "/webdev.png",
    link: "/web-development",
  },
  {
    id: 2,
    title: "Jets",
    description: "Jets Visualization.",
    imgSrc: "/erp.png",
    link: "/erp-solutions",
  },
  {
    id: 3,
    title: "VR missions",
    description: "Immersive missions.",
    imgSrc: "/mobiledev.png",
    link: "/mobile-development",
  },
  {
    id: 4,
    title: "Cloud Services",
    description: "Cloud computing solutions.",
    imgSrc: "/cloudservices.png",
    link: "/cloud-services",
  },
];

export default function ServicesCarousel() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative mt-24">
      <div className="flex justify-center items-center">
  <h2 className="text-center">Our Services</h2>
</div>
      <Carousel>
        {/* Left and Right Controls */}
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-500 p-2 rounded-full text-white hover:bg-gray-700">
          &#9664;
        </CarouselPrevious>
        
        <CarouselContent className="flex space-x-4 px-8"> {/* Added padding for arrows */}
          {services.map((service) => (
            <CarouselItem
              key={service.id}
              className="relative group w-[300px] h-[400px] md:basis-1/2 lg:basis-1/3 shrink-0 p-4"
            >
              <Link href={service.link}>
                <div
                  className="w-full h-full rounded-lg overflow-hidden border shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl"
                  onMouseEnter={() => setHovered(service.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Image */}
                  <Image
                    src={service.imgSrc}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  {/* Hover Effect */}
                  {hovered === service.id && (
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white p-4 rounded-lg">
                      <h3 className="text-xl font-semibold mb-2">
                        {service.title}
                      </h3>
                      <p className="text-center">{service.description}</p>
                    </div>
                  )}
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-500 p-2 rounded-full text-white hover:bg-gray-700">
          &#9654;
        </CarouselNext>
      </Carousel>
    </div>
  );
}
