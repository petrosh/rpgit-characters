var pathArray = window.location.host.split( '.' );
var pathSlash = window.location.pathname.split( '/' ); // pathSlash[1]
var pathHash = window.location.hash.substring(1); // Drop #

var path = { username: pathArray[0], reponame: 'rpgit-characters' };

var thi = Handlebars.compile( document.getElementById("thi").innerHTML );
var tname = Handlebars.compile(document.getElementById("tname").innerHTML);
var tchances = Handlebars.compile(document.getElementById("tchances").innerHTML);
var tservice = Handlebars.registerPartial("services", document.getElementById("tservices").innerHTML);
// Helpers
Handlebars.registerHelper("capitalize", function(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
});

var char = [], characterName = '', profile = '', service = '', systemVersion = ''; tableChecked = '';

init();

function init() {
  // Hash change
  window.onhashchange = function() {
    document.getElementsByTagName("section")[0].innerHTML = '';
    window.location.reload();
  }

  // get system version
  getAPI( "https://cdn.rawgit.com/petrosh/rpgit-system/gh-pages/version.txt", callbackVersion, fallbackVersion );
}

function selectPage() {

  switch (pathHash == '') {

    case true:
      // Home page so show Profiles
      getProfiles();
      break;

    case false:
      // Check term
      switch (pathHash.length) {

        case 1:
          // Profile selected so show servces chances
          profile = pathHash;
          tableChecked = 'service';
          getChances(tableChecked);
          break;

        case 2:
          // Service selected so ask for reenlist
          profile = pathHash.substring(0,1);
          service = pathHash.substring(1,1);
          break;
      }
      break;
  }
}

function getChances( table ) {
  // Get a table from system
  getAPI( "https://cdn.rawgit.com/petrosh/rpgit-system/" + systemVersion + "/tables/" + table + ".json", callbackChances, fallbackChances );
}

function callbackVersion() {
  // System version retrive and save then check character name
  var resp = this.responseText;
  systemVersion = resp;
  // get character name
  getAPI( "https://cdn.rawgit.com/" + path['username'] + "/" + path['reponame'] + "/v0.1/character/name.txt", callbackName, fallbackName );
}

function fallbackVersion() {
  document.getElementsByTagName("section")[0].innerHTML = "404: https://cdn.rawgit.com/petrosh/rpgit-system/gh-pages/version.txt";
}

function callbackName() {
  // Character name retrive and save then select Page to display
  var resp = this.responseText;
  characterName = resp;
  selectPage();
}

function fallbackName() {
  document.getElementsByTagName("section")[0].innerHTML = "404: https://cdn.rawgit.com/" + path['username'] + "/" + path['reponame'] + "/v0.1/character/name.txt";
}

function callbackChances() {
  var resp = this.responseText;
  resp = JSON.parse(resp);
  upp = diceProfiles( path['username'] + characterName + 'upp', profile );
  upphex = diceProfiles( path['username'] + characterName + 'upp', profile, 1 );
  var out = {};
  for (var service in resp){
    if (resp.hasOwnProperty(service)) { // service = navy
      var partial = {};
      var obj = resp[service];
      for (var throws in obj){
        if(obj.hasOwnProperty(throws)){ // throws=commission
          var thro = obj[throws]; // thro = { 2d6: "10+", +1: "ss9+" }
          // console.log(throws, thro);
          var val = 0;
          for (var tt in thro){
            if(thro.hasOwnProperty(tt)){ // tt = 2d6, +1, ...
              var key = thro[tt]; // key = 10+, ss9+, ...
              if(tt=="2d6"){
                val = parseInt( key.substring(0,key.length-1) );
              }else{
                var att = upp[key.substring(0,2)];
                // console.log("att " + att + " " + parseInt( key.substring(2,key.length-1)));
                if( att >= parseInt( key.substring(2,key.length-1) ) ){
                  val -= parseInt(tt);
                }
              }
            }
          }
          partial[throws] = val;
        }
      }
      out[service] = partial;
    }
  }
  var ele = tchances( { chances: out, upp: upphex, profile: profile } );
  document.getElementsByTagName("section")[0].innerHTML = ele;
}

function fallbackChances() {
  document.getElementsByTagName("section")[0].innerHTML = "404: https://cdn.rawgit.com/petrosh/rpgit-system/" + systemVersion + "/tables/" + tableChecked + ".json";
}

function getProfiles() {
  console.log("gp"+characterName);
  if(characterName != ''){ // get profiles
    char = diceProfiles( path['username'] + characterName + 'upp', false,1 );
    var ele = thi( { name: characterName, profiles: char } );
  }else{
    var ele = tname( path );
  }
  document.getElementsByTagName("section")[0].innerHTML = ele;
}

function diceProfiles(  ){
  Math.seedrandom( arguments[0] );
  if ( arguments[1] ) {
    for (var p = 0; p < 10; p++) {
      char[p] = { st: die(2, arguments[2]), de: die(2, arguments[2]), in: die(2, arguments[2]), en: die(2, arguments[2]), ed: die(2, arguments[2]), ss: die(2, arguments[2]) };
    }
    return char[arguments[1]];
  }else{
    for (var p = 0; p < 10; p++) {
      char[p] = { st: die(2, arguments[2]), de: die(2, arguments[2]), in: die(2, arguments[2]), en: die(2, arguments[2]), ed: die(2, arguments[2]), ss: die(2, arguments[2]) };
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
