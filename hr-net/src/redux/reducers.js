//reducers.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employees: []
};

const storeSlice = createSlice({
    name: 'storeData',
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            state.employees.push(action.payload);
            console.log("New employee added:", action.payload);
            console.log("Updated state:", state);
        }
    }
});

export const { addEmployee } = storeSlice.actions;
export default storeSlice.reducer;
