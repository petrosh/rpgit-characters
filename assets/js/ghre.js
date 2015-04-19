function getAPI(url, callback, media) {
  var xhr = new XMLHttpRequest();
  xhr.open (
    "GET",                               /* do NOT use escape() */
    url,
    true
  );
  // xhr.setRequestHeader('Accept', 'application/vnd.github.v3.'+media+'+json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // defensive check
      if (typeof callback == "function") {
        // apply() sets the meaning of "this" in the callback
        callback.apply(xhr);
      }
    }
  }
  // send the request *after* the event handler is defined
  xhr.send();
}
