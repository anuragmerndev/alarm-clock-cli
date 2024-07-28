# Alarm Clock Application

## Overview

This is a command-line alarm clock application built with TypeScript. It allows users to set, delete, list alarms, and handle alarm triggers. When an alarm goes off, users can snooze or dismiss it.

## Features

- **Display Current Time**: Shows the current time.
- **Set Alarms**: Create alarms with a specific time and day of the week.
- **Delete Alarms**: Remove alarms by their index.
- **Snooze Functionality**: Snooze an alarm up to 3 times with a 5-minute interval each time.
- **List Alarms**: View all set alarms.
- **Command Handling**: Manage alarms and interact with the application through command-line prompts.

## Files

- `index.ts`: Main application logic including command handling and alarm management.
- `alarmManager.ts`: Manages alarm operations like adding, deleting, snoozing, and checking alarms.
- `alarm.ts`: Defines the Alarm class with properties and methods related to alarm functionality.
- `clock.ts`: Provides current time and displays it.

## Setup

**Install Dependencies**:
   Make sure you have Node.js installed. Then, navigate to the project directory and install the required dependencies using npm:

   ```bash
   npm install
   ```

**Run the Application in Dev**:
```bash
    npm run start:dev
```

## Usage
### Commands
- Show all commands: To show all the commands enter 'help'.
- Set an Alarm: To set an alarm, type set and follow the prompts to specify the time and day.
- Delete an Alarm: To delete an alarm, type delete, view the list of alarms, and provide the index of the alarm to be deleted.
- List Alarms: To list all set alarms, type list.
- Exit: To exit the application, type exit.
- Clear Screen: To clear the screen, type clear.

## Handling Alarms
When an alarm triggers, the application will prompt you with the option to either snooze or dismiss the alarm. You can snooze up to 3 times, with each snooze adding 5 minutes to the alarm time.

This `README.md` provides clear instructions and usage details for the alarm clock application, including setup, usage commands, and how to handle alarms.