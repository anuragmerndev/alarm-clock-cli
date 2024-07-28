export class Clock {

    getCurrentTime(): Date {
        return new Date();
    }

    displayCurrentTime(): void {
        console.log(`Current Time is: ${this.getCurrentTime().toLocaleTimeString()}`);
    }
}