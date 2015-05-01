function Character () {

  //this.username         = window.location.host.split('.')[0];
  this.username         = 'petrosh';
  // this.reponame         = window.location.pathname.split('/')[1];
  this.reponame         = 'rpgit-characters';
  this.system           = 'petrosh/rpgit-system';

  this.pathHash         = window.location.hash.substring(1); // Drop #
  this.seed             = this.username + this.reponame;
  this.expiration       = 10; // in minutes

  this.preload          = [
    {
      url:   "https://cdn.rawgit.com/" + this.username + "/" + this.reponame + "/gh-pages/character/",
      ext:   ".txt",
      array: [ 'name', 'career', 'birthplace' ]
    }, {
      url:   "https://cdn.rawgit.com/" + this.system + "/gh-pages/tables/",
      ext:   ".json",
      array: [ 'attributes', 'terms']
    }
  ];

  this.preloadIndex     = 0;
  this.preloadElement   = this.preload[this.preloadIndex];

  this.goFirst();

}

Character.prototype.goFirst = function(){
  console.log(this.preloadIndex,this.preload.length);
  if(this.preloadElement.array.length > 0){
    var now = this.preloadElement.array.shift();
    var stored = this.getStored(now);
    if (!stored)
      this.newRequest(now,this.preloadElement.url,this.preloadElement.ext);
    else
      this.goFirst();
  }else{
    if(this.preloadIndex + 1 == this.preload.length){
      // exit
    }else{
      this.preloadIndex ++;
      this.preloadElement   = this.preload[this.preloadIndex];
      this.goFirst();
    }
  }
};

Character.prototype.fallback = function (xhr) {
  console.log("fb "+xhr);
};

Character.prototype.callback = function (xhr) {
  this.goFirst();
  console.log("cb "+xhr);
};

Character.prototype.newRequest = function(fileName,baseUrl,Filext){
    var self = this;
    var url = baseUrl + fileName + Filext;
    var xhr = new XMLHttpRequest();
    xhr.open ( "GET", url, true );
    // xhr.setRequestHeader('Accept','application/vnd.github.v3.'+media+'+json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = xhr.responseText.replace(/(\r\n|\n|\r)/gm,"");
        self.storeVar(fileName,response);
        self.callback(response);
      }
      if (xhr.readyState == 4 && xhr.status == 404) {
        self.fallback.call(xhr);
      }
    };
    xhr.send();
};

Character.prototype.storeVar = function (varName,value) {
  this[varName] = value;
  sessionStorage.setItem( varName, value);
  sessionStorage.setItem( varName + '-exp', addMinutes(this.expiration));
  function addMinutes( minutes ){
    return new Date(new Date().getTime() + minutes*60000).getTime();
  }
};


Character.prototype.getStored = function (varName,url,ext) {
  var item = sessionStorage.getItem(varName);
  var tstamp = sessionStorage.getItem(varName+'-exp');
  var diff = tstamp - new Date().getTime();
  if (item) {
    if (tstamp) {
      if (diff>0) {
        return item;
      } else return false;
    } else return false;
  } else return false;
};

Character.prototype.output = function (varName) {
  switch (this[varName]) {
    case null:
      this.render('name','no');
      break;

    default:
      this.render('name');
      break;

  }
};

Character.prototype.render = function (tmp,exist) {
  var section = document.getElementsByTagName("section")[0];
  console.log('render',arguments);
  //var template = Handlebars.compile( document.getElementById( exist + tmp ).innerHTML );
  //var rendered = template(this);
  //section.innerHTML = rendered;
  //section.className = tmp;
};

 // -----------------------------


Character.prototype.getVar = function (varName,value) {
 if(value !== undefined) {
   this.setVar(arguments);
 } else
   this.getStored(varName);
};

Character.prototype.getFile = function (file,baseUrl,ext) {
  var self = this;
  var url = baseUrl + file + ext;
  var open_original = XMLHttpRequest.prototype.open;
  var send_original = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function(method, url, async, unk1, unk2) {
      open_original.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function(data) {
      this.onreadystatechange = function() {
        console.log(this);
        if (this.readyState == 4 && this.status == 200) {
          var response = this.responseText.replace(/(\r\n|\n|\r)/gm,"");
          self.setVar( file, response );
          self.storeVar( file, response );
        }
        // if (this.readyState == 4 && this.status == 404) {
        //   console.log('not Found',this.responseURL);
        // }
      };
      send_original.apply(this, arguments);
  };

  var xmlhttp = new XMLHttpRequest();
  console.log(url);
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
};
