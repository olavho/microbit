function plotDuringSetup (max: number, value: number) {
    if (max > 31) {
        plotNumber(0, Math.idiv(value, 32));
        plotNumber(1, value);
    } else {
        plotNumber(0, value);
    }
}

function readNumberInRange (max: number, initialValue: number, label: string) {
    basic.showString(label)
    basic.clearScreen();
    plotDuringSetup(max, result);
    result = initialValue
    while (!(input.buttonIsPressed(Button.B))) {
        if (input.buttonIsPressed(Button.A)) {
            result += 1
            if (result == max) {
                result = 0
            }
        }
        plotDuringSetup(max, result);
        pause(200);
        basic.clearScreen();
        pause(200);
    }
    return result
}

function setDate () {
    year = readNumberInRange(2025, year, "year: ")
    month = readNumberInRange(12, month, "mth: ")
    day = readNumberInRange(31, day, "day: ")
    timeanddate.setDate(month, day, year)
}

function setTime() {
    hour = readNumberInRange(24, hour, "hr: ")
    min = readNumberInRange(59, min, "min: ")
    sec = readNumberInRange(59, 0, "sec: ")
    timeanddate.set24HourTime(hour, min, sec)
}

function plotNumber(xLoc: number, value: number) {
    for (let index = 0; index <= 4; index++) {
        if (Math.idiv(value, 2 ** index) % 2 == 1) {
            led.plot(xLoc, 4 - index)
        } else {
            led.unplot(xLoc, 4 - index)
        }
    }
}

function plotTime() {
    // YYYY-MM-DD HH:MM.SS
    serial.writeLine(timeanddate.dateTime())
    timeStr = timeanddate.dateTime()
    hour = parseInt(timeStr.substr(11, 2))
    plotNumber(0, hour)
    min = parseInt(timeStr.substr(14, 2))
    plotNumber(1, Math.idiv(min, 32))
    plotNumber(2, min)
    sec = parseInt(timeStr.substr(17, 2))
    plotNumber(3, Math.idiv(sec, 32))
    plotNumber(4, sec)
}

function plotDate() {
    // YYYY-MM-DD HH:MM.SS
    timeStr = timeanddate.dateTime()
    month = parseInt(timeStr.substr(5, 2))
    plotNumber(0, month)
    day = parseInt(timeStr.substr(8, 2))
    plotNumber(1, day)

    plotNumber(3, input.temperature());
    plotNumber(4, Math.idiv(input.lightLevel(), 5));
}

input.onButtonPressed(Button.A, function () {
    if (mode >= 10) {
        // we are in edit mode; don't disturb.
        return; 
    }
    basic.clearScreen();
    if (mode == 0) {
        mode = 1;
    } else if (mode == 1) {
        mode = 0;
    }
});

input.onButtonPressed(Button.AB, function () {
    mode = mode + 10;
    basic.clearScreen()
    if (mode == 10) {
        setTime();
    } else if (mode == 11) {
        setDate();
    }
    basic.clearScreen()
    mode = mode - 10;
})

let timeStr = ""
// Modes: 0: clock, 1: date / temperature / light, 10: edit clock, 11: edit date
let mode = 0
let result = 0
let sec = 0
let year = 0
let month = 0
let day = 0
let hour = 0
let min = 0
min = 50
hour = 18
day = 18
month = 2
year = 2022
year = 2022
month = 2
day = 19
hour = 18
min = 44
sec = 0
timeanddate.setDate(month, day, year)
timeanddate.set24HourTime(hour, min, sec)
led.setBrightness(32);
basic.forever(function () {
    if (mode == 0) {
        plotTime();
        pause(200);
    } else if (mode == 1) {
        plotDate();
        pause(200);
    }
})
