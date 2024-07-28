export class Alarm {
    time: Date;
    dayOfWeek: number;
    snoozeCount: number = 0;

    constructor(time: Date, dayOfWeek: number) {
        this.time = time;
        this.dayOfWeek = dayOfWeek;
    }

    shouldAlert(currentTime: Date): boolean {
        return currentTime.getDay() === this.dayOfWeek &&
            currentTime.getHours() === this.time.getHours() &&
            currentTime.getMinutes() === this.time.getMinutes();
    }

    snooze(): void {
        if(this.snoozeCount >= 3) {
            console.log('Maximum snooze limit reached');
            return;
        }

        this.time.setMinutes(this.time.getMinutes() + 2);
        this.snoozeCount++;
        console.log('Alarm Snoozed for 5 minutes');
    }
}