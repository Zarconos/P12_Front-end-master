import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import EmployeeListPage from '../pages/employee-list';
import rootReducer from '../redux/reducers';

describe('EmployeeListPage', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: rootReducer });
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <EmployeeListPage />
      </Provider>
    );

    expect(screen.getByText('Current Employees')).toBeInTheDocument();
  });


  it('displays a link to the home page', () => {
    render(
      <Provider store={store}>
        <EmployeeListPage />
      </Provider>
    );

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });


});
