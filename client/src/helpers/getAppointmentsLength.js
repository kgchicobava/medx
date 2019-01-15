var getAppointmentsLength = function(apps) {
    let l = 0;
    Object.values(apps).map(elem => {l += elem.length})
    return l;
}

module.exports = getAppointmentsLength;