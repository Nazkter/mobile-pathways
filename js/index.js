var h_scroll = 0;
var ProtVista = require('ProtVista');
var dialog = document.querySelector('dialog');
dialogPolyfill.registerDialog(dialog);

$('#search').on('click', function(e){
  var prot_id = $('#protein_id').val();
  if( prot_id == ''){
    $('#error_text').text('The textbox is empty, please insert the protein ID.');
    dialog.showModal();
  }else{
    loadGraph(prot_id);
    loadPublications(prot_id);
  }
});

function loadGraph(prot_id){
  $('#loading').fadeIn();
  var graph_div = document.getElementById('graph_div');
  var instance = new ProtVista({
    el: graph_div,
    uniprotacc: prot_id
  });
  instance.getDispatcher().on("ready", function(obj) {
      setTimeout(function () {
          $('#page-1').hide();
          $('#page-2').fadeIn();
          $('#loading').hide();
      }, 1000);
  });
}

function loadPublications(prot_id){
    var url = 'http://www.uniprot.org/uniprot/'+prot_id+'.xml';
    $.get(url, function(data, status){
        var seq = $(data).find('sequence').text();
        $('#sequence').text('');
        $('#sequence').text(seq.replace(/(.{10})/g,"$1  "));
        var cont = 1;
        $.each($(data).find('reference'), function () {
            var title = $(this).find('title').text();
            if(title !== ''){
              var pubMedID = $($(this).find('dbReference')[0]).prop('id');
              var pubMedURL = 'https://www.ncbi.nlm.nih.gov/pubmed/'+pubMedID;
              $('#pub_table').append('<tr><td><strong>'+cont+'</strong> - <a href="'+pubMedURL+'">'+title+'</a></td></tr>');
              cont++;
            }
        });
    }, 'xml');
}

$('#close_error').on('click',function(){
  dialog.close();
});
$('.nz_ex_btn').on('click', function(e){
    var p_id = $(this).text();
    $('#protein_id').focus();
    $('#protein_id')[0].parentElement.MaterialTextfield.change(p_id);
});
$('.nz_back_btn').on('click',function(e){
    $('#protein_id').val('');
    $('#page-2').hide();
    $('#page-1').fadeIn();
});
$('.nz_back_btn_2').on('click',function(e){
    $('#page-3').hide();
    $('#page-2').fadeIn();
});
$('.nz_back_btn_3').on('click',function(e){
    $('#page-4').hide();
    $('#page-2').fadeIn();
});
$('.nz_plus_btn').on('click', function(){
    $('#extra_info_p2').fadeToggle();
});
$('.nz_plus_btn_p3').on('click', function(){
    $('#extra_info_p3').fadeToggle();
});
$('.nz_plus_btn_p4').on('click', function(){
    $('#extra_info_p4').fadeToggle();
});
$('.nz_pubs').on('click', function(e) {
  $('#page-2').hide();
  $('#page-4').hide();
  $('#page-3').fadeIn();
});
$('.nz_seq').on('click', function(e) {
  $('#page-2').hide();
  $('#page-3').hide();
  $('#page-4').fadeIn();
});
function copyToClipboard(elementId) {
  var aux = document.createElement("input");
  aux.setAttribute("value", document.getElementById(elementId).innerHTML);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  var snackbarContainer = document.querySelector('#toast');
  var data = {message: 'Text has been copied to clipboard.'};
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
}
