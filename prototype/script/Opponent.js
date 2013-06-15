

//A player from the opposing team


function Opponent(identifier, name, step) {
    Symbol.call(this, identifier, name, step);
    this.classes = "opponent player";
}
Opponent.prototype = new Symbol();
Opponent.prototype.constructor = Opponent;
