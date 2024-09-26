
import jsPDF from 'jspdf';

const generatePDF = async () => {
  const doc = new jsPDF();

  
  const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/finalReports/viewFinalReports`
    , { credentials: 'include' });
  const reportData = await response.json();

 
  doc.text(`Height: ${reportData.height}`, 10, 10);
  doc.text(`Weight: ${reportData.weight}`, 10, 20);
  doc.text(`Eyesight: ${reportData.eyesight}`, 10, 30);
  doc.text(`Verbal Score: ${reportData.verbalScore}`, 10, 40);
  doc.text(`Non-Verbal Score: ${reportData.nonVerbalScore}`, 10, 50);


  doc.save('CompetencyReport.pdf');
};

