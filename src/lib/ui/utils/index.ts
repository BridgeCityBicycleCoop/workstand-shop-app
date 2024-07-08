import type { Member } from '$lib/models/member';
import { formatDate } from 'date-fns/format';

export const getDisplayName = (member: Member | undefined): string => {
	if (!member) {
		return '';
	}

	return member?.preferredName ? `${member.name} [${member.preferredName}]` : `${member?.name}`;
};

/**
 * Convert a 2D array into a CSV string
 */
export function arrayToCsv(data: string[][]) {
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
	var blob = new Blob([content], { type: contentType });
	var url = URL.createObjectURL(blob);

	// Create a link to download it
	var pom = document.createElement('a');
	pom.href = url;
	pom.setAttribute('download', filename);
	pom.click();
}

export function convertAndDownloadCsv(data: string[][]) {
	const csv = arrayToCsv(data);
	const date = formatDate(Date.now(), 'yyyy-mm-dd');
	const filename = `Workstand Visits ${date}`;

	downloadBlob(csv, filename, 'text/csv;charset=utf-8;');
}
