import { createContext, useState, useContext } from 'react';

const AddSubjectContext = createContext();

function useAddSubjectContext() {
    return useContext(AddSubjectContext);
}

function AddSubjectProvider({ children }) {
    const [isAddSubjectModalOpen, setAddSubjectModalOpen] = useState(false);

    const showAddSubjectModal = () => {
        setAddSubjectModalOpen(true);
    };
    const closeAddSubjectModal = () => {
        setAddSubjectModalOpen(false);
    };

    return (
        <AddSubjectContext.Provider
            value={{
                isAddSubjectModalOpen,
                showAddSubjectModal,
                closeAddSubjectModal,
            }}
        >
            {children}
        </AddSubjectContext.Provider>
    );
}

export { AddSubjectProvider, useAddSubjectContext };