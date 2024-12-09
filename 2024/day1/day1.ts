import { readFileSync as fs } from 'fs';

function readFileToArrays(filePath: string): {
	locIDArr1: number[];
	locIDArr2: number[];
} {
	const input = fs(filePath, 'utf8');
	const lines = input.split('\n').filter((line) => line.trim() !== '');

	const locIDArr1: number[] = [];
	const locIDArr2: number[] = [];

	lines.forEach((line) => {
		const [locID1, locID2] = line.trim().split(/\s+/).map(Number);
		if (!isNaN(locID1) && !isNaN(locID2)) {
			locIDArr1.push(locID1);
			locIDArr2.push(locID2);
		}
	});

	return { locIDArr1, locIDArr2 };
}

function sortArray(arr: number[]): number[] {
	let sortedArr = arr.sort((a, b) => a - b);
	return sortedArr;
}

function calcTotalDistance(arr1: number[], arr2: number[]): number {
	let sortedLocIDArr1 = sortArray(arr1);
	let sortedLocIDArr2 = sortArray(arr2);

	if (sortedLocIDArr1.length !== sortedLocIDArr2.length) {
		throw new Error('Arrays must be of the same length.');
	}

	let totalDistance = 0;

	for (let i = 0; i < sortedLocIDArr1.length; i++) {
		totalDistance += Math.abs(sortedLocIDArr1[i] - sortedLocIDArr2[i]);
	}

	return totalDistance;
}

const filePath = './input.txt';
const { locIDArr1, locIDArr2 } = readFileToArrays(filePath);

console.log(calcTotalDistance(locIDArr1, locIDArr2));
