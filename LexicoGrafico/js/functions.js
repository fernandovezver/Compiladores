const terminales = ['','class', 'program', '{', '}', '(', ')', 'if', 'else', 'while', 'iterate', 'void', 'isRed', 'isBlack', 'isHeart', 'isClubs', 'isDiamond', 'isSpades', 'isNotRed', 'isNotBlack', 'isNotHeart', 'isNotClubs', 'isNotDiamond', 'isNotSpades', 'isEmpty', 'isNotEmpty', '//<', '>', '//<=', '>=', '==', '!=', 'flip', 'getCard', 'putCard', 'VALUE'];



var tokens;
var errors;
var errorNum;
var matCurrPlaceCol = 0;
var matCurrPlaceFil = 0;
var flag = 0;

function errorCreater(text, word, line){
    let error = {
        errorText: text,
        invalidWord: word,
        errorLine: line
    }
    return error;
}

//Split del split para matriz dimensional
function splitFunction() {
    //Separa el input en un arreglo que separa en lineas
    let lines = $('textarea').val().split(/[\n]+/);
    let words = [];
    //El arreglo en lineas lo separa en palabras para crear una matriz
    for (var i = lines.length; i--; i >= 0) {
        words[i] = lines[i].split(/[" "]+/)
    }
    //Retornamos el valor
    return words;
}

function isValidToken(token){
    let regex = /\d/;
    let regex2 = /^[\w]+$/;
    let number = /^\d+$/;
    if(!terminales.includes(token)){
        if(number.test(token)){
            return true;
        }else{
            if(!(regex.test(token))){
                if(regex2.test(token)){
                    return true;
                }else{
                    return false;
                }
            }else{
                    return false;
            }
        }
    }else{
        return true;
    }
}

function lexico(){
    for (var i = 0; i < tokens.length; i++) {
        for (var j = 0; j < tokens[i].length; j++) {
            if(!isValidToken(tokens[i][j])){
                errors[errorNum++] = errorCreater("Invalid Token", tokens[i][j], i+1);
            }else{
            }
        }
    }
}

function showerrors(){
  $('#errorarea').append("ERRORS FOUND "+errorNum+"&#10;");
  for (var i = 0; i < errorNum; i++) {
    $('#errorarea').append("Error in line "+errors[i].errorLine+"&#10;"+"Error: "+errors[i].invalidWord+"&#10;"+"NameError: "+errors[i].errorText+"&#10;&#10;");
    //$('#errorarea').append(i+" - Error: "+errors[i].errorText+" in line "+errors[i].errorLine+": "+errors[i].invalidWord+"&#10;");
    console.log(errors[i].invalidWord);
    console.log(errors[i].errorLine);
  }
}

//La funcion que llamamos en el html, da inicio a todoo
function mainFunction (){
    $("#errorarea").html('');
    //Los reiniciamos o iniciamos
    matCurrPlaceFil = 0;
    matCurrPlaceCol = 0;
    errorNum = 0;
    errors = [];

    //Guardamos en tokens el resultado de splitFunction
    tokens = splitFunction();
    //Lexico
    lexico();

    showerrors();
    
    errorNum = 0;
    errors = [];


    //Sintactico
    //Llamamos a program()
    program();
}
/*
Hasta ahora lo que hace exigir es:
1.-Retorna una bandera que dice true o false y asi sabemos el error(Yo creo en el futuro sera mejor un entero si queremos mostras la cantidad de
errores y seguir checando el codigo)
2.-Compara el token con la posicion en la que deberia de ir


*/
function exigir(token) {
    var flag = false;
    //Si la longitud de la fila es mayor a la columna en la que estamos entra
    //Si no aumenta uno en la fila y nos regresa a la columna 0
    if(tokens[matCurrPlaceFil].length > matCurrPlaceCol){
        //Compara los tokens que van
        if(token == tokens[matCurrPlaceFil][matCurrPlaceCol]){
            //Bandera true
            flag = true;
            //Aumentamos uno a la columna
            matCurrPlaceCol++;
        }
    }else{
        //Aumentamos uno a la fila
        matCurrPlaceFil++;
        //Reiniciamos las columnas
        matCurrPlaceCol = 0;
        if(token == tokens[matCurrPlaceFil][matCurrPlaceCol]){
            //Bandera true
            flag = true;
            //Aumentamos uno a la columna
            matCurrPlaceCol++;
        }
    }
    return flag;
}
function verificar(token) {
    var flag = false;
    return flag;
}
/*
Funciones de la Gramatica para hacer los metodos exigir y verificar, tambien mandar errores
*/

//<program> ::= "class" "program" "{" <functions> <main function> "}"

function program() {
    if (exigir("class")) {
        if (exigir("program")) {
            if (exigir("{")) {
                normalFunction();
                main_function();
                if (exigir("}")) {
                }
                else{
                    errorCreater("Error, unexpected token found, was expected: }", matCurrPlaceCol, matCurrPlaceFil);
                }
            }
            else {
                errorCreater("Error, unexpected token found, was expected: {", matCurrPlaceCol, matCurrPlaceFil);
            }
        }
        else {
            errorCreater("Error, unexpected token found, was expected: program", matCurrPlaceCol, matCurrPlaceFil);
        }
    }
    else {
        errorCreater("Error, unexpected token found, was expected: class", matCurrPlaceCol, matCurrPlaceFil);
    }

}


//<functions> ::= <function> <functions alpha> | LAMBDA
function functions() {
    //function();
    functions_alpha();
}

//<functions alpha>  ::= <function> <functions alpha> | LAMBDA
function functions_alpha() {
    if (verificar("void")) {
        //function();
        functions_alpha();
    }
}

//<main function> ::= "program" "(" ")" "{" <body> "}"

//<function> := "void" <name function> "("   ")" "{" <body> "}"
function funFunction() {
    if ( exigir( "void" ) ) {
	    name_function();
	    if ( exigir( "(" ) ) {
	        if ( exigir ( ")" ) ) {
	            if ( exigir ( "{"  ) ) {
	                body();
                    if ( !exigir( "}" ) ) {
		            }
	            } else {
	                errorCreater("Error, unexpected token found, was expected: {", matCurrPlaceCol, matCurrPlaceFil);
	            }
            } else {
                errorCreater("Error, unexpected token found, was expected: )", matCurrPlaceCol, matCurrPlaceFil);
            }
        } else {
            errorCreater("Error, unexpected token found, was expected: (", matCurrPlaceCol, matCurrPlaceFil);
        }
    } else {
        errorCreater("Error, unexpected token found, was expected: void", matCurrPlaceCol, matCurrPlaceFil);
    }
}

//<body> ::= //<expression> //<body alpha>

/* Asi funciona body y bodyalpha
 supongamos que tenemos
 class program () {
    Esta linea seria la funcion body, entra a body y body llama a bodyalpha para poder iterar por si hay otra expresion
     if flip {
        Esto ya es en bodyalpha y tenemos que hacer un if en bodyalpha verificando las palabras reservadas que nos podriamos topar en expression
        Si no hay ni una de esas palabras pues regresamos a la funcion que nos llamo porque probablemente ya acabo la iteracion o un error, no sabemos
         if getCard {
            Si si hubo una de las palabras reservadas quiere decir que teniamos otra expression y por lo tanto teniamos que iterar y volvemos a entrar a body alpha
             if putCard{
                 
             }
         }
     }
 }
*/
function body(){
    expression();
    bodyAlpha();
}

//<body alpha> ::= //<expression> //<body alpha> | LAMBDA
function bodyAlpha(){
    if( verificar("flip") || verificar("getCard") || verificar("putCard") || verificar("if") || verificar("while") || verificar("iterate")){
        expression();
        bodyAlpha();
    }
}

//<expression> ::= //<call function> //<if expression> |//<while expression> | //<iterate expression>

function expression(){
    callFunction();
    if(verificar("if")){
        funIf();
    }else if(verificar("while")){
        funWhile();
    }else if(verificar("iterate")){
        iterate();
    }
}


//<call function> ::= //<name of function>

function callFunction(){
    nameOfFunction();
}

//<name of function> ::= //<official function> | //<customer function>

function nameOfFunction(){
    if(verificar('flip') || verificar('getCard') || verificar('customer')){
        
    }
}

//<official function> ::= "flip" | "getCard" "(" //<number of deck> ")" | "putCard" "(" //<number of deck> ")"
function official(){
    if(verificar("flip")){
        console.log("Le hizo flip")
    }else if(verificar("getCard")){
        if(exigir("(")){
            console.log("Pidiendo número de deck");
            //number_of_deck();
            if(exigir(")")){
            }else{
                errorCreater("Error, unexpected token found, was expected: )", matCurrPlaceCol, matCurrPlaceFil);
            }
        }else{
            errorCreater("Error, unexpected token found, was expected: (", matCurrPlaceCol, matCurrPlaceFil);
        }
    }else if(verificar("putCard")){
        if(exigir("(")){
            number_of_deck();
            console.log("Pidiendo número de deck");
            if(exigir(")")){
            }else{
                errorCreater("Error, unexpected token found, was expected: )", matCurrPlaceCol, matCurrPlaceFil);
            }
        }else{
            errorCreater("Error, unexpected token found, was expected: (", matCurrPlaceCol, matCurrPlaceFil);
        }
    }else{
        errorCreater("Error, unexpected token found, was expected: void - getCard - putCard", matCurrPlaceCol, matCurrPlaceFil);
    }
}


//<customer function> ::= is a string with only letters th9 at was defined in a //<function> previously.
function customer(){
    //   
    if(tokens[matCurrPlaceFil].length > matCurrPlaceCol){
        matCurrPlaceCol++;
    }else{
        matCurrPlaceFil++;
        matCurrPlaceCol = 0;
        
    }
    if(!terminales.includes(tokens[matCurrPlaceFil][matCurrPlaceCol])){
        console.log(tokens[matCurrPlaceFil][matCurrPlaceCol]);
        matCurrPlaceCol++;
    }
    else{
        errorCreater("Error, function name is reserved", matCurrPlaceCol, matCurrPlaceFil);
    }
}


//<number of deck> ::=  is a number between 0 to 52 ( inclusive )

function numberOfDeck(){
     if(tokens[matCurrPlaceFil].length > matCurrPlaceCol){
        matCurrPlaceCol++;
    }else{
        matCurrPlaceFil++;
        matCurrPlaceCol = 0;
        
    }
    if(!isNaN(tokens[matCurrPlaceFil][matCurrPlaceCol])){
        if(tokens[matCurrPlaceFil][matCurrPlaceCol] >= 0 && tokens[matCurrPlaceFil][matCurrPlaceCol] < 53){
            console.log(tokens[matCurrPlaceFil][matCurrPlaceCol]);
        }
        else{
            errorCreater("Error, Expected number between 0 and 52, found another number", matCurrPlaceCol, matCurrPlaceFil);
        }
        
    }
    else{
        errorCreater("Error, Expected number found string or something else", matCurrPlaceCol, matCurrPlaceFil);
    }
    matCurrPlaceCol++;
}

//<if expression> ::= "if" ( //<conditional> ) "{" //<body> "}"  //<elseif>

function funIf(){
    if (exigir("if")){
        if (exigir("(")){ 
            conditional();
            if (exigir(")")){
                if (exigir("{")) {
                    body();
                    if (exigir("}")) {
                        funElseif();
                    }else{
                        errorCreater("Error, unexpected token found, was expected: }", matCurrPlaceCol, matCurrPlaceFil);
                    }
                }else{
                    errorCreater("Error, unexpected token found, was expected: {", matCurrPlaceCol, matCurrPlaceFil);
                }
            }else{
                errorCreater("Error, unexpected token found, was expected: )", matCurrPlaceCol, matCurrPlaceFil);
            }
        }else{
            errorCreater("Error, unexpected token found, was expected: (", matCurrPlaceCol, matCurrPlaceFil);
        }
    }else{
        
    }errorCreater("Error, unexpected token found, was expected: if", matCurrPlaceCol, matCurrPlaceFil);
}

//<elseif> ::= "else" "{" //<body> "}" | LAMBDA

function funElseif(){
    if(exigir("else")){
        if(exigir("{")){
            body();
            if(exigir("}")){
            }else{
                errorCreater("Error, unexpected token found, was expected: }", matCurrPlaceCol, matCurrPlaceFil);
            }
        }else{
            errorCreater("Error, unexpected token found, was expected: {", matCurrPlaceCol, matCurrPlaceFil);
        }
    }
}


//<while expression> ::= "while" "(" //<conditional> ")" "{" //<body> "}"

function funWhile(){
    if(exigir("while")){
        if(exigir("(")){
            conditional();
            if(exigir(")")){
                if(exigir("{")){
                    body();
                    if(exigir("}")){
                        
                    }else{
                        errorCreater("Error, unexpected token found, was expected: }", matCurrPlaceCol, matCurrPlaceFil);
                    }
                }else{
                    errorCreater("Error, unexpected token found, was expected: {", matCurrPlaceCol, matCurrPlaceFil);
                }
            }else{
                errorCreater("Error, unexpected token found, was expected: )", matCurrPlaceCol, matCurrPlaceFil);
            }
        }else{
            errorCreater("Error, unexpected token found, was expected: (", matCurrPlaceCol, matCurrPlaceFil);
        }
    }else{
        errorCreater("Error, unexpected token found, was expected: while", matCurrPlaceCol, matCurrPlaceFil);
    }
}

//<iterate expression> ::= "iterate" "(" //<number> ")" "{" //<body> "}"

function iterate(){
    if(exigir("iterate")){
        if(exigir("(")){
            number();
            if(exigir(")")){
                if(exigir("{")){
                    body();
                    if(exigir("}")){
                        
                    }else{
                        errorCreater("Error, unexpected token found, was expected: }", matCurrPlaceCol, matCurrPlaceFil);
                    }
                }else{
                    errorCreater("Error, unexpected token found, was expected: {", matCurrPlaceCol, matCurrPlaceFil);
                }
            }else{
                errorCreater("Error, unexpected token found, was expected: )", matCurrPlaceCol, matCurrPlaceFil);
            }
        }else{
              errorCreater("Error, unexpected token found, was expected: (", matCurrPlaceCol, matCurrPlaceFil);
         }
    }else{
        errorCreater("Error, unexpected token found, was expected: iterate", matCurrPlaceCol, matCurrPlaceFil);
    }
}

//<conditional> ::= //<card simple condition> | //<card composed condition> | //<deck simple condition>

function conditional(){
    if (verificar("isRed") || verificar("isBlack") || verificar("isHeart") || verificar("isClubs") || verificar("isDiamond") || verificar("isSpaces") || verificar("isNotRed") || verificar("isNotBlack") || verificar("isNotHear") || verificar("isNotClubs") || verificar("isNotDiamond") || verificar("isNotSpades")) {
        cardSimpleFunction();
    }else{
        errorCreater("Error, Expected a valid conditional, found something else", matCurrPlaceCol, matCurrPlaceFil);
    }
}
//<card simple condition> ::= "isRed" | "isBlack" | "isHeart" | "isClubs" | "isDiamond" | "isSpades" | "isNotRed" | "isNotBlack" | "isNotHeart" | "isNotClubs" | "isNotDiamond" | "isNotSpades"

function cardSimpleFunction(){
    if(verificar("isRed")){
        console.log("Encontramos una card simple function");
    } 
    else if(verificar("isBlack")){
        console.log("Encontramos una card simple function");
    } 
    else if(verificar("isHeart")){
        console.log("Encontramos una card simple function");
    } 
    else if(verificar("isClubs")){
        console.log("Encontramos una card simple function");
    } 
    else if(verificar("isDiamond")){
        console.log("Encontramos una card simple function");
    } 
    else if(verificar("isSpaces")){
        console.log("Encontramos una card simple function");
    } 
    else if(verificar("isNotRed")){
        console.log("Encontramos una card simple function");
    } 
    else if(verificar("isNotBlack")){
        console.log("Encontramos una card simple function");
    } 
    else if(verificar("isNotHear")){
        console.log("Encontramos una card simple function");
    } 
    else if(verificar("isNotClubs")){
        console.log("Encontramos una card simple function");
    } 
    else if(verificar("isNotDiamond")){
        console.log("Encontramos una card simple function");
    } 
    else if(verificar("isNotSpades"){
        console.log("Encontramos una card simple function");
    }
}

//<card composed condition> ::= "VALUE" //<operator> //<number>

function cardComposedCondition(){
    if(exigir("VALUE")){
        if(verificar("<") || verificar(">") || verificar("<=") || verificar(">=") || verificar("==") || verificar("!=")){
            operator();
            number();
        }else{
            errorCreater("Error, Expected operator, found something else or it is missing", matCurrPlaceCol, matCurrPlaceFil);
        }
    }
}

//<number> ::= is a natural number between 1 - 13+
function number(){
    if(tokens[matCurrPlaceFil].length > matCurrPlaceCol){
        matCurrPlaceCol++;
    }else{
        matCurrPlaceFil++;
        matCurrPlaceCol = 0;
        
    }if(!isNaN(tokens[matCurrPlaceFil][matCurrPlaceCol])){
        if(tokens[matCurrPlaceFil][matCurrPlaceCol] % 1 == 0){
            if(tokens[matCurrPlaceFil][matCurrPlaceCol]>0 && tokens[matCurrPlaceFil][matCurrPlaceCol] < 14){
                
            }else{
                errorCreater("Error, number needs to be in range [1,13] ", matCurrPlaceCol, matCurrPlaceFil);
            }
        }else{
            errorCreater("Error,number needs to be integer ", matCurrPlaceCol, matCurrPlaceFil);
        }
    }else{
        errorCreater("Error, empty number ", matCurrPlaceCol, matCurrPlaceFil);
    }
}

//<operator> ::= "//<" | ">" | "//<=" | ">=" | "==" | "!="

function operador(){
    if(verificar("<")){
        console.log("Encontramos un operador");
    } 
    else if(verificar(">")){
        console.log("Encontramos un operador");
    } 
    else if(verificar("<=")){
        console.log("Encontramos un operador");
    } 
    else if(verificar(">=")){
        console.log("Encontramos un operador");
    } 
    else if(verificar("==")){
        console.log("Encontramos un operador");
    } 
    else if(verificar("!=")){
        console.log("Encontramos un operador");
    }
}


//<deck simple condition> ::= isEmpty "(" //<number of deck> ")" | isNotEmpty "(" //<number of deck> ")"
function deckSimpleCondition(){
    if(exigir("isEmpty") || exigir("isNotEmpty")){
        console.log("Encontramos un condicional simple de deck");
        if(exigir("(")){
            numberOfDeck();
            if(exigir(")")){
                
            }else{
                errorCreater("Error, unexpected token found, was expected: )", matCurrPlaceCol, matCurrPlaceFil);
            }
        }else{
            errorCreater("Error, unexpected token found, was expected: (", matCurrPlaceCol, matCurrPlaceFil);
        }
    }else{
        errorCreater("Error, unexpected token found, was expected: isEmpty or isNotEmpty", matCurrPlaceCol, matCurrPlaceFil);
    }
}











