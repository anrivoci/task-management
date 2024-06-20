import { createSlice } from '@reduxjs/toolkit';

interface DetailsProps {
    user: string | null;
    updated: string | null;
    prevStatus: string | null;
    currentStatus: string | null;
    comments: string[];
}

interface OptionsProps {
    description: string;
    details: DetailsProps[] | null;
}

interface DataProps {
    id: number;
    title: string;
    status: string;
    options: OptionsProps;
    priority: string;
    assignee: string;
}

const initialData: DataProps[] = [
    {
        id: 1,
        title: 'Create Task',
        status: 'todo',
        priority: 'medium',
        assignee: 'Anri Voci',
        options: {
            description: "Full Description of what needs to be done in the task",
            details: [
                {
                    user: "John Doe",
                    updated: '12/03/2024',
                    prevStatus: 'TO DO',
                    currentStatus: "IN PROGRESS",
                    comments: [
                        "I added a comment in here to display changes",
                        "Full Description of what needs to be done in the task"
                    ]
                },
                {
                    user: "Jane Doe",
                    updated: '16/03/2024',
                    prevStatus: 'IN PROGRESS',
                    currentStatus: "DONE",
                    comments: ["I added a comment in here to display changes"]
                },
            ]
        }
    },
    {
        id: 2,
        title: 'Add Management',
        status: 'todo',
        priority: 'low',
        assignee: 'John Doe',
        options: {
            description: "Full Description of what needs to be done in the task",
            details: null
        }
    },
    {
        id: 3,
        title: 'Add Auth',
        status: 'todo',
        priority: 'high',
        assignee: '',
        options: {
            description: "Full Description of what needs to be done in the task",
            details: [
                {
                    user: "Jane Doe",
                    updated: '16/03/2024',
                    prevStatus: 'IN PROGRESS',
                    currentStatus: "DONE",
                    comments: []
                },
            ]
        }
    },
    {
        id: 4,
        title: 'Add Redux',
        status: 'inprogress',
        priority: 'medium',
        assignee: "Anri Voci",
        options: {
            description: "Full Description of what needs to be done in the task",
            details: [
                {
                    user: "Jane Doe",
                    updated: '16/03/2024',
                    prevStatus: 'IN PROGRESS',
                    currentStatus: "DONE",
                    comments: []
                },
            ]
        }
    },
    {
        id: 5,
        title: 'Create Boilerplate',
        status: 'done',
        priority: 'high',
        assignee: "Jane Doe",
        options: {
            description: "Full Description of what needs to be done in the task",
            details: [
                {
                    user: "John Doe",
                    updated: '12/03/2024',
                    prevStatus: 'TO DO',
                    currentStatus: "IN PROGRESS",
                    comments: []
                },
                {
                    user: "Jane Doe",
                    updated: '16/03/2024',
                    prevStatus: 'IN PROGRESS',
                    currentStatus: "DONE",
                    comments: []
                },
            ]
        }
    },
    {
        id: 6,
        title: 'Commit Changes',
        status: 'done',
        priority: 'medium',
        assignee: "Anri Voci",
        options: {
            description: "Full Description of what needs to be done in the task",
            details: [
                {
                    user: "John Doe",
                    updated: '12/03/2024',
                    prevStatus: 'TO DO',
                    currentStatus: "IN PROGRESS",
                    comments: []
                },
                {
                    user: "Jane Doe",
                    updated: '16/03/2024',
                    prevStatus: 'IN PROGRESS',
                    currentStatus: "DONE",
                    comments: []
                },
            ]
        }
    },
];

const dataSlice = createSlice({
    name: 'data',
    initialState: initialData,
    reducers: {
        updateStatus: (state, action) => {
            const { id, status } = action.payload;
            const item = state.find(item => item.id === id);
            if (item) {
                item.status = status;
            }
        },
        addTask: (state, action) => {
            state.push(action.payload);
        },
        addComment: (state, action) => {
            const { id, comment, prevStatus, currentStatus, user, updated } = action.payload;
            const itemIndex = state.findIndex(item => item.id === id);

            if (itemIndex !== -1) {
                const details = state[itemIndex]?.options?.details || [];
                const updatedDetails = details.map(detail => ({
                    ...detail,
                    comments: detail.comments || []
                })).concat({
                    user: user,
                    updated: updated,
                    prevStatus: prevStatus,
                    currentStatus: currentStatus,
                    comments: [comment],
                });

                const updatedItem = {
                    ...state[itemIndex],
                    options: {
                        ...state[itemIndex].options,
                        details: updatedDetails,
                    },
                };

                state[itemIndex] = updatedItem;
            }
        },

        deleteTask: (state, action) => {
            return state.filter(task => task.id !== action.payload);
        },
        updateDescription: (state, action) => {
            const { id, description } = action.payload;
            const task = state.find(task => task.id === id);
            if (task) {
                task.options.description = description;
            }
        },
        updateAssignee: (state, action) => {
            const { id, name } = action.payload;
            const item = state.find(item => item.id === id);
            if (item) {
                item.assignee = name;
            }
        },
    },
});

export const { updateStatus, addTask, addComment, deleteTask, updateDescription, updateAssignee } = dataSlice.actions;
export default dataSlice.reducer;