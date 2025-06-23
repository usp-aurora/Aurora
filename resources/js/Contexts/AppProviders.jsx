import { AuthProvider } from './AuthContext';
import { SubjectMapProvider } from './SubjectMapContext';
import { PlansProvider } from './PlansContext';
import { GroupsProvider } from './GroupsContext';
import { SubjectInfoProvider } from '../Features/SubjectInfo/SubjectInfoContext';
import { SubjectPickerProvider } from '../Features/SubjectPicker/SubjectPickerContext';
import { DragAndDropProvider } from '../Features/DragAndDrop/DragAndDropContext';
import { ViewModeProvider } from './ViewModeContext';

const AppProviders = ({ children, groups, initialPlans, suggestedPlans, subjects, user }) => {
    return (
        <AuthProvider loggedUser={user}>
            <SubjectMapProvider subjectDataMap={subjects}>
                <GroupsProvider groups={groups}>
                    <PlansProvider initialPlans={initialPlans} user={user}>
                        <ViewModeProvider suggestedPlans={suggestedPlans}>
                            <SubjectInfoProvider>
                                <SubjectPickerProvider>
                                    <DragAndDropProvider>
                                        {children}
                                    </DragAndDropProvider>
                                </SubjectPickerProvider>
                            </SubjectInfoProvider>
                        </ViewModeProvider>
                    </PlansProvider>
                </GroupsProvider>
            </SubjectMapProvider>
        </AuthProvider>
    );
};

export default AppProviders;
