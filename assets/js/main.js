function Character () {

  this.username         = window.location.host.split('.')[0];
  this.reponame         = window.location.pathname.split('/')[1];
  this.seed             = this.username + this.reponame;

}

Character.prototype.upp = function () {
  return this.name();
};

Character.prototype.name = function () {
  var url = "https://cdn.rawgit.com/" + this.username + "/" + this.reponame + "/v0.1/character/name.txt";
  var name = getFile(url);
  return name;
};

function getFile(url) {
  var xhr = new XMLHttpRequest();
  xhr.open ("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) return xhr.responseText;
    if (xhr.readyState == 4 && xhr.status == 404) return url + " not found";
  };
  xhr.send();
}

var player = new Character();
