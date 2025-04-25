import { PDFDocument } from 'pdf-lib';
import fs from 'node:fs';

// Paths of the pdfs to merge
const paths = ['./pdfs/test1.pdf', './pdfs/test2.pdf'];

// Read the contents of each pdf and construct PDFDocuments
const pdfs = await Promise.all(
	paths.map(path => PDFDocument.load(fs.readFileSync(path)))
);

// Create the empty PDF that will contain the contents of each PDF to merge
const merged = await PDFDocument.create();

// Copy the pages of each PDF into the merged PDF
for (const pdf of pdfs) {
	const pages = await merged.copyPages(pdf, pdf.getPageIndices());
	pages.forEach(page => merged.addPage(page));
}

// Get the uint8array of the merged PDF
const bytes = await merged.save();

// Save the merged PDF
fs.writeFileSync('./merged.pdf', bytes);
