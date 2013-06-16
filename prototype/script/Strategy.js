
//The Strategy class contains all information about a certain strategy

function Strategy() {
    this.name = "New Strategy";
    this.symbols = new Array();
    this.notes = new Array();
};

Strategy.prototype.initSymbols = function(step) {
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
    this.symbols.push(ball);
    this.symbols.push(myplayer1);
    this.symbols.push(myplayer2);
    this.symbols.push(myplayer3);
    this.symbols.push(myplayer4);
    this.symbols.push(myplayer5);
    this.symbols.push(oppplayer1);
    this.symbols.push(oppplayer2);
    this.symbols.push(oppplayer3);
    this.symbols.push(oppplayer4);
    this.symbols.push(oppplayer5);
};
