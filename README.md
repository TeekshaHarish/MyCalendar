# Dynamic Event Calendar Application

## Overview
The **Dynamic Event Calendar Application** is a web application that allows users to manage and view their events on a calendar grid. Users can add, edit, and delete events, with each event containing essential details such as event name, start time, end time, and an optional description. The application persists event data using **localStorage** so that the data is available even after page refreshes.

## Features

### 1. **Calendar View**
   - Displays the current month's calendar grid with all days properly aligned.
   - Users can navigate between months using "Previous" and "Next" buttons.
   
### 2. **Event Management**
   - Users can add events by clicking on a day.
   - Each event includes:
     - Event name
     - Start time and end time
     - Optional event description
   - Users can edit or delete events on a selected day.

### 3. **Event List**
   - Displays a list of all events for a selected day in a side panel.

### 4. **Data Persistence**
   - Events are stored using **localStorage** to persist data between page refreshes.

### 5. **UI Design**
   - Modern UI built using **shadcn** components for clean and responsive design.
   - Weekdays and weekends are clearly separated, and the current day is highlighted.
   - The selected day is visually distinct.

### 6. **Complex Logic**
   - Handles month transitions (e.g., from January 31st to February 1st).
   - Prevents overlapping events by checking the start and end times of events.
   - Allows filtering of events by keyword.

### 7. **Bonus Features (Optional)**
   - **Color Coding**: Events can be color-coded for better organization (e.g., work, personal, others).
   - **Exporting Events**: Users can export the event list for a specific month as a **JSON** or **CSV** file.

### 8. **Deployment**
   - The project is deployed on **Vercel**.

## Technologies Used
- **React.js**: For building the dynamic and interactive user interface.
- **shadcn**: For modern UI components.
- **localStorage**: For data persistence between page refreshes.
- **TailwindCSS**: For styling the application.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TeekshaHarish/MyCalendar
   cd MyCalendar
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the app locally:
   
   ```bash
   npm run dev
   ```


## How to Use

1. Open the app, and you'll see the calendar for the current month.
2. Navigate to different months using the "Previous" and "Next" buttons.
3. Click on any day in the calendar to add an event.
4. Enter the event details, including the name, start and end times, and an optional description.
5. Events for the selected day are displayed in a side panel or modal.
6. Edit or delete events as needed.
7. Use the event filter to search for events by keywords.

## Deployment Link
You can access the deployed application [here](https://my-calendar-sage.vercel.app/).
