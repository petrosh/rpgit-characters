var pathArray = window.location.host.split( '.' );
var pathSlash = window.location.pathname.split( '/' ); // pathSlash[1]
var pathHash = window.location.hash.substring(1); // Drop #
var path = { username: pathArray[0], reponame: 'rpgit-characters' };
var thi = document.getElementById("thi").innerHTML;
var tname = document.getElementById("tname").innerHTML;
var profile = document.getElementById("profile").innerHTML;
var char = [];
var characterName = '';

init();

function init() {
  // Hash change
  window.onhashchange = function() {
    window.location.reload();
  }

  // get name
  getAPI( "repos/" + path['username'] + "/" + path['reponame'] + "/contents/character/name.log", getName, 'raw' );

  // check if name (read character/name.log content)
  // /repos/:owner/:repo/contents/:path
  if ( pathHash == '' ) { // choose profile
    if(characterName != ''){ // get profiles
      Math.seedrandom( path['username'] + characterName + 'upp' );
      for (var p = 1; p <= 10; p++) {
        // out += tim(profile, { i: p, st: die(2,1), de: die(2,1), in: die(2,1), en: die(2,1), ed: die(2,1), ss: die(2,1) } );
        char[p].push([ die(2,1), die(2,1), die(2,1), die(2,1), die(2,1), die(2,1), ])
      }
      console.log( char );
      //var ele = tim(thi, { name: resp, profiles: out });
    }else{
      var ele = tim(tname, path);
    }
  }else{
    if( pathHash.length == 1 )
    // choose service (odds)
    Math.seedrandom( path['username'] + characterName + 'term1' );
    var career = goTable('services');
    console.log(career);
    // ele = tim(tt1, { profile: pathHash } );
    // document.getElementsByTagName("section")[0].innerHTML = ele;
  }
}

function goTable( table ) {
  // get table
  getAPI( "repos/petrosh/rpgit-system/contents/tables/" + table + ".json", getTable, 'full' );
}

function getTable() {
  var resp = this.responseText;
  console.log(resp);
}

function getName() {
  var resp = this.responseText;
  resp = resp.replace(/^\s+|\s+$/g, "");
  if(resp != '') {
    characterName = resp;
  }
}

function renderName() {
  var resp = this.responseText;
  resp = resp.replace(/^\s+|\s+$/g, "");
  var out = '';
  if(resp != ''){
    Math.seedrandom( path['username'] + resp + 'upp' );
    for (var p = 1; p <= 10; p++) {
      out += tim(profile, { i: p, st: die(2,1), de: die(2,1), in: die(2,1), en: die(2,1), ed: die(2,1), ss: die(2,1) } );
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
    out += Math.floor( Math.random() * 6 ) + 1;
  }
  outhex = out.toString(16).toUpperCase();
  if(arguments[1])out = outhex;
  return out;
}
