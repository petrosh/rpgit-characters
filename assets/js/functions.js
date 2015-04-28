function setHashChange(){
  // Hash change
  window.onhashchange = function() {
    document.getElementsByTagName("section")[0].innerHTML = '';
    window.location.reload();
  };
}

// Get file from cdn
function getFile(self){
  var url = "https://cdn.rawgit.com/" + self.username + "/" + self.reponame + "/v0.1/character/name.txt";
  var open_original = XMLHttpRequest.prototype.open;
  var send_original = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function(method, url, async, unk1, unk2) {
      open_original.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function(data) {
      this.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var response = this.responseText.replace(/(\r\n|\n|\r)/gm,"");
          if( response !== '' ){
            self.name = response;
            sessionStorage.setItem('name', response);
            sessionStorage.setItem('name-timestamp', addMinutes(this.expiration));
            console.log('blast');
            render(tmpNoname(self),name);
          }else{
            render(tmpNoname(self),name);
          }
        }
      };
      send_original.apply(this, arguments);
  };

  function addMinutes( minutes ){
    return new Date(new Date().getTime() + minutes*60000).getTime();
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}

function render(ele,classe){
  section.innerHTML = ele;
  section.className = classe;
}
