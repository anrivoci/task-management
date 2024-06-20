import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'columns',
    initialState: "",
    reducers: {
        setFilterValue: (state, action) => {
            return action.payload;
        },
        filterData: (state) => {

        },
    },
});

export const { filterData, setFilterValue } = searchSlice.actions;
export default searchSlice.reducer;