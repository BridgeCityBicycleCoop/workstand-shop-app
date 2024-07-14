import { formatDate } from 'date-fns/format';

/**
 * Convert a 2D array into a CSV string
 */
export function arrayToCsv(data: unknown[][]) {
	return data
		.map(
			(row) =>
				row
					.map(String) // convert every value to String
					.map((v) => v.replaceAll('"', '""')) // escape double quotes
					.map((v) => `"${v}"`) // quote it
					.join(',') // comma-separated
		)
		.join('\r\n'); // rows starting on new lines
}

/**
 * Download contents as a file
 * Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
 */
export function downloadBlob(content: string, filename: string, contentType: string) {
	// Create a blob
	const blob = new Blob([content], { type: contentType });
	const url = URL.createObjectURL(blob);

	// Create a link to download it
	const pom = document.createElement('a');
	pom.href = url;
	pom.setAttribute('download', filename);
	pom.click();
}

export function convertAndDownloadCsv(data: unknown[][], collectionName: string = '') {
	const csv = arrayToCsv(data);
	const date = formatDate(Date.now(), 'yyyy-mm-dd');
	const filename = `Workstand ${collectionName} ${date}`;

	downloadBlob(csv, filename, 'text/csv;charset=utf-8;');
}
