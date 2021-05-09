const BandList = require('./band-list');

class Sockets {
  constructor(io){
    this.io = io;
    this.bandList =  new BandList
    this.socketEvents();
  }
  socketEvents(){
    // On connection
    this.io.on('connection', (socket) => { 
      console.log('Cliente conectado');

      // Emitir al cliente conectado, todas las bandas
      socket.emit('current-bands', this.bandList.getBand());
      
    });
  }
}

module.exports = Sockets