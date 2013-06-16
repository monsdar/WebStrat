
//This implementation of Storage compresses the input data and returns it (no storage performed)

function ArchiveStorage() {
    Storage.call(this);
}
ArchiveStorage.prototype = new Storage();
ArchiveStorage.prototype.constructor = ArchiveStorage;

ArchiveStorage.prototype.store = function(data, callback) {
    var compressed = LZString.compressToUTF16(data);
    console.log("Size of compressed sample is: " + compressed.length);
    
    callback(compressed);
};
ArchiveStorage.prototype.load = function(data, callback) {
    var decompressedData = LZString.decompressFromUTF16(data);
    callback(decompressedData);
};

