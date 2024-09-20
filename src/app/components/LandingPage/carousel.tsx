'use client'
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  const images = [
    "/homewallpaper.svg", 
    "/layoutplane.svg",
    // "/path-to-your-third-image.jpg",
    // "/path-to-your-fourth-image.jpg",
    
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-full h-[600px]" 
    //   onMouseEnter={plugin.current.stop}
    //   onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
          
            <div className="p-1 w-full relative h-[600px]   flex items-center justify-center">
             
              <Image 
                src={src}
                alt={`Carousel image ${index + 1}`}
                layout="fill" 
                objectFit="cover" 
                className="rounded-lg"
                objectPosition="top"  
              />
              <Card className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <CardContent>
                  {/* <span className="text-4xl font-semibold text-white">{`Slide ${index + 1}`}</span> */}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

