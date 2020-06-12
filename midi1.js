$(function() {

});


/**
 * @param {MIDIAccess} midiAccess
 */
var successCallback = function(midiAccess) {
    console.log("midi")
};
/**
 * @param {DOMException} error
 */
var errorCallback = function(error) {
    // do something ....
};

navigator.requestMIDIAccess({sysex : true}).then(successCallback, errorCallback);

