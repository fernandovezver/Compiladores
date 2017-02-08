const terminales = ['class', 'program', '{', '}', '(', ')', 'if', 'else', 'while', 'iterate', 'void', 'isRed', 'isBlack', 'isHeart', 'isClubs', 'isDiamond', 'isSpades', 'isNotRed', 'isNotBlack', 'isNotHeart', 'isNotClubs', 'isNotDiamond', 'isNotSpades', 'isEmpty', 'isNotEmpty', '<', '>', '<=', '>=', '==', '!=', 'flip', 'getCard', 'putCard', 'VALUE'];

const text =  () => {
  //Separa el input en un arreglo en las condiciones que se dan
  let lines = $('textarea').val().split(/[\s," ",\n]+/);
  return lines;
}

console.log(text);


function exigir(token){
  var flag = false;
  
  return flag;
}
