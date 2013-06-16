
//This implementation of Storage uses Pastebin.com to store data
//It uses a PHP server-side script as a proxy
//The store-function needs an additional apikey

function PastebinStorage() {
    Storage.call(this);
}
PastebinStorage.prototype = new Storage();
PastebinStorage.prototype.constructor = PastebinStorage;

PastebinStorage.prototype.store = function(apikey, data, callback) {
    $.get("PastebinProxy.php", {type: "save", api: apikey, data: data}, function(returnedData) {
        //trim the received data
        returnedData = returnedData.replace(/(\r\n|\n|\r)/gm,"");
                
        //check if there were errors during saving
        if( returnedData.length !== 28 ) {
            //TODO: How to handle the error?
            console.log("Received an error: " + returnedData);
            callback("ERROR");
            return;
        }
        
        //trim the received data, remove the URL
        var handle = returnedData.substring(20, returnedData.length);
        callback(handle);
    });
};
PastebinStorage.prototype.load = function(URI, callback) {
    $.get("PastebinProxy.php", {type: "load", pasteId: URI}, function(data) {
        //trim the received data
        data = data.replace(/(\r\n|\n|\r)/gm,"");
        
        //if the data is empty, just don't call the callback...
        if(data === "") {
            console.log("Received empty data");
            return;
        }
        
        callback(data);
    });
};

