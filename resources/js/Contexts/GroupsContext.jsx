import { createContext, useContext, useState } from 'react';

const GroupsContext = createContext();

function GroupsProvider({ children, groups: initialGroups }) {
	const [groups, setGroups] = useState(initialGroups);
	console.log(groups);

	const findGroupByName = (groupList, groupName) => {
		for (const group of groupList) {
			if (group.title === groupName) {
				return group;
			}
			if (group.subgroups && group.subgroups.length > 0) {
				const found = findGroupByName(group.subgroups, groupName);
				if (found) return found;
			}
		}
		return null;
	};

	const updateGroupInList = (groupList, targetGroup) => {
		return groupList.map(group => {
			if (group.id === targetGroup.id) {
				return targetGroup;
			}
			if (group.subgroups && group.subgroups.length > 0) {
				return {
					...group,
					subgroups: updateGroupInList(group.subgroups, targetGroup)
				};
			}
			return group;
		});
	};

	const addSubjectToGroup = (groupName, subjectCode) => {
		const targetGroup = findGroupByName(groups, groupName);
		if (!targetGroup) {
			console.error(`Group with name "${groupName}" not found`);
			return false;
		}

		const subjectExists = targetGroup.subjects.some(s => s.code === subjectCode);
		if (subjectExists) {
			console.warn(`Subject with code "${v}" already exists in group "${groupName}"`);
			return false;
		}

		const updatedGroup = {
			...targetGroup,
			subjects: [...targetGroup.subjects, {subjectCode, "mandatory": 0}]
		};

		const updatedGroups = updateGroupInList(groups, updatedGroup);
		setGroups(updatedGroups);
		return true;
	};

	const removeSubjectFromGroup = (groupName, subjectCode) => {
		const targetGroup = findGroupByName(groups, groupName);
		if (!targetGroup) {
			console.error(`Group with name "${groupName}" not found`);
			return false;
		}

		const subjectIndex = targetGroup.subjects.findIndex(s => s.code === subjectCode);
		if (subjectIndex === -1) {
			console.warn(`Subject with code "${subjectCode}" not found in group "${groupName}"`);
			return false;
		}

		const updatedGroup = {
			...targetGroup,
			subjects: targetGroup.subjects.filter(s => s.code !== subjectCode)
		};

		const updatedGroups = updateGroupInList(groups, updatedGroup);
		setGroups(updatedGroups);
		return true;
	};

	return (
		<GroupsContext.Provider value={{ 
			groups, 
			addSubjectToGroup, 
			removeSubjectFromGroup 
		}}>
			{children}
		</GroupsContext.Provider>
	);
};

function useGroupsContext() { return useContext(GroupsContext) }

export { GroupsProvider, useGroupsContext };
