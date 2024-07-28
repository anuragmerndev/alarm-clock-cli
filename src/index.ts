import { Clock } from "./clock";
import { AlarmManager } from "./alarm-manager";
import * as readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const clock = new Clock();
const alarmManager = new AlarmManager();

clock.displayCurrentTime();

let currentTime: Date;

setInterval(async () => {
    currentTime = clock.getCurrentTime();
    await alarmManager.checkAlarm(currentTime, handleAlarmTrigger);
}, 6000);

const prompt = (query: string): Promise<string> => {
    return new Promise(resolve => rl.question(query, resolve));
}

const handleAlarmTrigger = async (alarmIndex: number): Promise<void> => {
    try {
        console.log('Time to wake up !!!');

        let snoozed = false;

        while (!snoozed) {
            const action = await prompt('Enter "snooze" to snooze the alarm or "dismiss" to dismiss it: ');

            console.log({ action });


            if (action === 'snooze') {
                alarmManager.snoozeAlarm(alarmIndex);
                snoozed = true;
            } else if (action === 'dismiss') {
                alarmManager.deleteAlarm(alarmIndex);
                snoozed = true;
            } else {
                console.log('Invalid input. Please enter "snooze" or "dismiss".');
            }
        }
        displayCommands();
    } catch (error) {
        console.log("Error handling alarm", error);
    }
}

const setAlarm = async () => {
    try {
        const timeInput = await prompt('Enter alarm time (HH:MM, 24-hour format): ');
        const dayInput = await prompt('Enter day of the week (0-6, where 0 is Sunday): ');

        const [hours, minutes] = timeInput.split(":").map(Number);
        const dayOfWeek = Number(dayInput);

        if (isNaN(hours) || isNaN(minutes) || isNaN(dayOfWeek)) {
            console.log('Invalid input. Please try again.');
            return;
        }

        const alarmTime = new Date();
        alarmTime.setHours(hours, minutes, 0, 0);
        alarmTime.setDate(alarmTime.getDate() + ((dayOfWeek - alarmTime.getDay() + 7) % 7));

        alarmManager.addAlarm(alarmTime, dayOfWeek);
        console.log('Alarm has been added');
    } catch (error) {
        console.log('Error setting alarm:', error);
    }
}

const deleteAlarm = async () => {
    try {
        alarmManager.listAlarms();
        const alarmIndex = await prompt("Enter index of the alarm to be deleted");
        const index = Number(alarmIndex);

        if (isNaN(index) || index < 0) {
            console.log('Invalid index');
            return;
        }

        alarmManager.deleteAlarm(index);
    } catch (error) {
        console.log('Error deleting alarm:', error);
    }
}

const processCommand = async () => {
    let command = await prompt('Enter a command (set, delete, list, exit): ');

    if (command === 'set') {
        await setAlarm();
    } else if (command === 'delete') {
        await deleteAlarm();
    } else if (command === 'list') {
        alarmManager.listAlarms();
    } else if (command === 'exit') {
        return;
    } else {
        console.log('Unknown command. Please enter "set" to set an alarm, "delete" to delete an alarm, "list" to list alarms, or "exit" to quit.');
    }
    displayCommands();
}

function displayCommands() {
    console.log("enter 'help' to manage your alarms alarm, 'clear' to clear your screen");
}

function clearScreen() {
    process.stdout.write('\x1b[2J');
    process.stdout.write('\u001b[H\u001b[2J\u001b[3J');
    displayCommands();
}

displayCommands();

rl.on("line", (input) => {
    if (input === "help") {
        processCommand();
    } else if (input === "clear") {
        clearScreen();
    } else {
        console.log("Unknown command");
        displayCommands();
    }
})
