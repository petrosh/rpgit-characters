var pathArray = window.location.host.split( '.' );
var pathSlash = window.location.pathname.split( '/' ); // pathSlash[1]
var pathHash = window.location.hash.substring(1); // Drop #

var path = { username: pathArray[0], reponame: 'rpgit-characters' };

var thi = Handlebars.compile( document.getElementById("thi").innerHTML );
var tname = Handlebars.compile(document.getElementById("tname").innerHTML);
var tchances = Handlebars.compile(document.getElementById("tchances").innerHTML);
var templateTable = Handlebars.compile(document.getElementById("templateTable").innerHTML);
var tservice = Handlebars.registerPartial("services", document.getElementById("tservices").innerHTML);
// Helpers
// Capitalize
Handlebars.registerHelper("capitalize", function(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
});
// Convert to Hex
Handlebars.registerHelper("hex", function(value) {
  return value.toString(16).toUpperCase();
});
// Math from http://jsfiddle.net/mpetrovich/wMmHS/
Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});

var char = [],
  upp = [],
  characterName = '',
  ele = '',
  profile = '',
  service = '',
  tableChecked = '',
  tableObj = {},
  lastVersionSha = 0
;

init();

function init() {
  // Hash change
  window.onhashchange = function() {
    document.getElementsByTagName("section")[0].innerHTML = '';
    window.location.reload();
  };

  // get system version
  //tag
  // getAPIgithub( "https://api.github.com/repos/petrosh/rpgit-system/tags", callbackVersion, fallbackVersion );
  // or commit?

  // CHECK sessionStorage
  if (sessionStorage.getItem('system-sha') === null){
    getAPIgithub( "https://api.github.com/repos/petrosh/rpgit-system/commits", callbackVersion, fallbackVersion );
  }else{
    var now = new Date().getTime();
    var diff = sessionStorage.getItem('timestamp') - now;
    if( diff < 0 ){
      console.log('sha expired, get new');
      getAPIgithub( "https://api.github.com/repos/petrosh/rpgit-system/commits", callbackVersion, fallbackVersion );
    }else{
      console.log('still less '+now+'-'+diff+'-'+sessionStorage.getItem('timestamp'));
    }
  }
}

function selectPage() {

  switch (pathHash === '') {

    case true:
      // Home page so show Profiles
      getProfiles(); // check characterName
      break;

    case false:

      // Check term
      tableChecked = 'term';
      switch (pathHash.length) {

        case 1:
          // Profile selected so show services chances and we have upp
          // upp = diceProfiles( path.username + characterName + 'upp', profile );
          profile = pathHash;
          getChances(tableChecked);
          break;

        case 2:
          // Service selected so output results
          profile = pathHash.substring(0,1);
          service = pathHash.substring(1,1);
          getRolls(tableChecked);
          break;
      }
      break;
  }
}

function getChances( table ) {
  // Get a table from system
  getAPI( "https://cdn.rawgit.com/petrosh/rpgit-system/" + lastVersionSha + "/tables/" + table + ".json", callbackChances, fallbackChances );
}

function getRolls( table ) {
  // Get a table from system
  getAPI( "https://cdn.rawgit.com/petrosh/rpgit-system/" + lastVersionSha + "/tables/" + table + ".json", callbackRolls, fallbackRolls );
}

function callbackVersion() {
  // System version retrive and save then check character name
  var resp = this.responseText;
  var cosa = JSON.parse(resp);
  console.log({sha:cosa[0].sha});
  lastVersionSha = cosa[0].sha;

  // STORE IN sessionStorage
  sessionStorage.setItem('system-sha', lastVersionSha);
  sessionStorage.setItem('timestamp', addMinutes(1) );

  // Dynamic Javascript Insertion: petrosh/rpgit-system/scripts/diceroll.js
  dynamicInsert(lastVersionSha);
  // get character name
  getAPI( "https://cdn.rawgit.com/" + path.username + "/" + path.reponame + "/v0.1/character/name.txt", callbackName, fallbackName );
}

function addMinutes( minutes ){
  var cosa = new Date(new Date().getTime() + minutes*60000);
  console.log(cosa);
  return cosa;
}

function dynamicInsert( shaFinished ){
  // http://www.hunlock.com/blogs/Howto_Dynamically_Insert_Javascript_And_CSS
  var headID = document.getElementsByTagName("head")[0];
  var newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  newScript.onload=scriptLoaded;
  newScript.src = "https://cdn.rawgit.com/petrosh/rpgit-system/" + lastVersionSha + "/scripts/diceroll.js";
  headID.appendChild(newScript);
}

function scriptLoaded(){
  console.log('scriptLoaded');
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
  document.getElementsByTagName("section")[0].innerHTML = "404: https://cdn.rawgit.com/" + path.username + "/" + path.reponame + "/v0.1/character/name.txt";
}

function callbackRolls() {
  // Character name Profile and Service selected, resolve table
  var resp = this.responseText;
  tableObj = JSON.parse(resp);
  // now resolve table against upp
  console.log(tableObj, upp);
}

function fallbackRolls() {
  document.getElementsByTagName("section")[0].innerHTML = "404: https://cdn.rawgit.com/petrosh/rpgit-system/" + lastVersionSha + "/tables/" + tableChecked + ".json";
}

// Loop table and output chances
function callbackChances() {
  var resp = this.responseText;
  resp = JSON.parse(resp);
  var out = {};
  // Loop table rows: services
  for (var service in resp){
    if (resp.hasOwnProperty(service)) { // service = navy
      var partial = {};
      var obj = resp[service];
      // Add column description as first (out of roll loop)
      partial.description = obj.description;
      // Loop services throws
      for (var throws in obj){
        if(obj.hasOwnProperty(throws) && throws !=='description'){ // throws=enlist
          var thro = obj[throws]; // thro = {"success": "8+","DM": {"+1": "in8+","+2": "ed9+"} }
          var val = 0;
          for (var tt in thro){
            if(thro.hasOwnProperty(tt)){ // tt = success, DM, ...
              var key = thro[tt]; // key = 8+, {"+1": "in8+"}, ...
              if(tt=="success"){
                val = parseInt( key.substring(0,key.length-1) );
              }else{
                for (var dm in key){
                  if (key.hasOwnProperty(dm)) { // dm = +1, +2, ...
                    var sign = key[dm]; // sign = "in8+", "de9+", ...
                    var att = upp[sign.substring(0,2)];
                    if( att >= parseInt( sign.substring(2,sign.length-1) ) ){
                      val -= parseInt(tt);
                    }
                  }
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
  console.log({ column: out, upp: upp, profile: profile });
  // ele = tchances( { chances: out, upp: upp, profile: profile } );
  ele = templateTable( { column: out, upp: upp, profile: profile } );

  document.getElementsByTagName("section")[0].innerHTML = ele;
}

function fallbackChances() {
  document.getElementsByTagName("section")[0].innerHTML = "404: https://cdn.rawgit.com/petrosh/rpgit-system/" + lastVersionSha + "/tables/" + tableChecked + ".json";
}

function getProfiles() {
  if(characterName !== ''){ // get profiles
    char = diceProfiles( path.username + characterName + 'upp', false,1 );
    ele = thi( { name: characterName, profiles: char } );
  }else{
    ele = tname( path );
  }
  document.getElementsByTagName("section")[0].innerHTML = ele;
}

//
// function: diceProfiles (
//  [0] seed: string,
//  [1] unknown: , false = return array, index = return only one profile
//  [2] hex: bool, true = hex
// )
function diceProfiles(  ){
  Math.seedrandom( arguments[0] );
  if ( arguments[1] ) {
    for (var p = 0; p < 10; p++) {
      char[p] = { st: die(2, arguments[2]), de: die(2, arguments[2]), in: die(2, arguments[2]), en: die(2, arguments[2]), ed: die(2, arguments[2]), ss: die(2, arguments[2]) };
    }
    return char[arguments[1]];
  }else{
    for (var p1 = 0; p1 < 10; p1++) {
      char[p1] = { st: die(2, arguments[2]), de: die(2, arguments[2]), in: die(2, arguments[2]), en: die(2, arguments[2]), ed: die(2, arguments[2]), ss: die(2, arguments[2]) };
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

//
// function: dice (
//  dices = number of dices any throw,
//  value = reference value for success (number or array),
//  success = 0: exact value, 1: value or more, 0: exact value,
// )
// return: (
//  out = 1: success, 0: failed (number or array)
// )
// UPP ( "upp" /table [, profile /table index] )
// "upp" table has 10 indexes of 6 throws of 2d
// Loop:
// Return: 10 profiles for a seed or [, profile /table index] the UPP choosen
//
// Term ( "term" /table )
// term table has 6 indexes of 3 or 5 throws of 2d
// Return: 6 services for a seed or [, profile /table index] the First Term result
//
function dice( ){
  var out = []; result = [];
  var dices = arguments[0], value = arguments[1], success = arguments[2];
  if ( value.constructor === Array ) {
    for (var j = 0; j < value.length; j++) {
      for (var i = 0; i < dices; i++) {
        out[j] += Math.floor( Math.random() * 6 ) + 1;
      }
    }
  }else{
    // Single throw
    out = 0; result = 0;
    var dicesum = 0;
    for (var h = 0; h < dices; h++) {
      out += Math.floor( Math.random() * 6 ) + 1;
    }
    switch (success) {

      case 1: // or more
        if ( out >= value ) return 1; else return 0;
        break;

      case -1: // or less
        if ( out <= value ) return 1; else return 0;
        break;

      case 0: // exactly
        if ( out == value ) return 1; else return 0;
        break;
    }
  }
  return out;
}
