
export function showLoading(el) {

    let html = ``;

    html += `<div class="center-align mx"><img src="assets/images/loading.svg"></div>`;

    el.innerHTML = html;
}

export function removeLoading(el) {
    el.innerHTML = '';
}


export function utcToLocal(utcdateTime, tz) {
    moment.locale('id');
    var zone = moment.tz(tz).format("Z") 
    var zoneValue = zone.replace(/[^0-9: ]/g, "") 
    var operator = zone && zone.split("") && zone.split("")[0] === "-" ? "-" : "+" 
    var localDateTime
    var hours = zoneValue.split(":")[0]
    var minutes = zoneValue.split(":")[1]
    if (operator === "-") {
        localDateTime = moment(utcdateTime).subtract(hours, "hours").subtract(minutes, "minutes").format('LL')
    } else if (operator) {
        localDateTime = moment(utcdateTime).add(hours, "hours").add(minutes, "minutes").format('LL')
    } else {
        localDateTime = "Invalid Timezone Operator"
    }
    return localDateTime
}