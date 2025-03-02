import React from 'react';
import SubjectInfo from './SubjectInfo';
import { SubjectInfoProvider } from '../../Hooks/useSubjectInfoContext';

const mockSubjectInfo = {
    name: 'Sample Subject',
    code: 'SUB123',
    tags: ['tag1', 'tag2'],
    credits: 3,
    desc: 'This is a sample subject description.',
    isPlanned: false,
};

export default {
    title: 'SubjectInfo/SubjectInfo',
    component: SubjectInfo,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <SubjectInfoProvider initialSubjectInfo={mockSubjectInfo} subjectInfoStartsOpened={true}>
                <Story />
            </SubjectInfoProvider>
        ),
    ],
};

export const Default = {
    args: {},
};