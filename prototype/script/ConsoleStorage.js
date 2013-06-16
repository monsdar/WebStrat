
//This implementation of Storage uses console.log to output data

function ConsoleStorage() {
    Storage.call(this);
}
ConsoleStorage.prototype = new Storage();
ConsoleStorage.prototype.constructor = ConsoleStorage;

ConsoleStorage.prototype.store = function(data, callback) {
    callback(data);
};
ConsoleStorage.prototype.load = function(data, callback) {
    callback("");
};

