# Schedule Sharing

Schedule Sharing is a simple web application that allows users to create and share their availability schedules with ease. Mark your free and busy time slots, merge consecutive busy periods, and export your schedule as an image to share with others.

## Features

- **Interactive Schedule**: Click on time blocks to toggle between "Free" and "Busy".
- **Merge Time Blocks**: Consecutive busy time blocks are merged into one, displaying the combined time range.
- **Date Selection**: Choose any date to apply to your schedule.
- **Export as Image**: Export your schedule as a PNG image.
- **Reset Schedule**: Reset all time blocks to "Free" and restore default 30-minute intervals.
- **Dark Mode**: Toggle between light and dark modes for better usability in different lighting conditions.
- **Shareable Link**: Generate a shareable link to your schedule.
- **Email Sharing**: Share your schedule via email.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/KevinStock/schedule-sharing.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd schedule-sharing
   ```

3. **Open `index.html` in your browser**:

   - You can double-click the `index.html` file, or
   - Serve the directory using a local web server (e.g., with VS Code Live Server extension).

## Usage

1. **Select a Date**:

   - Use the date picker to choose the date for your schedule.
   - The selected date will be displayed in the format: `Monday, 25 March 2015`.

2. **Mark Time Blocks**:

   - Click on a time block to mark it as "Busy".
   - Consecutive busy blocks will merge into one larger block.
   - Click on a busy block to reset it to "Free".

3. **Export Schedule**:

   - Click the **Export Image** button to download your schedule as a PNG image.

4. **Reset Schedule**:

   - Click the **Reset Schedule** button to reset all time blocks to "Free" and restore default intervals.

5. **Toggle Dark Mode**:

   - Click the **Toggle Dark Mode** button to switch between light and dark modes.

6. **Copy Shareable Link**:

   - Click the **Copy Shareable Link** button to copy a link to your schedule to the clipboard.

7. **Share via Email**:

   - Click the **Share via Email** button to open your email client with a pre-filled email containing the link to your schedule.

## File Structure

- **`index.html`**: The main HTML file containing the structure of the application.
- **`style.css`**: The CSS file for styling the application.
- **`app.js`**: The JavaScript file containing the logic for the application's functionality.

## Customization

### Adjust Time Range

- **Modify the Time Range in `app.js`**:

  To change the time range of the schedule, adjust the `startHour` and `endHour` variables in **`app.js`**:

  ```javascript
  // app.js

  const startHour = 8;  // Start time (8 AM)
  const endHour = 17;   // End time (5 PM)
  ```

  - `startHour`: The hour at which the schedule starts (in 24-hour format).
  - `endHour`: The hour at which the schedule ends (in 24-hour format).

- **Update the Grid Layout in `style.css`**:
  
  If you change the total number of hours (i.e., the number of time blocks), you'll need to update the grid layout in **`style.css`** to match the new number of time blocks.
  
  ```css
  /* style.css */
  
  #timeline {
    display: grid;
    grid-template-rows: repeat(18, 50px);
  }
  ```
  
  - **Calculate the Total Number of Time Blocks**:
  
    If you're using 30-minute intervals, calculate the total number of time blocks like this:
  
    ```javascript
    const totalIntervals = (endHour - startHour) * 2;  // 2 intervals per hour
    ```
  
  - **Update `grid-template-rows`**:
  
    Replace the number `18` in `repeat(18, 50px)` with the calculated `totalIntervals`.
  
    ```css
    grid-template-rows: repeat(totalIntervals, 50px);
    ```

### Change Time Interval

  - Currently, the schedule uses 30-minute intervals. To change this, adjust the time block generation logic in `app.js`.

## License

This project is open-source and available under the MIT License.

## Acknowledgements

- Thanks to the creators of [html2canvas](https://html2canvas.hertzen.com/) for their excellent library.