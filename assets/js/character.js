function Character () {

  //this.username         = window.location.host.split('.')[0];
  this.username         = 'petrosh';
  // this.reponame         = window.location.pathname.split('/')[1];
  this.reponame         = 'rpgit-characters';
  this.seed             = this.username + this.reponame;
  this.expiration       = 5; // in minutes

  this.getName();

}

Character.prototype.getName = function () {
  var self = this;
  if( sessionStorage.getItem('name') === null || sessionStorage.getItem('name-timestamp') === null ){
    getFile(self);
  }else{
    var diff = sessionStorage.getItem('name-timestamp') - new Date().getTime(); // diff = milliseconds to Sha expiration
    if( diff < 0 ){
      getFile(self);
    }else{
      self.name = sessionStorage.getItem('name');
    }
  }
};
