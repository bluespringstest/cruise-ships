(function exportPort(){
    class Port{
    constructor(name, ships){
        this.name = name;
        this.ships = [];
    }
    addShip(ship) {
        this.ships.push(ship);
    }
    removeShip() {
        this.ships.pop();
       }
    };
if (typeof module !== 'undefined' && module.exports){
module.exports = Port;
} else {
    window.Port = Port;
}
}());