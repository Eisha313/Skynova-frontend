import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './toolsTechnology.css'

interface Tool {
  name: string;
  img: string;
}

const tools: Tool[] = [
  { name: 'Photoshop', img: 'photoshop.png' },
  { name: 'Adobe XD', img: '/adobe.png' },
  { name: 'Adobe Illustrator', img: '/illustrator.png' },
  { name: 'Unity', img: '/unity.png' },
  { name: 'Mantine', img: '/mantine.png' },
  { name: 'Sketch', img: '/sketch.png' },
  { name: 'Figma', img: '/figma.jpg' },
  { name: 'VS Code', img: '/vs.jpg' },
  { name: 'MongoDB', img: '/mongo.jpg' },
  { name: 'CSS', img: '/css.jpg' },
  { name: 'Tailwind', img: '/tailwind.jpg' }, 
     { name: 'unity', img: '/unity.jpg' },

  
];

const Carousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="tools-and-technologies relative w-full mx-auto py-8 bg-[#0B1226]">
      <h2 className="text-center text-2xl font-semibold mb-6 text-white">Tools and Technologies</h2>
      <div className="flex items-center">
        <button
          onClick={scrollPrev}
          className="bg-white/10 p-3 rounded-full text-white hover:bg-white/30 transition"
        >
          ◀
        </button>
        <div className="embla overflow-hidden w-full mx-4" ref={emblaRef}>
          <div className="flex space-x-6 embla__container">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="flex flex-col embla__slide items-center min-w-[100px] md:min-w-[120px] text-white"
              >
                <img
                  src={tool.img}
                  alt={tool.name}
                  className="h-16 w-16 md:h-20 md:w-20 object-contain"
                />
                <p className="mt-2 text-sm md:text-base">{tool.name}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={scrollNext}
          className="bg-white/10 p-3 rounded-full text-white hover:bg-white/30 transition"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Carousel;
