
window.onload = function() {
  var yourDiv = document.getElementById('graph_div');
  var ProtVista = require('ProtVista');
  var instance = new ProtVista({
    el: yourDiv,
    uniprotacc: 'P05067'
  });
}
var h_scroll = 0;
console.log($('#container').width());
$('.right-btn').on('click', function(e){
  if(h_scroll < $('#container').width()) h_scroll += 50;
  $('#container').scrollLeft( h_scroll );
  console.log(h_scroll);
});
$('.left-btn').on('click', function(e){
  if(h_scroll > 0) h_scroll -= 50;
  $('#container').scrollLeft( h_scroll );
  console.log(h_scroll);
});
