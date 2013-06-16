

//A step stores the state of the strategy

function Step() {
    this.currentStep = 0;
};
Step.prototype.increaseStep = function() {
    this.currentStep++;
};
Step.prototype.decreaseStep = function() {
    this.currentStep--;
};
Step.prototype.setStep = function(step) {
    this.currentStep = step;
};
Step.prototype.getStep = function() {
    return this.currentStep;
};

