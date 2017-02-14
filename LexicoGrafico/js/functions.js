const terminales = ['', 'class', 'program', '{', '}', '(', ')', 'if', 'else', 'while', 'iterate', 'void', 'isRed', 'isBlack', 'isHeart', 'isClubs', 'isDiamond', 'isSpades', 'isNotRed', 'isNotBlack', 'isNotHeart', 'isNotClubs', 'isNotDiamond', 'isNotSpades', 'isEmpty', 'isNotEmpty', '//<', '>', '//<=', '>=', '==', '!=', 'flip', 'getCard', 'putCard', 'VALUE'];

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
    if(!terminales.includes(token)){
        if(!(regex.test(token))){
            if(regex2.test(token)){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
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

//La funcion que llamamos en el html, da inicio a todoo
function mainFunction (){
    //Los reiniciamos o iniciamos
    matCurrPlaceFil = 0;
    matCurrPlaceCol = 0;
    errorNum = 0;
    errors = [];

    //Guardamos en tokens el resultado de splitFunction
    tokens = splitFunction();
    console.log(tokens);

    //Lexico
    lexico();
    console.log(errorNum);
    console.log(errors);

    //Sintactico
    //Llamamos a program()
    //program();
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
                if (exigir("void")) {//Aqui iba verificar
                    if (exigir("}")) {
                    }
                    else{
                        console.log("Error, missing statement (})");
                    }
                }
                //main_function();
                else{
                    console.log("Error, missing statement (void)");
                }
            }
            else {
                console.log("Error, missing statement ({)");
            }
        }
        else {
            console.log("Error, missing statement (program)");
        }
    }
    else {
        console.log("Error, missing statement (class)");
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
/*function function() {
    if ( exigir( "void" ) ) {
	    name_function();
	    if ( exigir( "(" ) ) {
	        if ( exigir ( ")" ) ) {
	            if ( exigir ( "{"  ) ) {
	                body();
                    if ( !exigir( "}" ) ) {
		            }
	            } else {
	            }
            } else {
            }
        } else {
        }
    } else {
    }
}*/

//<body> ::= //<expression> //<body alpha>

//<body alpha> ::= //<expression> //<body alpha> | LAMBDA

//<expression> ::= //<call function>
  //<if expression> |
  //<while expression> |
  //<iterate expression>

//<call function> ::= //<name of function>

//<name of function> ::= //<official function> | //<customer function>

//<official function> ::= "flip" | "getCard" "(" //<number of deck> ")" | "putCard" "(" //<number of deck> ")"

//<customer function> ::= is a string with only letters that was defined in a //<function> previously.

//<number of deck> ::=  is a number between 0 to 52 ( inclusive )

//<if expression> ::= "if" ( //<conditional> ) "{" //<body> "}"  //<elseif>

//<elseif> ::= "else" "{" //<body> "}" | LAMBDA

//<while expression> ::= "while" "(" //<conditional> ")" "{" //<body> "}"

//<iterate expression> ::= "iterate" "(" //<number> ")" "{" //<body> "}"

//<conditional> ::= //<card simple condition> | //<card composed condition> | //<deck simple condition>

//<card simple condition> ::= "isRed" | "isBlack" | "isHeart" | "isClubs" | "isDiamond" | "isSpades" | "isNotRed" | "isNotBlack" | "isNotHeart" | "isNotClubs" | "isNotDiamond" | "isNotSpades"


//<card composed condition> ::= "VALUE" //<operator> //<number>

//<number> ::= is a natural number between 1 - 13

//<operator> ::= "//<" | ">" | "//<=" | ">=" | "==" | "!="


//<deck simple condition> ::= isEmpty "(" //<number of deck> ")" | isNotEmpty "(" //<number of deck> ")"
