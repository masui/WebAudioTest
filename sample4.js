$(function() {
    $('#start').on('click',Start)
    $('body').on('keydown',keydown)
    $('body').on('keyup',keyup)
});

suffixes = [0, 1, 2, 3, 4, 5, 6, 7, 8]

key2c = {
    'q': 'A',
    '2': 'A#',
    'w': 'B',
    'e': 'C',
    '4': 'C#',
    'r': 'D',
    '5': 'D#',
    't': 'E',
    'y': 'F',
    '7': 'F#',
    'u': 'G',
    '8': 'G#',
    'i': 'A2',
    '9': 'A2#',
    'o': 'B2',
    'p': 'C2',
    'z': 'A2',
    's': 'A2#',
    'x': 'B2',
    'c': 'C2',
    'f': 'C2#',
    'v': 'D2',
    'g': 'D2#',
    'b': 'E2',
    'n': 'F2',
    'j': 'F2#',
    'm': 'G2',
    'k': 'G2#',
    ',': 'A3',
    'l': 'A3#',
    '.': 'B3',
    '/': 'C3'
}

function keydown(e){
    var c = key2c[e.key]
    if(c){
	for (var s of suffixes){
	    gain[`${c}${s}`].gain.value = keygain(osc[`${c}${s}`].frequency.value)
	}
    }
}
function keyup(e){
    if(key2c[e.key]){
	c = key2c[e.key]
	for (var s of suffixes){
	    gain[`${c}${s}`].gain.value = 0.0
	}
    }
}

function keygain(freq){
    freq = Number(freq)
    var l = (Math.log(freq) - Math.log(440)) / Math.log(2)
    return 1 / 2 ** Math.abs(l)
}

function keyhandler(e){
    var c = e.target.id

    if(e.type == 'mousedown'){
	for (var s of suffixes){
	    gain[`${c}${s}`].gain.value = keygain(osc[`${c}${s}`].frequency.value)
	}
    }
    if(e.type == 'mouseup'){
	for (var s of suffixes){
	    gain[`${c}${s}`].gain.value = 0.0
	}
    }
}
function setkey(c,freq){
    $('<span>').text(c)
	.appendTo($('body'))
	.on('mousedown',keyhandler)
	.on('mouseup',keyhandler)
	.attr('id',c)
    $('body').append($('<span> </span>'))
    for (var s of suffixes){
	gain[`${c}${s}`] = new GainNode(audioctx);
	gain[`${c}${s}`].gain.value = 0.0
	osc[`${c}${s}`] = new OscillatorNode(audioctx);
	osc[`${c}${s}`].frequency.value = freq * (4 ** Number(s)) / 16.0
	osc[`${c}${s}`].connect(gain[`${c}${s}`]).connect(audioctx.destination);
	osc[`${c}${s}`].start();
    }
}

function Start() {
    osc = {}
    gain = {}
    audioctx = new AudioContext();       // AudioContext を作成
    setkey('A', 440 * (2.0 ** (0 / 12.0)))
    setkey('A#',440 * (2.0 ** (1 / 12.0)))
    setkey('B', 440 * (2.0 ** (2 / 12.0)))
    setkey('C', 440 * (2.0 ** (3 / 12.0)))
    setkey('C#',440 * (2.0 ** (4 / 12.0)))
    setkey('D', 440 * (2.0 ** (5 / 12.0)))
    setkey('D#',440 * (2.0 ** (6 / 12.0)))
    setkey('E', 440 * (2.0 ** (7 / 12.0)))
    setkey('F', 440 * (2.0 ** (8 / 12.0)))
    setkey('F#',440 * (2.0 ** (9 / 12.0)))
    setkey('G', 440 * (2.0 ** (10 / 12.0)))
    setkey('G#',440 * (2.0 ** (11 / 12.0)))
    setkey('A2', 440 * (2.0 ** (12 / 12.0)))
    setkey('A2#',440 * (2.0 ** (13 / 12.0)))
    setkey('B2', 440 * (2.0 ** (14 / 12.0)))
    setkey('C2', 440 * (2.0 ** (15 / 12.0)))
    setkey('C2#',440 * (2.0 ** (16 / 12.0)))
    setkey('D2', 440 * (2.0 ** (17 / 12.0)))
    setkey('D2#',440 * (2.0 ** (18 / 12.0)))
    setkey('E2', 440 * (2.0 ** (19 / 12.0)))
    setkey('F2', 440 * (2.0 ** (20 / 12.0)))
    setkey('F2#',440 * (2.0 ** (21 / 12.0)))
    setkey('G2', 440 * (2.0 ** (22 / 12.0)))
    setkey('G2#',440 * (2.0 ** (23 / 12.0)))
    setkey('A3', 440 * (2.0 ** (24 / 12.0)))
    setkey('A3#',440 * (2.0 ** (25 / 12.0)))
    setkey('B3', 440 * (2.0 ** (26 / 12.0)))
    setkey('C3', 440 * (2.0 ** (27 / 12.0)))
    setkey('C3#',440 * (2.0 ** (28 / 12.0)))
}
