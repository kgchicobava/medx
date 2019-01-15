const categories = [
    5,
    10,
     16,
     20,
     25,
     30,
     40,
     50,
     60
 ]
var getAgesData = function(data) {
	let menData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		womenData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	data.map(elem => {
        if(elem.settings.sex === "male") {
            menData[decide(calculateAge(new Date(elem.settings.birthday)))]++;
        } else {
            womenData[decide(calculateAge(new Date(elem.settings.birthday)))]++;
        }
    });
    return [{name: "Men", data: menData}, {name: "Women", data: womenData}];
};

function decide(age) {
    for(let i = 0; i < categories.length; i++) {
        if(age < categories[i]) {
            return i;
        }
    }
}

function calculateAge(birthday) {
	// birthday is a date
	var ageDifMs = Date.now() - birthday.getTime();
	var ageDate = new Date(ageDifMs); // miliseconds from epoch
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = getAgesData;

// [{
//     name: "Men",
//     data: [13, 15, 10, 25, 27, 30, 26, 25, 34, 40]
// },
// {
//     name: "Women",
//     data: [10, 13, 12, 25, 30, 35, 50, 44, 40, 39]
// }]
