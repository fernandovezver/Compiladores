function doFunction(){
  var lines = $('textarea').val().split('\n," "');
  for(var i = 0;i < lines.length;i++){
    console.log(lines[i]);
  }
}
