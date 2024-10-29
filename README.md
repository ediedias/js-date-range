# Date Range Picker

A simple, interactive date range picker built with vanilla JavaScript and CSS, similar to the ones used on travel websites. Users can select a start and end date, navigate through months, and close the calendar with clicks outside the picker or by pressing the `Escape` key.

## Features

- **Date Range Selection**: Click to select a start and end date, with visual highlights for selected dates and range.
- **Month Navigation**: Navigate between months using `<` and `>` buttons.
- **Close on Outside Click**: The calendar closes if the user clicks outside the picker.
- **Escape Key Support**: Press `Escape` to close the calendar.

## Technologies Used

- **JavaScript**: Vanilla JavaScript for all dynamic behavior.
- **CSS**: Basic styling for layout, calendar structure, and interactions.
- **HTML**: Minimal markup for the date picker component.

## How It Works

- **Render Calendar**: Dynamically generates a calendar for the current month, updating on month navigation.
- **Select Date Range**: Users click on dates to set a start and end date, with selection visible on the calendar.
- **Clear Selection**: Selecting a new date resets any previous range.
- **Close Mechanisms**: The calendar hides when clicking outside or pressing `Escape`.