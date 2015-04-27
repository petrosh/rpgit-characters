function Character () {

  this.username         = window.location.host.split('.')[0];
  this.reponame         = window.location.pathname.split('/')[1];
  this.seed             = this.username + this.reponame;

  return this;
}

Character.prototype.upp = function () {
  return this.url;
};

Character.prototype.name = function () {
  var url = "https://cdn.rawgit.com/" + this.username + "/" + this.reponame + "/v0.1/character/name.txt";
  return url;
};
