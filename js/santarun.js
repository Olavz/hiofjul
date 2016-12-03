/*
* The Santa Run
* Did you know he studdys at Hiof?
*/

var SantaRun = (function() {
  var slade;
  var sladeHeight = 603;
  var sladeWidth = 1600;
  
  $(function() {
    slade = $("#slade");
	slade.css('visibility', 'hidden'); // hidden for now
  });
  
  function scaleSlade(scale) {
    slade.css('width', '200px');
    slade.css('height', '200px');
  }

  function start() {
    console.log('Start animation');
    /* Ho ho ho!! */
    scaleSlade(20);
  
    // start at width/2 y-slade.height
  
    // animate to x=0 and y=height/4
  
    // flip
  
    // animate to x=width+slade.width y=height/3
  
  }
  
  return {
    start : start
  };
})(window);



