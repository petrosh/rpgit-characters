
function Character(){

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

  function loop(data) {eachAsync(function (el, done){
      // ... do work
      // console.log(this.preload.length,this.preload.indexOf(el),el);
      console.log(el);

      done(); // this could be called async
  }, data, 2000*Math.random());}

  this.preindex = 0;
  loop(this.preload[this.preindex].array);

}


function fwhenDone(){
  console.log(this.preindex,this.preload);
}

function eachAsync(iter, list, delay) {
    var i = 0,
        stopped = false;
    delay = delay || 0;

    function run() {
        iter(list[i], done);
    }
    function hold() {
        setTimeout(stopped ? hold : run, delay);
    }
    function done() {
        i++;
        if (i < list.length) {
            setTimeout(stopped ? hold : run, delay);
        } else if (fwhenDone) {
            fwhenDone();
        }
    }

    setTimeout(run, delay);

    return {
        stop: function () {
            stopped = true;
        },
        start: function () {
            stopped = false;
        },
        whenDone: function (f) {
            fwhenDone = f;
        }
    };
}
