/* eslint-disable prettier/prettier */
// src/components/Task.stories.js

import Task from '../components/Task.vue';
import { action } from '@storybook/addon-actions';

// default export to to tell storybook about the component we are documenting
export default {
    title: 'Task', // name of component in storybook sidebar
    component: Task,
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/, // information required by the story, but should not be rendered by the Storybook app /
};

/*
💡 Actions help you verify interactions when building UI components in isolation.
 Oftentimes you won't have access to the functions and state
 you have in context of the app. Use action() to stub them in.
* */
export const actionsData = {
    onPinTask: action('pin-task'),
    onArchiveTask: action('archive-task'),
};

const Template = (args, { argTypes }) => ({
    components: { Task },
    props: Object.keys(argTypes),
    methods: actionsData, // methods holds the mock methods to call on the component
    template: '<Task v-bind="$props" @pin-task="onPinTask" @archive-task="onArchiveTask" />',
});

// ags is what stores the state value. an udate to it trigeers a change instorybook
// args is storybooks way of storing the component props
export const Default = Template.bind({});
Default.args = {
    task: {
        id: '1',
        title: 'Test Task',
        state: 'TASK_INBOX',
        updatedAt: new Date(2018, 0, 1, 9, 0),
    },
};

export const Pinned = Template.bind({});
Pinned.args = {
    task: {
        ...Default.args.task,
        state: 'TASK_PINNED',
    },
};

export const Archived = Template.bind({});
Archived.args = {
    task: {
        ...Default.args.task,
        state: 'TASK_ARCHIVED',
    },
};