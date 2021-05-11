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
      
      //Votar por la banda
      socket.on('votar-banda', (data) =>{
        this.bandList.increaseVote(data.id);
        // Emitir a todos los clientes conectado, el listado de las bandas
        this.io.emit('current-bands', this.bandList.getBand());
      })
    });
  }
}

module.exports = Sockets