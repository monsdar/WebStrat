
//A friendly player

function Friend(identifier, name, step) {
    Symbol.call(this, identifier, name, step);
    this.classes = "friend player";
}
Friend.prototype = new Symbol();
Friend.prototype.constructor = Friend;
