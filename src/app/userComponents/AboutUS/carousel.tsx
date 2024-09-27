

// 'use client';
// import * as React from 'react';
// import Autoplay from 'embla-carousel-autoplay';
// import { Card, CardContent } from '@/components/ui/card';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel';
// import Image from 'next/image';

// export function ContactCarousel() {
//   const plugin = React.useRef(
//     Autoplay({ delay: 2000, stopOnInteraction: false })
//   );

//   const objectives = [
//     'Saving Your Time',
//     'Providing Business',
//     'Centralizing Bookings',
//     '24/7 Availability',
//   ];

//   const image = '/people.png'; // Single image for the entire carousel

//   return (
//     <div className="relative w-full h-[600px]">
//       {/* Carousel */}
//       <Carousel plugins={[plugin.current]} className="w-full h-full">
//         <CarouselContent>
//           {objectives.map((objective, index) => (
//             <CarouselItem key={index} className="relative">
//               {/* Static Image */}
//               <div className="w-full h-[600px] relative flex items-center justify-center">
//                 <Image
//                   src={image} // Render the same image for all slides
//                   alt={`Carousel image ${index + 1}`}
//                   fill
//                   style={{ objectFit: 'cover' }}
//                   className="rounded-lg"
//                   objectPosition="top"
//                 />
//               </div>

//               {/* Text on top of the image */}
//               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                 <h2 className="text-3xl font-bold text-white m">{objective}</h2>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>

//         {/* Previous/Next Buttons */}
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </div>
//   );
// }

// export default ContactCarousel;
'use client';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

export function ContactCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  const objectives = [
    'Saving Your Time',
    'Providing Business',
    'Centralizing Bookings',
    '24/7 Availability',
  ];

  const image = '/people.png'; // Single image for the entire carousel

  return (
    <div className="relative w-full h-[600px]">
      {/* Carousel */}
      <Carousel plugins={[plugin.current]} className="w-full h-full">
        <CarouselContent>
          {objectives.map((objective, index) => (
            <CarouselItem key={index} className="relative">
              {/* Static Image */}
              <div className="w-full h-[600px] relative flex items-center justify-center">
                <Image
                  src={image} // Render the same image for all slides
                  alt={`Carousel image ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                  objectPosition="top"
                />
              </div>

              {/* Text on top of the image, slightly above center */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <h2 className="text-3xl font-bold text-white" style={{ transform: 'translateY(-50px)' }}>
                  {objective}
                </h2>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Previous/Next Buttons */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default ContactCarousel;
