# HR Net

HR Net is a human resources management application developed using React and Redux.

## Installation

- Clone this repository to your local machine.

- Make sure you have Node.js installed on your system.

- Run npm install to install all dependencies.

```bash
npm install
```

## Utilisation

- To start the application in development mode, run npm start.

```bash
npm start
```

- To build the application for production, run npm run build.

```bash
npm build
```

- To run tests, run npm test.

```bash
npm test
```

- To eject Create React App scripts, run npm run eject.

```bash
npm eject
```

## App Structure

The structure of the HR Net application is organized as follows:

- **App.js**: Main app component responsible for routing and overall application setup.
- **pages/**: Contains page components for each route in the application.
  - **employee-list.js**: Page component responsible for displaying the list of employees.
  - **home.js**: Page component responsible for displaying the form to add/edit employees.
- **components/**: Contains reusable component used throughout the application.
  - **Table.js**: Reusable component responsible for displaying a list of employees.

## Redux Integration

Redux is integrated into the application for managing application state. Here's a brief overview of the Redux setup:

- **redux/**: Contains Redux-related files.
  - **reducers.js**: Defines Redux reducers to update application state based on actions.
  - **store.js**: Creates the Redux store and combines reducers.
- **App.js**: Wraps the entire application with the Redux `<Provider>` to provide the store to all components.

This structured organization helps maintain clarity and separation of concerns within the project.


## Example Usage

![Alt text](https://image.noelshack.com/fichiers/2024/15/4/1712792721-hr-net.png "Screenshot")


## Dependencies

- React: JavaScript library for building user interfaces.
- Redux Toolkit: Official Redux tool for managing application state.
- @reduxjs/toolkit: Official Redux tool for managing application state.
- @testing-library/user-event: Library for simulating user events for testing.
- @types/react: TypeScript types for React.
- @types/react-dom: TypeScript types for ReactDOM.
- enzyme: Testing utility for React.
- react-data-table-component: DataTable component for React.
- react-datetime: Date and time picker component for React.
- react-redux: Binding React to Redux.
- react-router-dom: Routing for React applications.
- react-scripts: Development scripts for React applications.
- redux: Library for managing application state.
- redux-mock-store: Redux mock store for testing.
- redux-thunk: Redux middleware for handling asynchronous actions.
- web-vitals: Tools for measuring and observing web performance.

## Licence

This project is licensed under the MIT License - see the LICENSE file for details. MIT © Zarconos
