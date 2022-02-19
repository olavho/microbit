function readNumberInRange (max: number, initialValue: number, label: string) {
    basic.showString(label)
    basic.showNumber(initialValue)
    result = initialValue
    while (!(input.buttonIsPressed(Button.B))) {
        if (input.buttonIsPressed(Button.A)) {
            if (result == max) {
                result = 0
            }
            result += 1
            basic.showNumber(result)
        }
    }
    return result
}

function setDate () {
    year = readNumberInRange(2025, year, "year: ")
    month = readNumberInRange(12, month, "mth: ")
    day = readNumberInRange(31, day, "day: ")
    timeanddate.setDate(month, day, year)
}

function setTime () {
    hour = readNumberInRange(24, hour, "hr: ")
    min = readNumberInRange(59, min, "min: ")
    sec = readNumberInRange(59, sec, "sec: ")
    timeanddate.set24HourTime(hour, min, sec)
}

function plotNumber (yLoc: number, value: number) {
    for (let index = 0; index <= 4; index++) {
        if ((Math.idiv(value, 2 ** index) % 2) == 1) {
            led.plot(4 - index, yLoc)
        } else {
            led.unplot(4 - index, yLoc)
        }
    }
}

input.onButtonPressed(Button.AB, function () {
    mode = 1;
    basic.clearScreen()
    setDate()
    setTime()
    basic.showString(timeanddate.dateTime());
    basic.clearScreen();
    mode = 0;
});


let timeStr = ""
let result = 0
let sec = 0
let year = 0
let month = 0
let day = 0
let hour = 0
let min = 0
let mode = 0 // 0: clock, 1: date / temperature / light, 2: edit clock, 3: edit date
min = 50
hour = 18
day = 18
month = 2
year = 2022
year = 2022
month = 2
day = 18
hour = 18
min = 44
sec = 0
timeanddate.setDate(month, day, year)
timeanddate.set24HourTime(hour, min, sec)

basic.forever(function () {
    if (mode == 0) {
        // YYYY-MM-DD HH:MM.SS
        serial.writeLine(timeanddate.dateTime())
        timeStr = timeanddate.dateTime()

        hour = parseInt(timeStr.substr(11, 2))
        plotNumber(0, hour);

        min = parseInt(timeStr.substr(14, 2))
        plotNumber(1, Math.idiv(min, 32));
        plotNumber(2, min)

        sec = parseInt(timeStr.substr(17, 2))
        plotNumber(3, Math.idiv(sec, 32));
        plotNumber(4, sec)
    }
    
    pause(200);
})
