function Character () {

  this.username         = window.location.host.split('.')[0];
  this.reponame         = window.location.pathname.split('/')[1];
  this.seed             = this.username + this.reponame;

  this.setup();

}

Character.prototype.upp = function () {
  return this.name();
};

Character.prototype.name = function () {
  var url = "https://cdn.rawgit.com/" + this.username + "/" + this.reponame + "/v0.1/character/name.txt";
  return url;
};

Character.prototype.setup = function () {
  console.log( this );
};

var player = new Character();
