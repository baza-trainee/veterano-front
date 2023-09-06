import React from "react";

type RemoveHandler = (
	id: number,
	setStateFunc: React.Dispatch<React.SetStateAction<any[]>>,
	key: string, apiFunc: (id: number) => Promise<void>) => void;


export const handleRemove: RemoveHandler = (
	id,
	setStateFunc,
	key,
	apiFunc) => {
	apiFunc(id)
		.then(() => {
			setStateFunc(prevItems => prevItems.filter(item => item[key] !== id));
		})
		.catch(error => {
			console.error("An error occurred:", error);
		});
};


export const handleRemoveSelected = (
	items: any[],
	checkedItems: boolean[],
	setStateFunc: React.Dispatch<React.SetStateAction<any[]>>,
	setCheckedFunc: React.Dispatch<React.SetStateAction<boolean[]>>,
	apiFunc: (ids: number[]) => Promise<void>,
	key: string
) => {
	const selectedIds = items.filter((_, index) => checkedItems[index]).map(p => p[key]);

	apiFunc(selectedIds)
		.then(() => {
			setStateFunc(prev => prev.filter(p => !selectedIds.includes(p[key])));
			setCheckedFunc(new Array(items.length).fill(false));
		})
		.catch(error => {
			console.error("An error occurred:", error);
		});
};


export const handleAllCheckedChange = (
	setAllChecked: React.Dispatch<React.SetStateAction<boolean>>,
	setCheckedItems: React.Dispatch<React.SetStateAction<boolean[]>>,
	arrayLength: number
) => (event: React.ChangeEvent<HTMLInputElement>) => {
	const isChecked = event.target.checked;
	setAllChecked(isChecked);
	setCheckedItems(new Array(arrayLength).fill(isChecked));
};

