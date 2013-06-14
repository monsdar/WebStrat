
function Storage() {
};
Storage.prototype.store = function(symbols) {  
};
Storage.prototype.load = function(URI) {  
};

function PastebinStorage() {
    Storage.call(this);
}
PastebinStorage.prototype = new Storage();
PastebinStorage.prototype.constructor = PastebinStorage;

PastebinStorage.prototype.store = function(symbols) {
    
};
PastebinStorage.prototype.load = function(URI) {
    
};

function Step() {
    this.currentStep = 0;
};
Step.prototype.increaseStep = function() {
    this.currentStep++;
    
    //TODO: How to split between Business logic (this class) and View (HTML element)?
    $("h1").text("Step: " + this.currentStep);
};
Step.prototype.decreaseStep = function() {
    this.currentStep--;
    
    //TODO: How to split between Business logic (this class) and View (HTML element)?
    $("h1").text("Step: " + this.currentStep);
};
Step.prototype.setStep = function(step) {
    this.currentStep = step;
    
    //TODO: How to split between Business logic (this class) and View (HTML element)?
    $("h1").text("Step: " + this.currentStep);
};
Step.prototype.getStep = function() {
    return this.currentStep;
};

//Declare some classes to store our code into (OOP in JS baby!)
function Symbol(identifier, name, step) {
    this.identifier = identifier;
    this.orientation = 0; //DEG, clockwise
    this.name = name;
    this.step = step;
    this.classes = "";
    
    //get a starting position
    var position = {};
    position.posX = "0px"; //px from left
    position.posY = "0px"; //px from top
    this.positions = new Array();
    this.positions[0] = position; 
};

Symbol.prototype.getHtml = function() {
    //get the coords
    var posX = "0px";
    var posY = "0px";
    var currentStep = this.step.getStep();
    
    
    if(currentStep in this.positions) {
        posX = this.positions[currentStep].posX;
        posY = this.positions[currentStep].posY;
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

Symbol.prototype.setPosition = function(posX, posY) {
    var currentStep = this.step.getStep();
    var newPosition = {};
    newPosition.posX = posX; //px from left
    newPosition.posY = posY; //px from top
    this.positions[currentStep] = newPosition;
};

Symbol.prototype.getPosX = function() {
    var currentStep = this.step.getStep();
    
    while(currentStep >= 0) {
        if(currentStep in this.positions && this.positions[currentStep] !== null) {
            return this.positions[currentStep].posX;
        }
        currentStep--;
    }
    
    //Fallback if there are no positions saved to return
    return "0px";
};

Symbol.prototype.getPosY = function() {
    var currentStep = this.step.getStep();
    
    while(currentStep >= 0) {
        if(currentStep in this.positions && this.positions[currentStep] !== null) {
            return this.positions[currentStep].posY;
        }
        currentStep--;
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
            symbol.setPosition(posX, posY);
            
            console.log(posX + ", " + posY);
        }
    });
};

function Ball(identifier, step) {
    Symbol.call(this, identifier, "", step);
    this.classes = "ball";
}
Ball.prototype = new Symbol();
Ball.prototype.constructor = Ball;

function Friend(identifier, name, step) {
    Symbol.call(this, identifier, name, step);
    this.classes = "friend player";
}
Friend.prototype = new Symbol();
Friend.prototype.constructor = Friend;

function Opponent(identifier, name, step) {
    Symbol.call(this, identifier, name, step);
    this.classes = "opponent player";
}
Opponent.prototype = new Symbol();
Opponent.prototype.constructor = Opponent;

//some global functions which help do certain things
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

var outputSymbols = function(symbols) {
    var output = JSON.stringify(symbols);
    $("textarea#outputText").val(output);
};

var initSymbols = function(step) {
    //ball
    var ball = new Ball("ball", step);
    ball.side = "neutral";
    ball.setPosition("255px", "340px");
    
    //friendly players
    var myplayer1 = new Friend("myplayer1", "PG", step);
    var myplayer2 = new Friend("myplayer2", "SG", step);
    var myplayer3 = new Friend("myplayer3", "SF", step);
    var myplayer4 = new Friend("myplayer4", "PF", step);
    var myplayer5 = new Friend("myplayer5", "C", step);
    myplayer1.side = "friendly";
    myplayer2.side = "friendly";
    myplayer3.side = "friendly";
    myplayer4.side = "friendly";
    myplayer5.side = "friendly";
    myplayer1.setPosition("235px", "300px");
    myplayer2.setPosition("80px", "165px");
    myplayer3.setPosition("370px", "140px");
    myplayer4.setPosition("150px", "-120px");
    myplayer5.setPosition("315px", "-155px");
    
    //opponent players
    var oppplayer1 = new Opponent("oppplayer1", "PG", step);
    var oppplayer2 = new Opponent("oppplayer2", "SG", step);
    var oppplayer3 = new Opponent("oppplayer3", "SF", step);
    var oppplayer4 = new Opponent("oppplayer4", "PF", step);
    var oppplayer5 = new Opponent("oppplayer5", "C", step);
    oppplayer1.side = "opponent";
    oppplayer2.side = "opponent";
    oppplayer3.side = "opponent";
    oppplayer4.side = "opponent";
    oppplayer5.side = "opponent";
    oppplayer1.setPosition("235px", "90px");
    oppplayer2.setPosition("100px", "-20px");
    oppplayer3.setPosition("350px", "-50px");
    oppplayer4.setPosition("170px", "-270px");
    oppplayer5.setPosition("300px", "-300px");
    
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
    
    $('input[name="output"]').click(function(){
        outputSymbols(symbols);
    });
    
    $('input[name="load"]').click(function(){
        removeSymbols();
        symbols = [];
        var jsonSymbols = jQuery.parseJSON( $("textarea#outputText").val() );
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
    });
});
