import { createSlice } from '@reduxjs/toolkit';

interface ColumnsProps {
    id: number;
    key: string;
    name: string;
}

const initialColumns: ColumnsProps[] = [
    { id: 1, key: 'todo', name: 'TO DO' },
    { id: 2, key: 'inprogress', name: 'IN PROGRESS' },
    { id: 3, key: 'done', name: 'DONE' },
];

const columnsSlice = createSlice({
    name: 'columns',
    initialState: initialColumns,
    reducers: {
        addColumn: (state) => {
            const newCol = {
                id: state.length + 1,
                key: `newcol-${state.length + 1}`,
                name: `New Col`,
            };
            state.push(newCol);
        },
    },
});

export const { addColumn } = columnsSlice.actions;

export default columnsSlice.reducer;