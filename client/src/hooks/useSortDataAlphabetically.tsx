import { useFetch } from './useFetch';
import { useCallback, useEffect, useState } from 'react';

interface SortedEntry {
	[key: string]: string[];
}

export const useSortDataAlphabetically = () => {
	const { data, isLoading } = useFetch();
	const [sortedData, setSortedData] = useState<SortedEntry[]>([]);

	const sortDataAlphabetically = useCallback(() => {
		const updatedResults: { [key: string]: string[] }[] = [];

		data.forEach((x) => {
			const stringArr = x.name.common.toLowerCase().split('');

			stringArr.forEach((letter: string) => {
				const found = updatedResults.find(
					(x) => Object.keys(x)[0] === letter
				);

				if (found) {
					const key = Object.keys(found)[0];
					if (!found[key].includes(x.name.common)) {
						found[key] = [...found[key], x.name.common];
					}
				} else {
					updatedResults.push({
						[letter]: [x.name.common],
					});
				}
			});
		});

		setSortedData(updatedResults);
	}, [data]);

	useEffect(() => {
		sortDataAlphabetically();
	}, [sortDataAlphabetically]);

	return { sortedData, isLoading };
};