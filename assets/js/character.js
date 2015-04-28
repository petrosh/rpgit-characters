function Character () {

  //this.username         = window.location.host.split('.')[0];
  this.username         = 'petrosh';
  // this.reponame         = window.location.pathname.split('/')[1];
  this.reponame         = 'rpgit-characters';

  this.pathHash         = window.location.hash.substring(1); // Drop #
  this.seed             = this.username + this.reponame;
  this.expiration       = 1; // in minutes

  this.getVar('name');

}


Character.prototype.getVar = function (varName,value) {
  if(value !== undefined) {
    this.setVar(arguments);
  } else
    this.getStored(varName);
};

Character.prototype.setVar = function (varName,value) {
  this[varName] = value;
  this.gotVar(varName);
};

Character.prototype.gotVar = function (varName) {

  if( this[varName] === '' )
    this.render(varName,'no');
  else {
    switch (varName) {
      case 'name':
        this.getVar('career');
        break;

      default:
        console.log(varName);
        break;
    }
  }

};

Character.prototype.getStored = function (varName) {
  var item = sessionStorage.getItem(varName);
  var tstamp = sessionStorage.getItem(varName+'-exp');
  var diff = tstamp - new Date().getTime();
  if (item)
    if (tstamp)
      if (diff>0) this.setVar(varName, item);
      else this.getFile(varName);
    else this.getFile(varName);
  else this.getFile(varName);
};

Character.prototype.getFile = function (file) {
  var self = this;
  var url = "https://cdn.rawgit.com/" + self.username + "/" + self.reponame + "/gh-pages/character/"+file+".txt";
  var open_original = XMLHttpRequest.prototype.open;
  var send_original = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function(method, url, async, unk1, unk2) {
      open_original.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function(data) {
      this.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var response = this.responseText.replace(/(\r\n|\n|\r)/gm,"");
          console.log('blast');
          self.setVar( file, response );
          self.storeVar( file, response );
        }
        if (this.readyState == 4 && this.status == 404) {
          console.log('not Found',url);
        }
      };
      send_original.apply(this, arguments);
  };

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
};

Character.prototype.storeVar = function (varName,value) {
  sessionStorage.setItem( varName, value);
  sessionStorage.setItem( varName + '-exp', addMinutes(this.expiration));
  function addMinutes( minutes ){
    return new Date(new Date().getTime() + minutes*60000).getTime();
  }
};

Character.prototype.render = function (tmp,exist) {
  var section = document.getElementsByTagName("section")[0];
  var template = Handlebars.compile( document.getElementById( exist + tmp ).innerHTML );
  var rendered = template(this);
  section.innerHTML = rendered;
  section.className = tmp;
};
