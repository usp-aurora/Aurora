import { fn } from '@storybook/test';

import SubjectPickerMobile from './SubjectPickerMobile';
import groupsData from './storybookSupport/groupsData';
import subjectDataMap from './storybookSupport/subjectDataMap';
import { DragAndDropProvider } from '../DragAndDrop/DragAndDropContext';
import { SubjectInfoProvider } from '../SubjectInfo/SubjectInfoContext';
import { SubjectPickerProvider } from './SubjectPickerContext';

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