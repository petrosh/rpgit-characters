function getAPI(url, callback, media, fallback) {
  var xhr = new XMLHttpRequest();
  xhr.open (
    "GET",                               /* do NOT use escape() */
    url,
    true
  );
  if(media) xhr.setRequestHeader('Accept', 'application/vnd.github.v3.'+media+'+json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // defensive check
      if (typeof callback == "function") {
        // apply() sets the meaning of "this" in the callback
        callback.apply(xhr);
      }
    }
    if (xhr.readyState == 4 && xhr.status == 404) {
      // defensive check
      if (typeof fallback == "function") {
        // apply() sets the meaning of "this" in the callback
        fallback.apply(xhr);
      }
    }
  };
  // send the request *after* the event handler is defined
  xhr.send();
}
