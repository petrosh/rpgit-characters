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
  var upp = [];
  if(resp != ''){
    Math.seedrandom(resp);
    for (var p = 0; p < 16; p++) {
      upp.push( { ciao: die(2) } );
    }
    var ele = tim(thi, {fruit:[
  { name:"apples",  colour:"green"  },
  { name:"oranges", colour:"orange" },
  { name:"bananas", colour:"yellow" }
], name: resp, profiles: upp });
  }else{
    var ele = tim(tname, path);
  }
  document.getElementsByTagName("section")[0].innerHTML = ele;
}

function die(num){
  var out = 0;
  for (var i = 0; i < num; i++) {
    out += Math.floor( 1 + Math.random() * 6 );
  }
  return out;
}
