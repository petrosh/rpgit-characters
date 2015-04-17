var pathArray = window.location.host.split( '.' );
var pathSlash = window.location.pathname.split( '/' ); // pathSlash[1]
var path = { username: pathArray[0], reponame: 'rpgit-characters' };
var thi = document.getElementById("thi").innerHTML;
var tname = document.getElementById("tname").innerHTML;

init();

function init() {
  // check if name (read character/name.log content)
  // /repos/:owner/:repo/contents/:path
  getAPI( "repos/" + path['username'] + "/" + path['reponame'] + "/contents/character/name.log", renderName, 'raw' );
}

function renderName() {
  var resp = this.responseText;
  var profili = [];
  if(resp != ''){
    Math.seedrandom(resp);
    for (profile = 0; profile < 16; profile++) {
      profili.push({ st: die(2), de: die(2), in: die(2), en: die(2), ed: die(2), ss: die(2) });
    }
    console.log(profili);
    var ele = tim(thi, { name: resp, profiles: profili });
  }else{
    var ele = tim(tname, path);
  }
  document.getElementsByTagName("section")[0].innerHTML = ele;
}

function die(num){
  var out = 0;
  for (var i = 0; i < num; i++) {
    out += Math.floor( Math.random() * 6 );
  }
  return out;
}
