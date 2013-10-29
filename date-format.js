(function() {
    var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"],
        dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    function replacer(date, G, y, M, d, E, a, H, k, K, h, m, s, S, z, Z) {
        var hour = date.getHours(),
            replacement = 
            G ? (date.getFullYear() >= 0 ? "AD" : "BC") :
            y ? (y.length >= 3 ? zeroPad(date.getFullYear(), y.length) : zeroPad(date.getFullYear() - Math.floor(date.getFullYear() / 100) * 100, y.length)) :
            M ? (M.length >= 4 ? monthNames[date.getMonth()] : M.length == 3 ? monthNames[date.getMonth()].substr(0, 3) : zeroPad(date.getMonth() + 1, M.length)) :
            d ? zeroPad(date.getDate(), d.length) :
            E ? (E.length >= 4 ? dayNames[date.getDay()] : dayNames[date.getDay()].substr(0, 3)) :
            a ? (date.getHours() >= 12 ? "PM" : "AM") :
            H ? zeroPad(hour, H.length) :
            k ? zeroPad(hour === 0 ? 24 : hour, k.length) :
            K ? zeroPad(hour > 11 ? hour - 12 : hour, K.length) :
            h ? zeroPad(hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour), h.length) :
            m ? zeroPad(date.getMinutes(), m.length) : 
            s ? zeroPad(date.getSeconds(), s.length) :
            S ? zeroPad(date.getMilliseconds(), S.length) :
            z ? getTimezoneName(date) :
            Z ? getTimezoneOffset(date) : "";
        return replacement;
    }
    function getTimezoneName(date) {
        var match;
        if (match = date.toTimeString().match(/\((.*)\)$/)) // Chrome, Firefox, Safari, Opera
            return match[1];
        if (match = date.toTimeString().match(/[A-Z]{3}$/)) // IE
            return match[0];
        return "";
    }
    function getTimezoneOffset(date) {
        var offset = date.getTimezoneOffset();
        return (offset > 0 ? "-" : "") + zeroPad((offset / 60) | 0, 2) + zeroPad((offset % 60), 2);
    }
    function zeroPad(number, digits) {
        var padding = "";
        var paddingCount = digits - number.toString().length;
        while (paddingCount-- > 0)
            padding += "0";
        return padding + number.toString();
    }
    Date.prototype.format = function format(fmt) {
        var date = this;
        return fmt.replace(/(G+)|(y+)|(M+)|(d+)|(E+)|(a+)|(H+)|(k+)|(K+)|(h+)|(m+)|(s+)|(S+)|(z+)|(Z+)/g, function (match, G, y, M, d, E, a, H, k, K, h, m, s, S, z, Z) {
            return replacer(date, G, y, M, d, E, a, H, k, K, h, m, s, S, z, Z);
        });
    }
})();
