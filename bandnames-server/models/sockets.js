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
      //Eliminar la banda
      socket.on('delete-banda', (data) =>{
        this.bandList.removeBand(data.id);
        // Emitir a todos los clientes conectado, el listado de las bandas
        this.io.emit('current-bands', this.bandList.getBand());
      });
      //Actualizar nombre de la banda
      socket.on('change-banda', ({id, newName: name}) =>{
        this.bandList.changeNameBand(id, name);
        // Emitir a todos los clientes conectado, el listado de las bandas
        this.io.emit('current-bands', this.bandList.getBand());
      });

    });
  }
}

module.exports = Sockets