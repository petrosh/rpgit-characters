var pathArray = window.location.host.split( '.' );
var pathSlash = window.location.pathname.split( '/' ); // pathSlash[1]
var pathHash = window.location.hash.substring(1); // Drop #

var path = { username: pathArray[0], reponame: 'rpgit-characters' };

var thi = Handlebars.compile( document.getElementById("thi").innerHTML );
var tname = Handlebars.compile(document.getElementById("tname").innerHTML);
var char = [], characterName = '', profile = '', service = '';

init();

function init() {
  // Hash change
  window.onhashchange = function() {
    window.location.reload();
  }

  // check if name (read character/name.log content)
  // /repos/:owner/:repo/contents/:path
  switch (pathHash == '') {
    case true:
      // get name
      getAPI( "repos/" + path['username'] + "/" + path['reponame'] + "/contents/character/name.log", getName, 'raw' );
      break;

    case false:
      switch (pathHash.length) {
        case 1:
          profile = pathHash;
          enlistmentChances = getChances('service');
          console.log( enlistmentChances );
          break;

        case 2:
          profile = pathHash.substring(0,1);
          service = pathHash.substring(1,1);
          break;
      }
      console.log(profile,service);
      break;
  }
}

function getChances( table ) {
  // get table
  getAPI( "repos/petrosh/rpgit-system/contents/tables/" + table + ".json", Chances, 'raw' );
}

function Chances() {
  var resp = this.responseText;
  console.log(resp);
}

function getName() {
  var resp = this.responseText;
  resp = resp.replace(/^\s+|\s+$/g, "");
  if(resp != ''){ // get profiles
    characterName = resp;
    Math.seedrandom( path['username'] + characterName + 'upp' );
    for (var p = 1; p <= 10; p++) {
      // out += tim(profile, { i: p, st: die(2,1), de: die(2,1), in: die(2,1), en: die(2,1), ed: die(2,1), ss: die(2,1) } );
      char[p] = { st: die(2,1), de: die(2,1), in: die(2,1), en: die(2,1), ed: die(2,1), ss: die(2,1) };
    }
    console.log( char );
    var ele = thi( { name: characterName, profiles: char } );
  }else{
    var ele = tname( path );
  }
  document.getElementsByTagName("section")[0].innerHTML = ele;
}

function die( ){
  var out = 0;
  for (var i = 0; i < arguments[0]; i++) {
    out += Math.floor( Math.random() * 6 ) + 1;
  }
  outhex = out.toString(16).toUpperCase();
  if(arguments[1])out = outhex;
  return out;
}
