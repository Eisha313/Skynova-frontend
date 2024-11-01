

// 'use client';

// import { useRouter } from 'next/navigation';
// import React, { FC, ReactNode, useEffect, useState } from 'react';
// import { useDropdown } from './DropdownContext'; 

// interface NavItemProps {
//   href?: string;
//   text: string;
//   icon: ReactNode;
//   children?: ReactNode;
//   currentPath: string;
// }

// const NavItem: FC<NavItemProps> = ({ href, text, icon, children, currentPath }) => {
//   const { openDropdown, setOpenDropdown } = useDropdown();
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const storedState = sessionStorage.getItem(text);
//     if (storedState) {
//       setIsOpen(JSON.parse(storedState));
//     }
//   }, [text]);

//   useEffect(() => {
//     if (openDropdown && openDropdown !== text) {
//       setIsOpen(false);
//     }
//   }, [openDropdown, text]);

//   const handleParentClick = () => {
//     if (children) {
//       if (openDropdown && openDropdown !== text) {
//         sessionStorage.setItem(openDropdown, JSON.stringify(false));
//       }
//       setIsOpen((prevIsOpen) => {
//         const newState = !prevIsOpen;
//         sessionStorage.setItem(text, JSON.stringify(newState));
//         setOpenDropdown(newState ? text : null);
//         return newState;
//       });
//     } else {
//       router.push(href || '');
//     }
//   };

//   const handleChildClick = (e: React.MouseEvent, childHref: string | undefined) => {
//     e.stopPropagation();
//     if (childHref) {
//       router.push(childHref);
//     }
//   };

//   return (
//     <div className={`relative nav-item-${text}`}>
//       <div
//         onClick={handleParentClick}
//         className="flex items-center p-4 text-gray-300 hover:bg-blue-600 hover:text-white hover:border-white hover:border-2 hover:shadow-md hover:rounded-l-full cursor-pointer transition duration-200 ease-in-out"
//       >
//         {icon}
//         <span className="ml-3">{text}</span>
//       </div>
//       {children && isOpen && (
//         <div className="mt-2 bg-gray-700 text-white rounded-lg shadow-lg w-full">
//           {React.Children.map(children, (child: any) =>
//             React.cloneElement(child, {
//               onClick: (e: React.MouseEvent) => handleChildClick(e, child.props.href),
//             })
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NavItem;





'use client';

import { useRouter } from 'next/navigation';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useDropdown } from './DropdownContext';

interface NavItemProps {
  href?: string;
  text: string;
  icon: ReactNode;
  children?: ReactNode;
  currentPath: string;
}

const NavItem: FC<NavItemProps> = ({ href, text, icon, children, currentPath }) => {
  const { openDropdown, setOpenDropdown } = useDropdown();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    
    if (children) {
      const isChildOpen = React.Children.toArray(children).some((child: any) => 
        currentPath.startsWith(child.props.href || '')
      );
      setIsOpen(isChildOpen);
    } else {
      setIsOpen(false);
    }
  }, [currentPath, children]);

  useEffect(() => {
    if (openDropdown && openDropdown !== text) {
      setIsOpen(false);
    }
  }, [openDropdown, text]);

  const handleParentClick = () => {
    if (children) {
      if (openDropdown && openDropdown !== text) {
        setOpenDropdown(null);
      }
      setIsOpen((prevIsOpen) => {
        const newState = !prevIsOpen;
        setOpenDropdown(newState ? text : null);
        return newState;
      });
    } else {
      router.push(href || '');
    }
  };

  const handleChildClick = (e: React.MouseEvent, childHref: string | undefined) => {
    e.stopPropagation();
    if (childHref) {
      router.push(childHref);
    }
  };

  return (
    <div className={`relative nav-item-${text}`}>
      <div
        onClick={handleParentClick}
        className="flex items-center p-4 text-gray-300 hover:bg-blue-600 hover:text-white hover:border-white hover:border-2 hover:shadow-md hover:rounded-l-full cursor-pointer transition duration-200 ease-in-out"
      >
        {icon}
        <span className="ml-3">{text}</span>
      </div>
      {children && isOpen && (
        <div className="mt-2 bg-gray-700 text-white rounded-lg shadow-lg w-full">
          {React.Children.map(children, (child: any) =>
            React.cloneElement(child, {
              onClick: (e: React.MouseEvent) => handleChildClick(e, child.props.href),
            })
          )}
        </div>
      )}
    </div>
  );
};

export default NavItem;


