
//This implementation of Storage uses console.log to output data

function ConsoleStorage() {
    Storage.call(this);
}
ConsoleStorage.prototype = new Storage();
ConsoleStorage.prototype.constructor = ConsoleStorage;

ConsoleStorage.prototype.store = function(data, callback) {
    console.log(data);
    callback("ConsoleStorage");
};
ConsoleStorage.prototype.load = function(data, callback) {
    callback('{"name":"Example Strategy","symbols":[{"identifier":"ball","orientation":0,"name":"","step":{"currentStep":0},"classes":"ball","positions":[{"posX":"285px","posY":"340px"}],"side":"neutral"},{"identifier":"myplayer1","orientation":0,"name":"1","step":{"currentStep":0},"classes":"friend player","positions":[{"posX":"265px","posY":"300px"}],"side":"friendly"},{"identifier":"myplayer2","orientation":0,"name":"2","step":{"currentStep":0},"classes":"friend player","positions":[{"posX":"110px","posY":"165px"}],"side":"friendly"},{"identifier":"myplayer3","orientation":0,"name":"3","step":{"currentStep":0},"classes":"friend player","positions":[{"posX":"400px","posY":"140px"}],"side":"friendly"},{"identifier":"myplayer4","orientation":0,"name":"4","step":{"currentStep":0},"classes":"friend player","positions":[{"posX":"180px","posY":"-120px"}],"side":"friendly"},{"identifier":"myplayer5","orientation":0,"name":"5","step":{"currentStep":0},"classes":"friend player","positions":[{"posX":"345px","posY":"-155px"}],"side":"friendly"},{"identifier":"oppplayer1","orientation":0,"name":"1","step":{"currentStep":0},"classes":"opponent player","positions":[{"posX":"265px","posY":"90px"}],"side":"opponent"},{"identifier":"oppplayer2","orientation":0,"name":"2","step":{"currentStep":0},"classes":"opponent player","positions":[{"posX":"130px","posY":"-20px"}],"side":"opponent"},{"identifier":"oppplayer3","orientation":0,"name":"3","step":{"currentStep":0},"classes":"opponent player","positions":[{"posX":"380px","posY":"-50px"}],"side":"opponent"},{"identifier":"oppplayer4","orientation":0,"name":"4","step":{"currentStep":0},"classes":"opponent player","positions":[{"posX":"200px","posY":"-270px"}],"side":"opponent"},{"identifier":"oppplayer5","orientation":0,"name":"5","step":{"currentStep":0},"classes":"opponent player","positions":[{"posX":"330px","posY":"-300px"}],"side":"opponent"}],"notes":[]}');
};

