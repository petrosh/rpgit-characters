var pathArray = window.location.host.split( '.' );
var pathSlash = window.location.pathname.split( '/' ); // pathSlash[1]
var path = { 'username': pathArray[0], 'reponame': 'rpgit-characters' };
var link = document.getElementById('editName');
var title = document.getElementById('pageTitle');

init();

function init() {
  // check if name (read character/name.log content)
  // /repos/:owner/:repo/contents/:path
  link.href = "https://github.com/" + path['username'] + "/rpgit-characters/edit/gh-pages/character/name.log";
  getAPI( "repos/" + path['username'] + "/" + path['reponame'] + "/contents/character/name.log", renderName );
}

function renderName() {
  var resp = JSON.parse(this.responseText);
  if(resp.content != ''){
    title.text = "Ciao " + resp.content;
  }
}
