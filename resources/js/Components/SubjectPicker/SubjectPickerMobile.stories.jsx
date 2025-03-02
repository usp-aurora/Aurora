import SubjectPickerMobile from './SubjectPickerMobile.jsx';
import groupsData from './storybookSupport/groupsData.jsx';
import subjectDataMap from './storybookSupport/subjectDataMap.jsx';
import { DragAndDropProvider } from '../Dnd/DragAndDropContext.jsx';
import { SubjectInfoProvider } from '../../Hooks/useSubjectInfoContext.jsx';
import { SubjectPickerProvider } from '../../Hooks/useSubjectPickerContext.jsx';
import { fn } from '@storybook/test';

export default {
    title: 'SubjectPicker/SubjectPickerMobile',
    component: SubjectPickerMobile,
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
            <SubjectPickerProvider subjectPickerStartsOpened={true}>
            <SubjectInfoProvider>
                <Story />
            </SubjectInfoProvider>
            </SubjectPickerProvider>
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