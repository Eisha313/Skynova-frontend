

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
} from "@/components/ui/carousel";
import Image from "next/image";

export function ContactCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  const images = [
    "/telephone3.png",
  ];

  return (
    <div className="relative w-full h-[600px]">
      {/* Carousel */}
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
      >
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-[600px] relative flex items-center justify-center">
                <Image 
                  src={src}
                  alt={`Carousel image ${index + 1}`}
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-lg"
                  objectPosition="top"  
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Text on top of the carousel */}
      <div className="absolute inset-0 flex items-center justify-left">
        <h1 className="text-5xl font-bold text-white text-center bg-black bg-opacity-50 p-4 rounded-lg">
          Queries??? <br /> Contact Us
        </h1>
      </div>
    </div>
  );
}
