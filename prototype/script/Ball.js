
//The ball is a Symbol visualizing the basketball


function Ball(identifier, step) {
    Symbol.call(this, identifier, "", step);
    this.classes = "ball";
}
Ball.prototype = new Symbol();
Ball.prototype.constructor = Ball;
