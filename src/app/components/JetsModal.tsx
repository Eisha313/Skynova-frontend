

// import React from 'react';

// interface ModalProps {
//   onClose: () => void;
//   children: React.ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
//       <div
//         className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {children}
//         <button onClick={onClose} className="mt-4 w-full py-2 bg-red-500 text-white rounded">
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Modal;
import React from 'react';

// Update ModalProps to include 'jet'
interface Jet {
  name: string;
  // Define other properties of Jet here if necessary
}

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  jet?: Jet; // Add 'jet' to ModalProps
}

const Modal: React.FC<ModalProps> = ({ onClose, children, jet }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
      <div
        className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {jet && <div className="mb-4">Jet Name: {jet.name}</div>}
        {children}
        <button onClick={onClose} className="mt-4 w-full py-2 bg-red-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
