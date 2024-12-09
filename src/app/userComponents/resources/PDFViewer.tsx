import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    if (numPages) {
      setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="shadow-lg"
        loading={<p>Loading PDF...</p>}
        error={<p>Error loading PDF</p>}
      >
        <Page pageNumber={pageNumber} renderTextLayer={true} renderAnnotationLayer={true} width={600} />
      </Document>

      <div className="flex items-center space-x-4 mt-4">
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          className="px-4 py-2 bg-blue-500 text-white disabled:text-gray-500 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <p className="text-white">
          Page {pageNumber} of {numPages || "—"}
        </p>
        <button
          onClick={goToNextPage}
          disabled={pageNumber === numPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;
