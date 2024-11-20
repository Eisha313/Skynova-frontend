// Testimonials.tsx
import React from 'react';

const testimonialsData = [
  {
    name: 'Alex Johnson',
    title: 'CEO of Pixel Canvas',
    feedback:
      'Working with Game Genesis has been an absolute delight. Their creativity knows no bounds, and their professionalism ensured our project was completed on time and beyond expectations. Highly Recommend!',
    image: '/alex.png',
  },
  {
    name: 'Emily Martinez',
    title: 'Founder of Stellar Interactive',
    feedback:
      'Working with Game Genesis has been an absolute delight. Their creativity knows no bounds, and their professionalism ensured our project was completed on time and beyond expectations. Highly Recommend!',
    image: '/emily.png',
  },
  {
    name: 'Ryan Smith',
    title: 'Creative Director',
    feedback:
      'Working with Game Genesis has been an absolute delight. Their creativity knows no bounds, and their professionalism ensured our project was completed on time and beyond expectations. Highly Recommend!',
    image: '/ryan.png',
  },
];

const Testimonials = () => {
  return (
    <div className="bg-[#0B132B] text-white py-16 px-8">
      



      <div className="flex items-center justify-center">
          <div className="w-16 h-1 bg-blue-500"></div>
          <h2 className="text-xl font-semibold tracking-widest mx-4">
            Testimonials
          </h2>
          <div className="w-16 h-1 bg-blue-500"></div>
        </div>
      <div className="flex justify-center items-center gap-6 mt-20">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="bg-[#1C2541] p-8 rounded-lg shadow-lg max-w-sm"
          >
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="h-5 w-5 text-blue-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 10.567h11.065l-8.899 6.464 3.332 10.382-8.833-6.487-8.833 6.487 3.332-10.382-8.899-6.464h11.065z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-sm mb-6 mt-9">{testimonial.feedback}</p>
            <div className="flex items-center mt-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-xs">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
