

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

//init some symbols to create a usable interface
var initSymbols = function(step) {
    //ball
    var ball = new Ball("ball", step);
    ball.side = "neutral";
    ball.setPosition("285px", "340px");
    
    //friendly players
    var myplayer1 = new Friend("myplayer1", "1", step);
    var myplayer2 = new Friend("myplayer2", "2", step);
    var myplayer3 = new Friend("myplayer3", "3", step);
    var myplayer4 = new Friend("myplayer4", "4", step);
    var myplayer5 = new Friend("myplayer5", "5", step);
    myplayer1.side = "friendly";
    myplayer2.side = "friendly";
    myplayer3.side = "friendly";
    myplayer4.side = "friendly";
    myplayer5.side = "friendly";
    myplayer1.setPosition("265px", "300px");
    myplayer2.setPosition("110px", "165px");
    myplayer3.setPosition("400px", "140px");
    myplayer4.setPosition("180px", "-120px");
    myplayer5.setPosition("345px", "-155px");
    
    //opponent players
    var oppplayer1 = new Opponent("oppplayer1", "1", step);
    var oppplayer2 = new Opponent("oppplayer2", "2", step);
    var oppplayer3 = new Opponent("oppplayer3", "3", step);
    var oppplayer4 = new Opponent("oppplayer4", "4", step);
    var oppplayer5 = new Opponent("oppplayer5", "5", step);
    oppplayer1.side = "opponent";
    oppplayer2.side = "opponent";
    oppplayer3.side = "opponent";
    oppplayer4.side = "opponent";
    oppplayer5.side = "opponent";
    oppplayer1.setPosition("265px", "90px");
    oppplayer2.setPosition("130px", "-20px");
    oppplayer3.setPosition("380px", "-50px");
    oppplayer4.setPosition("200px", "-270px");
    oppplayer5.setPosition("330px", "-300px");
    
    //put every Symbol into a symbol-list
    var symbols = new Array();
    symbols.push(ball);
    symbols.push(myplayer1);
    symbols.push(myplayer2);
    symbols.push(myplayer3);
    symbols.push(myplayer4);
    symbols.push(myplayer5);
    symbols.push(oppplayer1);
    symbols.push(oppplayer2);
    symbols.push(oppplayer3);
    symbols.push(oppplayer4);
    symbols.push(oppplayer5);
        
    return symbols;
};

//removes all the symbols
var removeSymbols = function() {
    $(".draggable").remove();
};

//And here is our document.ready which sets up the entire thing
$(document).ready(function() {    
    //create the step
    var step = new Step();
    
    //append the items to the court
    var symbols = initSymbols(step);
    updateSymbols(symbols);
    
    //initially disable the 'previous' button
    $('input[name="prevStep"]').attr("disabled", "disabled");
    
    //Set up Event Handlers for the buttons
    $('input[name="prevStep"]').click(function(){
        step.decreaseStep();
        updateSymbols(symbols);
        
        //check if the previous-button has to be disabled
        if(step.getStep() === 0) {
            $('input[name="prevStep"]').attr("disabled", "disabled");
        } else {
            $('input[name="prevStep"]').removeAttr("disabled");
        }
    });

    $('input[name="nextStep"]').click(function(){
        step.increaseStep();  
        updateSymbols(symbols);
        
        //enable the previous-button
        $('input[name="prevStep"]').removeAttr("disabled");
    });
    
    $('input[name="save"]').click(function(){
        var apikey = $("#apikey").val();
        var json = JSON.stringify(symbols);
        
        //create a callback that works with the result
        var callback = function(data) {
            $("#handle").val(data);
        };
        
        //create a storage
        var storage = new PastebinStorage();
        storage.store(apikey, json, callback);
    });
    
    $('input[name="load"]').click(function(){
        removeSymbols();
        symbols = [];
        
        //create the callback which is called as soon as the data is received
        var callback = function(data) {
            var jsonSymbols = jQuery.parseJSON( data );      
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
                symbols.push(newSymbol);
            });

            step.setStep(0);
            updateSymbols(symbols);
        };
        
        //create a Pastebin storage to load data from
        //then load the json-data
        var storage = new PastebinStorage();
        var handle = $("#handle").val();
        storage.load(handle, callback);
    });
});
