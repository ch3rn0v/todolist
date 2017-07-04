import Math from 'mathjs';

export const countFractionPercent = (fraction, whole, precision) => {
	return whole > 0 ? Math.round(fraction / whole * 100.0, precision) : 0;
};

export const validateText = (text) => {
	let errorList = [];

	if (text.length < 5) {
		errorList.push('Text should be at least five characters long. ');
	}

	if (text.match(/[^%;,"()@!.\-: a-zA-Z0-9]/g)) {
		errorList.push(
			'Only english letters, spaces, number, and the following characters are allowed: colons, commas, semicolons, round brackets, exclamation marks, dots, @ signs, percent signs, dashes, and double quotes.'
		);
	}

	return errorList;
};

// In a real-world app id generation should be different depending on the scheme of id storing.
const generateUniqueID = () => `${Date.now()}-${Math.random()}`;

export const createNewItem = (label) => {
	return {
		id: generateUniqueID(),
		label: label,
		checked: false
	};
};

export const addNewItemToArray = (array, item) => [ ...array, item ];

const findIndexOfItem = (array, item) => array.findIndex((currItem) => currItem.id === item.id);

export const removeItemFromArray = (array, item) => {
	const itemId = findIndexOfItem(array, item);

	if (itemId > -1) {
		return [ ...array.slice(0, itemId), ...array.slice(itemId + 1) ];
	} else {
		throw new Error('The item is not present in the array.');
	}
};

const toggleItemStatus = (item) => {
	return { ...item, checked: !item.checked };
};

export const toggleItemStatusInArray = (array, item) => {
	const itemId = findIndexOfItem(array, item);
	if (itemId > -1) {
		const itemWithNewStatus = toggleItemStatus(item);
		return [ ...array.slice(0, itemId), itemWithNewStatus, ...array.slice(itemId + 1) ];
	} else {
		throw new Error('The item is not present in the array.');
	}
};

export const filterTodos = (array, route) => {
	switch (route) {
		case '/in_process':
			return array.filter((item) => !item.checked);
		case '/done':
			return array.filter((item) => item.checked);
		case '/':
			return array;
		default:
			return array;
	}
};

const changeItemSyncStatus = (item, newStatus) => {
	return { ...item, serverSyncStatus: newStatus };
};

export const setItemNewSyncStatusInArray = (array, item, newStatus) => {
	const itemId = findIndexOfItem(array, item);
	if (itemId > -1) {
		const itemWithNewSyncStatus = changeItemSyncStatus(item, newStatus);
		return [ ...array.slice(0, itemId), itemWithNewSyncStatus, ...array.slice(itemId + 1) ];
	} else {
		throw new Error('The item is not present in the array.');
	}
};
