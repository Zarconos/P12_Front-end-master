import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'; // Utilisez configureStore de Redux Toolkit
import { render, screen, cleanup, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Importez userEvent pour simuler les événements utilisateur
import EmployeeFormPage from '../pages/home';
import rootReducer from '../redux/reducers'; // Importez votre reducer

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  cleanup();
  container = null;
});

describe('EmployeeFormPage', () => {
    it('renders without crashing', () => {
        render(
            <Provider store={configureStore({ reducer: rootReducer })}>
                <EmployeeFormPage />
            </Provider>
        );
    });

    it('allows the user to fill in the form', async () => {
        const store = configureStore({ reducer: rootReducer });

        render(
            <Provider store={store}>
                <EmployeeFormPage />
            </Provider>
        );

        const firstNameInput = screen.getByLabelText('Prénom');
        const lastNameInput = screen.getByLabelText('Nom');

        expect(firstNameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();

        await userEvent.type(firstNameInput, 'John');
        await userEvent.type(lastNameInput, 'Doe');

        // Vérifiez si les éléments sont toujours dans le document
        expect(firstNameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();

        // Vérifiez que les valeurs sont correctement définies
        expect(firstNameInput).toHaveValue('John');
        expect(lastNameInput).toHaveValue('Doe');
    });

    it('dispatches addEmployee action on form submission', () => {
        const store = configureStore({ reducer: rootReducer });
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <EmployeeFormPage />
            </Provider>
        );

        const form = screen.getByTestId('create-employee');
        expect(form).toBeInTheDocument();

        userEvent.click(screen.getByText('Save'));

        // Vérifier si la fonction dispatch est appelée
        expect(store.dispatch).toHaveBeenCalled();
    });

    it('opens modal when employee is created successfully', () => {
        const store = configureStore({ reducer: rootReducer });

        render(
            <Provider store={store}>
                <EmployeeFormPage />
            </Provider>
        );
        
        // Simuler la soumission du formulaire
        fireEvent.submit(screen.getByTestId('create-employee'));

        // Vérifier si le modal est ouvert
        expect(screen.getByText('Employee Created!')).toBeInTheDocument();
    });

    it('updates form input values correctly', () => {
        const store = configureStore({ reducer: rootReducer });

        render(
            <Provider store={store}>
                <EmployeeFormPage />
            </Provider>
        );
        
        // Simuler le changement de valeur pour le prénom
        fireEvent.change(screen.getByLabelText('Prénom'), { target: { value: 'John' } });
        expect(screen.getByLabelText('Prénom')).toHaveValue('John');

        // Vous pouvez ajouter d'autres tests similaires pour les autres champs du formulaire...
    });

    it('updates text input fields correctly', () => {
        const store = configureStore({ reducer: rootReducer });

        render(
            <Provider store={store}>
                <EmployeeFormPage />
            </Provider>
        );
        
        // Simuler la saisie de texte dans les champs
        fireEvent.change(screen.getByLabelText('Prénom'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'Doe' } });

        // Vérifier si les champs sont mis à jour correctement
        expect(screen.getByLabelText('Prénom')).toHaveValue('John');
        expect(screen.getByLabelText('Nom')).toHaveValue('Doe');
    });

    it('renders the submit button', () => {
        const store = configureStore({ reducer: rootReducer });

        render(
            <Provider store={store}>
                <EmployeeFormPage />
            </Provider>
        );
        
        // Vérifier la présence du bouton "Save"
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    });
});




