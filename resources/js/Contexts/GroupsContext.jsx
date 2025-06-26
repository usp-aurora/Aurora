import { createContext, useContext, useState } from 'react';

const GroupsContext = createContext();

function GroupsProvider({ children, groups: initialGroups }) {
	const [groups, setGroups] = useState(initialGroups);

	const findGroupByName = (group, groupName) => {
		if (group.title === groupName) {
			return group;
		}
		
		if (group.subgroups && group.subgroups.length > 0) {
			for (const subgroup of group.subgroups) {
				const found = findGroupByName(subgroup, groupName);
				if (found) return found;
			}
		}
		return null;
	};

	const updateGroupInList = (rootGroup, targetGroup) => {
		if (rootGroup.id === targetGroup.id) {
			return targetGroup;
		}
		
		if (rootGroup.subgroups && rootGroup.subgroups.length > 0) {
			return {
				...rootGroup,
				subgroups: rootGroup.subgroups.map(subgroup => 
					updateGroupInList(subgroup, targetGroup)
				)
			};
		}
		
		return rootGroup;
	};

	const addSubjectToGroup = (subjectCode, groupName) => {
		const targetGroup = findGroupByName(groups, groupName);
		if (!targetGroup) {
			console.error(`Group with name "${groupName}" not found`);
			return false;
		}

		const subjectExists = targetGroup.subjects.some(s => s.code === subjectCode);
		if (subjectExists) {
			console.warn(`Subject with code "${subjectCode}" already exists in group "${groupName}"`);
			return false;
		}

		const updatedGroup = {
			...targetGroup,
			subjects: [...targetGroup.subjects, {code: subjectCode, "mandatory": 0}]
		};

		const updatedGroups = updateGroupInList(groups, updatedGroup);
		setGroups(updatedGroups);
		return true;
	};

	const removeSubjectFromGroup = (subjectCode, groupName) => {
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

	const moveSubjectBetweenGroups = (subjectCode, fromGroupName, toGroupName) => {
		const fromGroup = findGroupByName(groups, fromGroupName);
		const toGroup = findGroupByName(groups, toGroupName);
		
		if (!fromGroup) {
			console.error(`Source group with name "${fromGroupName}" not found`);
			return false;
		}
		
		if (!toGroup) {
			console.error(`Target group with name "${toGroupName}" not found`);
			return false;
		}
		
		const subjectIndex = fromGroup.subjects.findIndex(s => s.code === subjectCode);
		if (subjectIndex === -1) {
			console.warn(`Subject with code "${subjectCode}" not found in group "${fromGroupName}"`);
			return false;
		}
		
		const subjectExists = toGroup.subjects.some(s => s.code === subjectCode);
		if (subjectExists) {
			console.warn(`Subject with code "${subjectCode}" already exists in group "${toGroupName}"`);
			return false;
		}
		
		let updatedGroups = groups;
		
		const updatedFromGroup = {
			...fromGroup,
			subjects: fromGroup.subjects.filter(s => s.code !== subjectCode)
		};
		updatedGroups = updateGroupInList(updatedGroups, updatedFromGroup);
		
		const updatedToGroup = {
			...toGroup,
			subjects: [...toGroup.subjects, {code: subjectCode, mandatory: 0}]
		};
		updatedGroups = updateGroupInList(updatedGroups, updatedToGroup);
		
		setGroups(updatedGroups);
		return true;
	};

	return (
		<GroupsContext.Provider value={{ 
			groups, 
			addSubjectToGroup, 
			removeSubjectFromGroup,
			moveSubjectBetweenGroups,
		}}>
			{children}
		</GroupsContext.Provider>
	);
};

function useGroupsContext() { return useContext(GroupsContext) }

export { GroupsProvider, useGroupsContext };
