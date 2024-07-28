import { Alarm } from "./alarm";

export class AlarmManager {
    alarms: Alarm[] = [];

    addAlarm(time: Date, dayOfWeek: number): void {
        const alarm = new Alarm(time, dayOfWeek);
        this.alarms.push(alarm);
        console.log(`Alarm set for ${time.toLocaleTimeString()} on day ${dayOfWeek}`);
    }

    listAlarms(): void {
        if (!this.alarms.length) {
            console.log('No Alarms Set.');
            return;
        }

        this.alarms.forEach((alarm, index) => {
            console.log(`${index}: ${alarm.time.toLocaleTimeString()} on day ${alarm.dayOfWeek}`);
        })
    }

    deleteAlarm(index: number): void {
        if (!this.alarms.length || index < 0 || this.alarms.length < index + 1) {
            console.log('invalid alarm index, or no alarms set');
            return;
        }

        const removedAlarm = this.alarms.splice(index, 1)[0];
        console.log(`alarm delete for: ${removedAlarm.time.toLocaleTimeString()}`);
    }

    checkAlarm(currentTime: Date, alarmTriggerManager: (index: number) => void) {
        this.alarms.forEach(async (alarm, index) => {
            if (alarm.shouldAlert(currentTime)) {
                console.log({ index });

                alarmTriggerManager(index);
            }
        })
    }

    snoozeAlarm(index: number): void {
        console.log(this.alarms.length || index < 0 || this.alarms.length < index + 1, this.alarms.length, index < 0, this.alarms.length < index + 1);

        if (this.alarms.length || index < 0 || this.alarms.length < index + 1) {
            this.alarms[index].snooze();
        } else {
            console.log('Invalid alarm index.');
        }
    }
}