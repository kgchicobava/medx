var getVisitsData = function(data) {
    return [{name: "Visits",
            data: [data.monday.length, data.tuesday.length, data.wednesday.length, data.thursday.length, data.friday.length]}]
}

module.exports = getVisitsData;