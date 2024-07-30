# Pro-Manager Frontend

Welcome to the Pro-Manager Frontend repository! This project is a feature-rich frontend application designed to streamline project management processes for various user roles, including Admin, Team Leader, and Employee.

## Features

- **Kanban Boards:** Visualize tasks and manage workflow using drag-and-drop functionality.
- **Theme Switching:** Toggle between dark and light themes.
- **Reports:** View and download reports to monitor progress and productivity.
- **Dashboards:** Real-time dashboards to track performance metrics.
- **Email Notifications:** Receive notifications for deadlines and important updates.

## User Roles

1. **Admin:** Full access to all features and settings.
2. **Team Leader:** Manage team tasks and monitor team performance.
3. **Employee:** View and manage assigned tasks.

## Dependencies

The project uses the following dependencies:

- `axios`: Promise-based HTTP client for API calls.
- `dnd-kit`: Drag-and-drop toolkit for creating kanban boards.
- `formik`: Form library for React.
- `html2pdf`: Convert HTML to PDF for report downloading.
- `react-icons`: Collection of popular icons.
- `react-router-dom`: Declarative routing for React.
- `yup`: Schema validation for forms.
- `recharts`: Library for building charts.

## Components

- **Modals:** Popup windows for various interactions.
- **Cards:** Display task and project information.
- **Pills:** Small UI elements for status indicators.
- **Picklist:** Dropdown component for selecting options.
- **Dashboard Components:** Widgets for displaying metrics.
- **Switches:** Toggle components for various settings.
- **Sidebar:** Navigation menu.
- **Navbar:** Top navigation bar.
- **Logo:** Application logo.
- **Pie Chart and Bar Graph:** Visualization components for data.

## Contexts

- **Authentication Context:** Manages user authentication state.
- **Theme Context:** Manages theme switching between dark and light modes.

## Custom Hook

- **Persist Data Hook:** A custom hook that ensures data persistence even after page refreshes.

## Loaders

Functions that fetch data from various backend APIs for different routes, ensuring data is available when needed.

## Pages

Contains all the different pages that every route points to, providing a structured navigation flow.

## Routes

- **Router Instance:** Includes all routes for the application.
- **Protected Routes:** Ensure only authenticated users can access certain parts of the application.
- **Authenticated Routes:** Manage routes based on user authentication status.

## Services

Different services for API calls, split by category of entity. Also includes an `instance.js` file which exports two axios instances:

- **Protected Instance:** For authenticated API calls.
- **Normal Instance:** For unauthenticated API calls.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm

### Installation

1. Pull the repository to your local machine.

```
git pull
```

2. To install all the dependencies:

```
npm install
```

3. Once everything is installed successfully, now it's time to run the server.

```
npm run dev
```
