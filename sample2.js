$(function() {
    $('<button>').on('click',Play).text('play').appendTo($('body'));
});
function Play() {
    audioctx = new AudioContext();
    osc = new OscillatorNode(audioctx);
    gain = new GainNode(audioctx);
    gain.gain.value = 1.0
    osc.connect(gain).connect(audioctx.destination); // これが動かない... なんで?
    //osc.connect(audioctx.destination);  // こちらは動く
    osc.start();
}
