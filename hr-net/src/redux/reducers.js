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
            console.log("New employee added:", action.payload); // Ajouter ce console.log pour vérifier les données ajoutées
            console.log("Updated state:", state); // Ajouter ce console.log pour vérifier l'état mis à jour
        }
    }
});

export const { addEmployee } = storeSlice.actions;
export default storeSlice.reducer;
