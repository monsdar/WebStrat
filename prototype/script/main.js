

//global variable which stores the current step
var currentStep = 0;

//Declare some classes to store our code into (OOP in JS baby!)
function Symbol(identifier, name) {
    this.identifier = identifier;
    this.orientation = 0; //DEG, clockwise
    this.name = name;
    this.classes = "";
    
    //get a starting position
    var position = {};
    position.posX = "0px"; //px from left
    position.posY = "0px"; //px from top
    this.positions = new Array();
    this.positions[0] = position; 
};

Symbol.prototype.getHtml = function(step) {
    //get the coords
    var posX = "0px";
    var posY = "0px";
    
    if(step in this.positions) {
        posX = this.positions[step].posX;
        posY = this.positions[step].posY;
    }
    
    var html = "";
    html = html + "<div ";
    html = html + "    class='draggable " + this.classes + "' ";
    html = html + "    style='top: " + posY + "; left: " + posX + "' ";
    html = html + "    id='" + this.identifier + "' ";
    html = html + ">";
    html = html + this.name;
    html = html + "</div>";
    
    return html;
};

Symbol.prototype.setPosition = function(step, posX, posY) {
    var newPosition = {};
    newPosition.posX = posX; //px from left
    newPosition.posY = posY; //px from top
    this.positions[step] = newPosition;
};

Symbol.prototype.getPosX = function(step) {
    while(step >= 0) {
        if(step in this.positions) {
            return this.positions[step].posX;
        }
        step--;
    }
    
    //Fallback if there are no positions saved to return
    return "0px";
};

Symbol.prototype.getPosY = function(step) {
    while(step >= 0) {
        if(step in this.positions) {
            return this.positions[step].posY;
        }
        step--;
    }
    
    //Fallback if there are no positions saved to return
    return "0px";
};

Symbol.prototype.getElement = function() {
    return $("#" + this.identifier);
};

Symbol.prototype.makeDraggable = function() {
    //make the symbols draggable, store values for them
    var symbol = this;
    
    this.getElement().draggable({
        containment: "parent",

        stop: function() {
            var posX = symbol.getElement().css('left');
            var posY = symbol.getElement().css('top');
            symbol.setPosition(currentStep, posX, posY);
            
            console.log(posX + ", " + posY);
        }
    });
};

function Ball(identifier) {
    Symbol.call(this, identifier, "");
    this.classes = "ball";
}
Ball.prototype = new Symbol();
Ball.prototype.constructor = Ball;

function Friend(identifier, name) {
    Symbol.call(this, identifier, name);
    this.classes = "friend player";
}
Friend.prototype = new Symbol();
Friend.prototype.constructor = Friend;

function Opponent(identifier, name) {
    Symbol.call(this, identifier, name);
    this.classes = "opponent player";
}
Opponent.prototype = new Symbol();
Opponent.prototype.constructor = Opponent;

//some global functions which help do certain things
//NOTE: This function uses a <div> of class .court as a parent
var updateSymbols = function(symbols, step) {
    $.each(symbols, function(index, item) {
        var element = item.getElement();
        
        //check if the symbol has been created yet
        //if not, create it
        if( element.length <= 0 ) {
            $(".court").append( item.getHtml(step) );
            item.makeDraggable();
        //if so, animate it to the next position
        } else {
            element.animate(
              {top: item.getPosY(currentStep),
               left: item.getPosX(currentStep)}, 
              200
            );
        }
    });
};

var outputSymbols = function(symbols) {
    var output = JSON.stringify(symbols);
    $("textarea#outputText").val(output);
};

var initSymbols = function() {
    //ball
    var ball = new Ball("ball");
    ball.side = "neutral";
    ball.setPosition(0, "255px", "340px");
    
    //friendly players
    var myplayer1 = new Friend("myplayer1", "PG");
    var myplayer2 = new Friend("myplayer2", "SG");
    var myplayer3 = new Friend("myplayer3", "SF");
    var myplayer4 = new Friend("myplayer4", "PF");
    var myplayer5 = new Friend("myplayer5", "C");
    myplayer1.side = "friendly";
    myplayer2.side = "friendly";
    myplayer3.side = "friendly";
    myplayer4.side = "friendly";
    myplayer5.side = "friendly";
    myplayer1.setPosition(0, "235px", "300px");
    myplayer2.setPosition(0, "80px", "165px");
    myplayer3.setPosition(0, "370px", "140px");
    myplayer4.setPosition(0, "150px", "-120px");
    myplayer5.setPosition(0, "315px", "-155px");
    
    //opponent players
    var oppplayer1 = new Opponent("oppplayer1", "PG");
    var oppplayer2 = new Opponent("oppplayer2", "SG");
    var oppplayer3 = new Opponent("oppplayer3", "SF");
    var oppplayer4 = new Opponent("oppplayer4", "PF");
    var oppplayer5 = new Opponent("oppplayer5", "C");
    oppplayer1.side = "opponent";
    oppplayer2.side = "opponent";
    oppplayer3.side = "opponent";
    oppplayer4.side = "opponent";
    oppplayer5.side = "opponent";
    oppplayer1.setPosition(0, "235px", "90px");
    oppplayer2.setPosition(0, "100px", "-20px");
    oppplayer3.setPosition(0, "350px", "-50px");
    oppplayer4.setPosition(0, "170px", "-270px");
    oppplayer5.setPosition(0, "300px", "-300px");
    
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

var removeSymbols = function() {
    $(".draggable").remove();
};

var makeDraggable = function(symbols) {
    //make the symbols draggable, store values for them
    $( ".draggable" ).draggable({
        containment: "parent",

        stop: function() {
            var identifier = $(this).attr('id');
            $.each(symbols, function(index, item) {
               if( identifier === item.identifier) {
                   var posX = $("#" + identifier).css('left');
                   var posY = $("#" + identifier).css('top');
                   item.setPosition(currentStep, posX, posY);
               }
            });
        }
    });  
};

//And here is our document.ready which sets up the entire thing
$(document).ready(function() {  
    
    //append the items to the court
    var symbols = initSymbols();
    updateSymbols(symbols, currentStep);
    
    //initially disable the 'previous' button
    $('input[name="prevStep"]').attr("disabled", "disabled");
    
    //Set up Event Handlers for the buttons
    $('input[name="prevStep"]').click(function(){
        currentStep--;
        $("h1").text("Step: " + currentStep);
        updateSymbols(symbols, currentStep);
        
        //check if the previous-button has to be disabled
        if(currentStep === 0) {
            $('input[name="prevStep"]').attr("disabled", "disabled");
        } else {
            $('input[name="prevStep"]').removeAttr("disabled");
        }
    });

    $('input[name="nextStep"]').click(function(){
        currentStep++;
        $("h1").text("Step: " + currentStep);    
        updateSymbols(symbols, currentStep);
        
        //enable the previous-button
        $('input[name="prevStep"]').removeAttr("disabled");
    });
    
    $('input[name="output"]').click(function(){
        outputSymbols(symbols);
    });
    
    $('input[name="load"]').click(function(){
        removeSymbols();
        symbols = [];
        var jsonSymbols = jQuery.parseJSON( $("textarea#outputText").val() );
        $.each(jsonSymbols, function(index, jsonItem) {
            if(jsonItem.classes.indexOf("ball") !== -1) {
                var newSymbol = $.extend(new Ball(), jsonItem);
                symbols.push(newSymbol);
            } else if(jsonItem.classes.indexOf("friend") !== -1) {
                var newSymbol = $.extend(new Friend(), jsonItem);
                symbols.push(newSymbol);
            } else if(jsonItem.classes.indexOf("opponent") !== -1) {
                var newSymbol = $.extend(new Opponent(), jsonItem);
                symbols.push(newSymbol);
            }
        });
               
        currentStep = 0;
        updateSymbols(symbols, 0);
    });
});
