

//The Symbol class is used to create draggable objects for players and the ball


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
    
    symbol.getElement().draggable({
        containment: "parent",

        stop: function() {
            var posX = symbol.getElement().css('left');
            var posY = symbol.getElement().css('top');
            symbol.setPosition(posX, posY);
        }
    });
};
