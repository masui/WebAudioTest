

function keygain(freq){
    var l = (Math.log(freq) - Math.log(440)) / Math.log(2)
    return 1 / 2 ** Math.abs(l)
}

console.log(keygain(110))
console.log(keygain(220))
console.log(keygain(440))
console.log(keygain(880))
console.log(keygain(1760))
