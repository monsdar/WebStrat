

//A step stores the state of the strategy

function Step() {
    this.currentStep = 0;
};
Step.prototype.increaseStep = function() {
    this.currentStep++;
    
    //TODO: How to split between Business logic (this class) and View (HTML element)?
    $("#title").text("WebStrat - Step: " + this.currentStep);
};
Step.prototype.decreaseStep = function() {
    this.currentStep--;
    
    //TODO: How to split between Business logic (this class) and View (HTML element)?
    $("#title").text("WebStrat - Step: " + this.currentStep);
};
Step.prototype.setStep = function(step) {
    this.currentStep = step;
    
    //TODO: How to split between Business logic (this class) and View (HTML element)?
    $("#title").text("WebStrat - Step: " + this.currentStep);
};
Step.prototype.getStep = function() {
    return this.currentStep;
};

