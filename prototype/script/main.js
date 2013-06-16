

//---------------
//some global functions which help do certain things
//---------------

//NOTE: This function uses a <div> of class .court as a parent
var updateSymbols = function(symbols) {
    $.each(symbols, function(index, item) {
        var element = item.getElement();
        
        //check if the symbol has been created yet
        //if not, create it
        if( element.length <= 0 ) {
            $(".court").append( item.getHtml() );
            item.makeDraggable();
        //if so, animate it to the next position
        } else {
            element.animate(
              {top: item.getPosY(),
               left: item.getPosX()}, 
              200
            );
        }
    });
};

var updateTitle = function(title) {
    $("#title").text("WebStrat - " + title);
};

//removes all the symbols
var removeSymbols = function() {
    $(".draggable").remove();
};

//And here is our document.ready which sets up the entire thing
$( document ).delegate("#mainpage", "pageinit", function() {
    
    //create the step
    var step = new Step();
    var strategy = new Strategy();
    strategy.initSymbols(step);
    
    //append the items to the court
    updateSymbols(strategy.symbols);
    updateTitle(strategy.name);
    
    //initially disable the 'previous' button
    $("#prevStep").addClass('ui-disabled');
    
    //Set up Event Handlers for the buttons
    $("#prevStep").click(function(){
        step.decreaseStep();
        updateSymbols(strategy.symbols);
        
        //check if the previous-button has to be disabled
        if(step.getStep() === 0) {
            $("#prevStep").addClass('ui-disabled');
        } else {
            $("#prevStep").removeClass('ui-disabled');
        }
    });

    $("#nextStep").click(function(){
        step.increaseStep();
        updateSymbols(strategy.symbols);
        
        //enable the previous-button
        $("#prevStep").removeClass('ui-disabled');
    });
    
    $("#save").click(function(){
        var json = JSON.stringify(strategy);
        
        //create a callback that works with the result
        var callback = function(data) {
            if(data !== "ERROR") {
                $("#strategyInput").val(data);
                $("#strategyOutput").text(data);
            } else {
                $("#strategyInput").val("");
                $("#strategyOutput").text("There was an error, cannot store your data...");
            }
        };
        
        //create a storage
        var storage = new ArchiveStorage();
        storage.store(json, callback);
    });
    
    $("#load").click(function(){
        removeSymbols();
        
        //create the callback which is called as soon as the data is received
        var callback = function(data) {
            //we need to convert from a JSON Object to our special classes
            //first get the Strategy-object
            var jsonStrategy = jQuery.parseJSON( data );
            strategy = $.extend(new Strategy(), jsonStrategy);
            
            //then revamp the Symbols
            var jsonSymbols = strategy.symbols;
            strategy.symbols = new Array();
            $.each(jsonSymbols, function(index, jsonItem) {
                var newSymbol;

                //init the symbol with its right childclass
                //TODO: Is there a way to do this automatically?
                if(jsonItem.classes.indexOf("ball") !== -1) {
                    var newSymbol = $.extend(new Ball(), jsonItem);
                } else if(jsonItem.classes.indexOf("friend") !== -1) {
                    var newSymbol = $.extend(new Friend(), jsonItem);
                } else if(jsonItem.classes.indexOf("opponent") !== -1) {
                    var newSymbol = $.extend(new Opponent(), jsonItem);
                }

                newSymbol.step = step;
                strategy.symbols.push(newSymbol);
            });

            step.setStep(0);
            updateSymbols(strategy.symbols);
            updateTitle(strategy.name);
        };
        
        //create a Pastebin storage to load data from
        var storage = new ArchiveStorage();
        var input = $("#strategyInput").val();
        storage.load(input, callback);
    });
});
