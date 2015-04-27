function Character () {

  this.username         = window.location.host.split('.')[0];
  this.reponame         = window.location.pathname.split('/')[1];
  this.seed             = this.username + this.reponame;

  this.setup();

}

Character.prototype = {
  name : function () {
    return "https://cdn.rawgit.com/" + this.username + "/" + this.reponame + "/v0.1/character/name.txt";
  }
};

Character.prototype.setup = function () {

  var url = "https://cdn.rawgit.com/" + this.username + "/" + this.reponame + "/v0.1/character/name.txt";
  var xhr = new XMLHttpRequest();
  xhr.open ("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) return xhr.responseText;
    if (xhr.readyState == 4 && xhr.status == 404) return url + " not found";
  };
  xhr.send();
};

var player = new Character();
console.log(player);
