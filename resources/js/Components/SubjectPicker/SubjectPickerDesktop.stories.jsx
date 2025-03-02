import SubjectPickerDesktop from './SubjectPickerDesktop';
import groupsData from './storybookSupport/groupsData';
import subjectDataMap from './storybookSupport/subjectDataMap';
import { DragAndDropProvider } from '../Dnd/DragAndDropContext.jsx';
import { SubjectInfoProvider } from '../../Hooks/useSubjectInfoContext';
import { fn } from '@storybook/test';

export default {
    title: 'SubjectPicker/SubjectPickerDesktop',
    component: SubjectPickerDesktop,
    parameters: {
        layout: 'centered',
    },

    tags: ['autodocs'],

    decorators: [
        (Story) => (
            <DragAndDropProvider
                setPlans={fn}
                resetPlans={fn}
                disabled={false}
            >
                <SubjectInfoProvider>
                    <Story />
                </SubjectInfoProvider>
            </DragAndDropProvider>
        ),
    ],

    argtypes: {

    }
};

export const Default = {
    args: {
        data: groupsData,
        plannedSubjects: new Set(),
        subjectDataMap: subjectDataMap
    },
};