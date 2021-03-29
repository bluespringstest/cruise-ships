(function exportController(){
    function Controller(ship){
        this.ship = ship,
        this.initialiseSea();
        this.go = document.querySelector('#sailbutton').addEventListener
        ('click', () => {
            this.setSail();
        });
    }
    Controller.prototype.initialiseSea = function initialiseSea(){
        const backgrounds = [
            '../cruise-ships-gui/images/water0.png',
            '../cruise-ships-gui/images/water1.png',
        ];
        let backgroundIndex = 0;
        window.setInterval(() => {
            document.querySelector('#viewport').style.backgroundImage =
            `url('${backgrounds[backgroundIndex % backgrounds.length]}')`;
            backgroundIndex += 1;
        }, 1000);
    };
    Controller.prototype.hud = function (nMessage, qMessage){
        viewElement = document.querySelector('p');
        viewElement2 = document.querySelector('q');
        viewElement.innerHTML = nMessage;
        viewElement2.innerHTML = qMessage;
    }

    Controller.prototype.renderMessage = function (message){
        newMessage = document.createElement('div');
        newMessage.id = 'message';
        newMessage.innerHTML = message;
        viewElement = document.querySelector('#viewport');
        viewElement.appendChild(newMessage);
        setTimeout(() => {
            viewport.removeChild(newMessage);
        }, 2000)
    };
    Controller.prototype.renderPorts = function renderPorts(ports){
        const portsElement = document.querySelector('#ports');
        portsElement.style.width = '0px';
        ports.forEach((port, index) => {
            const newPortElement = document.createElement('div');
            newPortElement.className = 'port';
            newPortElement.dataset.portName = port.name;
            newPortElement.dataset.portIndex = index;
            portsElement.appendChild(newPortElement);
            const portsElementWidth = parseInt(portsElement.style.width, 10);
            portsElement.style.width = `${portsElementWidth + 256}px`;
        });
    };
    Controller.prototype.renderShip = function renderShip(){
        const ship = this.ship;
        const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const nextPortIndex = shipPortIndex + 1;
        const nextPort = ship.itinerary.ports[nextPortIndex];
        const portElement = document.querySelector(`[data-port-index='${shipPortIndex}']`);
        const shipElement = document.querySelector('#ship');
        shipElement.style.top = `${portElement.offsetTop + 32}px`;
        shipElement.style.left = `${portElement.offsetLeft - 100}px`;
        this.hud(`Current Port: ${ship.currentPort.name}`, `Next Port: ${nextPort.name}`);
    }
    Controller.prototype.setSail = function () {
        const ship = this.ship
        const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const nextPortIndex = currentPortIndex + 1;
        const nextPortElement = document.querySelector(`[data-port-index='${nextPortIndex}']`);
        if(!nextPortElement) {
            this.renderMessage(`${ship.currentPort.name} is the end of the line`);
            stopShip();
        };
        this.renderMessage(`Now departing ${ship.currentPort.name}`);
        const shipElement = document.querySelector('#ship');
        const nextPort = ship.itinerary.ports[nextPortIndex + 1];
        const sailInterval = setInterval(() => {
            const shipLeft = parseInt(shipElement.style.left, 10);
          /* if (!nextPortElement){
               stopShip();
               return alert('End of the line!');
           }*/
           //the code below allows us to act almost like a console log and function
           //rolled into 1. we use (``) to open and close the statement,
           //inside we add what we want console logged out
           //we then seperate any calls to functions using ${methods}
           //this.renderMessage(`Now departing ${ship.currentPort.name}`);
            if (shipLeft === (nextPortElement.offsetLeft - 80)) {
                ship.setSail();
                ship.dock();
                this.renderMessage(`Now docking in ${ship.currentPort.name}`);
                this.hud(`Current Port: ${ship.currentPort.name}`, `Next Port: ${nextPort.name}`);
                console.log(this.hud);
                clearInterval(sailInterval);
            }
            shipElement.style.left = `${shipLeft + 1}px`;
        }, 20);
        function stopShip() {
            clearInterval(sailInterval);
        }
        /*this.newPorts = document.querySelector('form');
        this.newPorts.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(document.querySelector('form'))
            for (let pair of formData.entries())
            newPort =  document.querySelector('#ports');
            const newPortElement = document.createElement('div');
            newPortElement.className = 'port';
            newPortElement.dataset.portName = port.name = pair[1];
            newPortElement.dataset.portIndex = index;
            newPort.appendChild(newPortElement);
            {
                console.log(pair[1]);
            }
            console.log("Cancel success");
        })*/
    }
    if (typeof module !== 'undefined' && module.exports){
        module.exports = Controller;
        } else {
            window.Controller = Controller;
        }
        }());