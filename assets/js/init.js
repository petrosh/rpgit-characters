// Hash change
window.onhashchange = function() {
  document.getElementsByTagName("section")[0].innerHTML = '';
  window.location.reload();
};
