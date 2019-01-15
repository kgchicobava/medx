function howMuch(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (parseInt(array[i]) === what) {
            count++;
        }
    }
    return count;
}

var countInArray = function(stars){
    return [howMuch(stars, 5), howMuch(stars, 4), howMuch(stars, 3), howMuch(stars, 2), howMuch(stars, 1)]
}

module.exports = countInArray;