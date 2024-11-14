function diffing(oldList, newList)
{
	const oldIdSet = new Set(oldList.map(({id})=>id));
	const newIdSet = new Set(newList.map(({id})=>id));

	const diffLog = [];

	let oldIdx = 0;
	let newIdx = 0;

	while(oldIdx < oldList.length && newIdx < newList.length)
	{
		const oldItem = oldList[oldIdx];
		const newItem = newList[newIdx];

		if(oldItem.id === newItem.id) {
			if(!isSame(oldItem, newItem)) {
				diffLog.push({command: "modify", index: oldIdx, to: newItem});
			}
			oldIdx++;
			newIdx++;
		}
		else if(!newIdSet.has(oldItem.id)) {
			diffLog.push({command: "delete", index: oldIdx});
			oldIdx++;
		}
		else if(!oldIdSet.has(newItem.id)) {
			diffLog.push({command: "add", index: oldIdx, to: newItem});
			newIdx++;
		}
	}
	while(oldIdx < oldList.length) {
		diffLog.push({command: "delete", index: oldIdx});
		oldIdx++;
	}
	while(newIdx < newList.length) {
		diffLog.push({command: "add", index: oldIdx, to: newList[newIdx]});
		newIdx++;
	}

	return diffLog;
}

function isSame(a, b)
{
	if(a === b) return true;
	if(typeof a !== "object" || typeof b !== "object") return false;
	if(a === null || b === null) return false;
	for(let aProp of Object.keys(a)) {
		if(a[aProp] !== b[aProp]) return false;
	}
	for(let bProp of Object.keys(b)) {
		if(a[bProp] !== b[bProp]) return false;
	}
	return true;
}

export default diffing;