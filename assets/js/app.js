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
          getChances('service');
          break;

        case 2:
          profile = pathHash.substring(0,1);
          service = pathHash.substring(1,1);
          break;
      }
      break;
  }
}

function getChances( table ) {
  // get table
  getAPI( "repos/petrosh/rpgit-system/contents/tables/" + table + ".json", callbackChances, 'raw' );
}

function callbackChances() {
  var resp = this.responseText;
  resp = JSON.parse(resp);
  upp = getProfiles( path['username'] + characterName + 'upp', profile );
  var out = {};
  for (var service in resp){
    if (resp.hasOwnProperty(service)) { // service = navy
      var obj = resp[service];
      console.log(upp,service);
      for (var throws in obj){
        if(obj.hasOwnProperty(throws)){ // throws=commission
          var thro = obj[throws]; // thro = { 2d6: "10+", +1: "ss9+" }
          console.log(throws, thro);
          var val = 0;
          for (var tt in thro){
            if(thro.hasOwnProperty(tt)){ // tt = 2d6, +1, ...
              var key = thro[tt]; // key = 10+, ss9+, ...
              if(tt=="2d6"){
                val = key.substring(0,key.length-1);
              }else{
                var att = upp[key.substring(0,2)];
                console.log(key.substring(2,key.length-1));
                if( att >= key.substring(2,key.length-1) ){
                  val += parseInt(tt);
                }
              }
            }
          }
          console.log("chance"+val);
        }
      }
    }
  }
}

function getName() {
  var resp = this.responseText;
  resp = resp.replace(/^\s+|\s+$/g, "");
  if(resp != ''){ // get profiles
    characterName = resp;
    char = getProfiles( path['username'] + characterName + 'upp' );
    var ele = thi( { name: characterName, profiles: char } );
  }else{
    var ele = tname( path );
  }
  document.getElementsByTagName("section")[0].innerHTML = ele;
}

function getProfiles(  ){
  Math.seedrandom( arguments[0] );
  if ( arguments[1] ) {
    for (var p = 0; p < 10; p++) {
      char[p] = { st: die(2), de: die(2), in: die(2), en: die(2), ed: die(2), ss: die(2) };
    }
    return char[arguments[1]];
  }else{
    for (var p = 0; p < 10; p++) {
      char[p] = { st: die(2,1), de: die(2,1), in: die(2,1), en: die(2,1), ed: die(2,1), ss: die(2,1) };
    }
    return char;
  }
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
