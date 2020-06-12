// 福野氏の記事 https://fukuno.jig.jp/1868

$(function() {
    midiStart()
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
	    var note = d[1]
	    var velocity = d[2]
	    if(h == 9){ // note on
		console.log(note)
	    }
	    if(h == 8){ // note off
	    }
	}
    }
}
    

