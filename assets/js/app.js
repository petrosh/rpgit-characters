var pathArray = window.location.host.split( '.' );
var pathSlash = window.location.pathname.split( '/' ); // pathSlash[1]
var pathHash = window.location.hash.substring(1); // Drop #
var path = { username: pathArray[0], reponame: 'rpgit-characters' };
var thi = document.getElementById("thi").innerHTML;
var tname = document.getElementById("tname").innerHTML;
var profile = document.getElementById("profile").innerHTML;

init();

function init() {
  // Hash change
  window.onhashchange = function() {
    window.location.reload();
  }

  // check if name (read character/name.log content)
  // /repos/:owner/:repo/contents/:path
  if ( pathHash == '' ) {
    getAPI( "repos/" + path['username'] + "/" + path['reponame'] + "/contents/character/name.log", renderName, 'raw' );
  }else{
    console.log('vai con ' + pathHash );
  }
}

function renderName() {
  var resp = this.responseText;
  resp = resp.replace(/^\s+|\s+$/g, "");
  var out = '';
  if(resp != ''){
    Math.seedrandom(resp);
    for (var p = 1; p <= 10; p++) {
      out += tim(profile, { i: p, st: die(2,1), de: die(2), in: die(2), en: die(2), ed: die(2), ss: die(2) } );
    }
    console.log({ name: resp, profiles: out });
    var ele = tim(thi, { name: resp, profiles: out });
  }else{
    var ele = tim(tname, path);
  }
  document.getElementsByTagName("section")[0].innerHTML = ele;
}

function die( ){
  var out = 0;
  for (var i = 0; i < arguments[0]; i++) {
    out += Math.floor( 1 + Math.random() * 6 );
  }
  outhex = out.toString(16).toUpperCase();
  if(arguments[1])out = outhex;
  return out;
}
