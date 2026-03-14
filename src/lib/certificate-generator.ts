import html2canvas from 'html2canvas';

interface DownloadOptions {
  element: HTMLElement;
  fileName: string;
}

async function renderCertificateElement(element: HTMLElement): Promise<HTMLCanvasElement> {
  return html2canvas(element, {
    backgroundColor: '#FDFBF7',
    scale: 3,
    useCORS: true,
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });
}

export async function downloadCertificatePNG({ element, fileName }: DownloadOptions) {
  const canvas = await renderCertificateElement(element);
  const link = document.createElement('a');
  link.download = fileName;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
}

export async function downloadCertificatePDF({ element, fileName }: DownloadOptions) {
  const canvas = await renderCertificateElement(element);
  const jsPDF = await import('jspdf');
  const pdf = new jsPDF.default('landscape', 'mm', 'a4');

  const imgData = canvas.toDataURL('image/png', 1.0);
  const pdfWidth = 297;
  const pdfHeight = 210;
  const canvasAspectRatio = canvas.width / canvas.height;
  const pdfAspectRatio = pdfWidth / pdfHeight;

  let renderWidth = pdfWidth;
  let renderHeight = pdfHeight;
  let offsetX = 0;
  let offsetY = 0;

  if (canvasAspectRatio > pdfAspectRatio) {
    renderHeight = pdfWidth / canvasAspectRatio;
    offsetY = (pdfHeight - renderHeight) / 2;
  } else {
    renderWidth = pdfHeight * canvasAspectRatio;
    offsetX = (pdfWidth - renderWidth) / 2;
  }

  pdf.addImage(imgData, 'PNG', offsetX, offsetY, renderWidth, renderHeight);
  pdf.save(fileName);
}
