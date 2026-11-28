import { createContext, useContext, useState } from 'react';
import { trackEvent } from '../analytics';

const ViewModeContext = createContext();

function ViewModeProvider({ children, suggestedPlans }) {
    const [isSuggestedPlansView, setSuggestedPlansView] = useState(false);

    const toggleSuggestedPlansView = () => {
        trackEvent('ui.suggested_view_toggled', { enabled: !isSuggestedPlansView });
        setSuggestedPlansView(prev => !prev);
    };

    return (
        <ViewModeContext.Provider value={{ 
            isSuggestedPlansView, 
            toggleSuggestedPlansView,
            suggestedPlans
        }}>
            {children}
        </ViewModeContext.Provider>
    );
}

function useViewMode() { 
    const context = useContext(ViewModeContext);
    if (!context) {
        throw new Error('useViewMode must be used within a ViewModeProvider');
    }
    return context;
}

export { ViewModeProvider, useViewMode };
