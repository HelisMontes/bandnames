const Band = require('./band');

class BandList{
  constructor(){
    this.bands = [
      new Band('Metallica'),
      new Band('Linkin Park'), 
      new Band('Imagine Dragons'), 
      new Band('Twenty One Pilots')
    ];
  }
  addBand(name){
     const newBand = new Band(name);
     this.bands.push(newBand);
     return this.bands;
  }
  removeBand(id){
     this.bands = this.bands.filter(band => band.id !== id);
  }
  getBand(){
    return this.bands;
  }
  increaseVote(id){
    this.bands = this.bands.map(band => (
      (band.id === id)
        ? band.votes += 1
        : band
    ));
  }
  changeNameBand(id, nameNew){
    this.bands = this.bands.map(band => (
      (band.id === id)
        ? band.name = nameNew
        : band
    ));
  }
}

module.exports = BandList