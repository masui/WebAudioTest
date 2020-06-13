//
// 2オクターブ版の無限音階をMIDIキーボードで演奏
//

$(function() {
    midiStart()
    //$('#start').on('click',Start)
    $('body').on('click',Start)
});

async function midiStart(){
    const access = await navigator.requestMIDIAccess({sysex : true})

    var midiin = [];
    var it = access.inputs.values(); // MIDI in
    for (var o = it.next(); !o.done; o = it.next()) {
	midiin.push(o.value);
    }
    var curmidiin = midiin[0]
    curmidiin.onmidimessage = function(e) {
	var d = e.data;
	if(d.length == 3){
	    var h = d[0] >> 4
	    var note = (d[1]-21) % 24 + 45
	    var velocity = d[2]
	    if(h == 9){ // note on
		for(var s=0;s<9;s++){
		    var id = `${note}-${s}`
		    gain[id].gain.value = keygain(osc[id].frequency.value)
		}
	    }
	    if(h == 8){ // note off
		for(var s=0;s<9;s++){
		    var id = `${note}-${s}`
		    gain[id].gain.value = 0.0
		}
	    }
	}
    }
}
    
function keygain(freq){
    freq = Number(freq)
    var l = (Math.log(freq) - Math.log(220)) / Math.log(2)
    return 1 / 2 ** Math.abs(l)
}

function Start(){
    osc = {}
    gain = {}
    audioctx = new AudioContext();       // AudioContext を作成
    for(var note=45;note<45+24;note++){
	for(var s=0;s<9;s++){
	    var id = `${note}-${s}`
    	    var freq = 220 * (2.0 ** ((note-45) / 12.0))
	    gain[id] = new GainNode(audioctx);
	    gain[id].gain.value = 0.0
	    osc[id] = new OscillatorNode(audioctx);
	    osc[id].frequency.value = freq * (4 ** Number(s)) / 16.0 // + s * 2
	    osc[id].connect(gain[id]).connect(audioctx.destination);
	    osc[id].start();
	}
    }
}
