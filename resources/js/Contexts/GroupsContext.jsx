import { createContext, useContext } from 'react';

const GroupsContext = createContext();

function GroupsProvider({ children, groups }) {

	return (
		<GroupsContext.Provider value={{ groups }}>
			{children}
		</GroupsContext.Provider>
	);
};

function useGroupsContext() { return useContext(GroupsContext) }

export { GroupsProvider, useGroupsContext };
