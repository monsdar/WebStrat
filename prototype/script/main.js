

//---------------
//some global functions which help do certain things
//---------------

//Step and Strategy which this application uses
var step = new Step();
var strategy = new Strategy();

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

var updateNote = function(notes, step) {
    var currentStep = step.getStep();
    while(currentStep >= 0) {
        if(currentStep in notes && notes[currentStep] !== null) {
            $("#notes").html(notes[currentStep]);
            return;
        }
        currentStep--;
    }
    
    //Fallback if there are no positions saved to return
    $("#notes").html("");
};

var updateTitle = function(title) {
    $("#pagetitle").text("WebStrat - " + title);
    $("#title").text(title);
};

//removes all the symbols
var removeSymbols = function() {
    $(".draggable").remove();
};

var loadStrategy = function(input) {
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
        updateNote(strategy.notes, step);
        updateTitle(strategy.name);
    };

    //check which storage to use
    if(input.length === 8) {
        var storage = new PastebinStorage();
        storage.load(input, callback);
    } else {
        //use Archive-storage as a fallback
        var storage = new ArchiveStorage();
        storage.load(input, callback);
    }
};


//And here is our document.ready which sets up the entire thing
$( document ).delegate("#mainpage", "pageinit", function() {
    
    //make the title and notes-field editable
    var changeNote = function(value, settings) {
        strategy.notes[step.getStep()] = value;
        return value;
    };
    $('#notes').editable(changeNote, 
    { 
        type      : 'textarea',
        submit    : 'OK'
    });
    
    var changeTitle = function(value, settings) {
        $("#pagetitle").text("WebStrat - " + value);
        strategy.name = value;
        return value;
    };
    $('#title').editable(changeTitle, 
    { 
        type      : 'text',
        submit    : 'OK'
    });
    
    
    //initially disable the 'previous' button
    $("#prevStep").addClass('ui-disabled');
    
    //Set up Event Handlers for the buttons
    $("#prevStep").click(function(){
        step.decreaseStep();
        updateNote(strategy.notes, step);
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
        updateNote(strategy.notes, step);
        updateSymbols(strategy.symbols);
        
        //enable the previous-button
        $("#prevStep").removeClass('ui-disabled');
    });
    
    $("#save").click(function(){
        var json = JSON.stringify(strategy);
        
        //create a callback that works with the result
        var callback = function(data) {
            $("#strategyInput").val(data);
            $("#strategyOutput").text(data);
        };
        
        //create a storage
        var storage = new ConsoleStorage();
        storage.store(json, callback);
    });
    
    $("#load").click(function(){
        var input = $("#strategyInput").val();
        loadStrategy(input);
    });
    
    //check if a new strategy should be created or to load one via URL
    var input = $.url().param('pastebin');
    if( input === undefined ) {
        strategy.initSymbols(step);
        strategy.initNotes();
        
        updateSymbols(strategy.symbols);
        updateNote(strategy.notes, step);
        updateTitle(strategy.name);
    } else {
        loadStrategy(input);
    }
});
