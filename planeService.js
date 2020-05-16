let passengerCount = 0;

const submit = (answer, number) => {
    passengerCount = number;
    var array = JSON.parse(answer);

    if (!Array.isArray(array)) {
        throw "Not an Array";
    }

    var maxRow = array.map((row) => { return Math.max.apply(Math, row); });

    var colSize = Math.max.apply(Math, maxRow);
    var rowSize = Math.max.apply(Math, maxRow);

    //Identify seats
    var seats = fillWithMAandW(array);

    //Replace chars with numbers
    var obj = {};

    obj = replaceWithNumber("A", 1, seats, colSize, rowSize);
    obj = replaceWithNumber("W", obj.counter, obj.seats, colSize, rowSize);
    obj = replaceWithNumber("M", obj.counter, obj.seats, colSize, rowSize);
    seats = obj.seats;

    console.log('obj.seats=>', obj.seats);

    //print the seats
    return printValues(seats, colSize, rowSize)

    return seats;
}

function fillWithMAandW(array) {
    var seats = [];

    for (var i = 0; i < array.length; i++) {
        // seats.push(Array(array[i][0]).fill().map(() => Array(array[i][1]).fill("M")));
        seats.push(Array(array[i][1]).fill().map(() => Array(array[i][0]).fill("M")));
    }

    for (var i = 0; i < seats.length; i++) {
        for (var j = 0; j < seats[i].length; j++) {
            seats[i][j][0] = "A";
            seats[i][j][seats[i][j].length - 1] = "A";
        }
    }

    for (var i = 0; i < seats[0].length; i++) {
        seats[0][i][0] = "W";
        console.log('check this->', JSON.parse(JSON.stringify(seats)));
    }

    for (var i = 0; i < seats[seats.length - 1].length; i++)
        seats[seats.length - 1][i][(seats[seats.length - 1][i].length) - 1] = "W";

    return seats;
}

function replaceWithNumber(val, counter, seats, colSize, rowSize) {
    for (var i = 0; i < colSize; i++) {
        for (var j = 0; j < rowSize; j++) {
            if (seats[j] == null || seats[j][i] == null)
                continue;
            for (k = 0; k < seats[j][i].length; k++) {
                if (seats[j] != null && seats[j][i] != null && seats[j][i][k] === val) {
                    if (counter <= passengerCount) {
                        seats[j][i][k] = counter;
                        counter++;
                    } else {
                        return { seats: seats, counter: counter };
                    }
                }
            }
        }

    }
    return { seats: seats, counter: counter };
}

function printValues(seats, colSize, rowSize) {
    var stringJ = ""
    for (var i = 0; i < colSize; i++) {
        for (var j = 0; j < rowSize; j++) {
            if (seats[j] == null || seats[j][i] == null) {
                stringJ += "----- " + ",";
                continue;
            }
            for (k = 0; k < seats[j][i].length; k++) {
                if (typeof (seats[j][i][k]) != "number") {
                    stringJ += "- ";
                } else {
                    stringJ += (seats[j][i][k] + " ");
                }
            }
            stringJ += ",";
        }
        stringJ += "\n"
    }
    console.log(stringJ)
    return stringJ;
}

module.exports = submit;