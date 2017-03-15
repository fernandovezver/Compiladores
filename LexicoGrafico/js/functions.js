const terminales = ['class', 'program', '{', '}', '(', ')', 'if', 'else', 'while', 'iterate', 'void', 'isRed', 'isBlack', 'isHeart', 'isClubs', 'isDiamond', 'isSpades', 'isNotRed', 'isNotBlack', 'isNotHeart', 'isNotClubs', 'isNotDiamond', 'isNotSpades', 'isEmpty', 'isNotEmpty', '<', '>', '<=', '>=', '==', '!=', 'flip', 'getCard', 'putCard', 'VALUE'];


const IF = 10;
const WHILE = 20;
const ITERATE = 30;
const RETURN = 40;
const INICIO_PROG = 50;
const FIN = 60;
const JMP = 70;
const CALL = 80;
const FLIP = 90;
const GETCARD = 100;
const PUTCARD = 110;
const CONSVALUE = 120;

const CONDICIONAL = 255;

const ConstIsRed = 512;
const ConstIsBlack = 513;
const ConstIsHeart = 514;
const ConstIsClubs = 515;
const ConstIsDiamond = 516;
const ConstIsSpades = 517;
const ConstIsNotRed = 518;
const ConstIsNotBlack = 519;
const ConstIsNotHeart = 520;
const ConstIsNotClubs = 521;
const ConstIsNotDiamond = 522;
const ConstIsNotSpades = 523;
const ConstIsEmpty = 524;
const ConstIsNotEmpty = 525;
//<
const ConstMenorque = 526;
//>
const ConstMayorque = 527;
//<=
const ConstMenorigual = 528;
//>=
const ConstMayorigual = 529;
//==
const ConstIgualigual = 530;
//!=
const ConstDiferente = 531;


let tokens;
let errors;
let errorNum;
let matCurrPlaceCol;
let matCurrPlaceFil;
let newFunctions;
let newValues;
let codIntermedio;
let stack = [];
let pos;

function errorCreater(text, word, line, pos){
    errors[errorNum++] =  {
        errorText: text,
        invalidWord: word,
        errorLine: line + 1,
        errorPos: pos + 1
    };

}

//Split del split para matriz dimensional
function splitFunction() {
    //Separa el input en un arreglo que separa en lineas
    let lines = $('textarea').val().split(/[\n]+/);
    let words = [];
    //El arreglo en lineas lo separa en palabras para crear una matriz
    for (let i = lines.length; i--; i >= 0) {
        words[i] = lines[i].split(/[" "]+/)
         words[i] = words[i].filter(Boolean);
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
                return regex2.test(token);
            }else
                return false;
        }
    }else
        return true;
}

function lexico(){
    for (let i = 0; i < tokens.length; i++) {
        for (let j = 0; j < tokens[i].length; j++) {
            if(!isValidToken(tokens[i][j])){
                errorCreater("Invalid Token", tokens[i][j], i);
            }else{
            }
        }
    }
}

function showerrors(){
  $('#errorarea').append("ERRORS FOUND "+errorNum+"&#10;");
  for (let i = 0; i < errorNum; i++) {
    $('#errorarea').append("Error in line "+errors[i].errorLine+"&#10;"+"Error position: "+errors[i].errorPos+"&#10;"+"Error: "+errors[i].invalidWord+"&#10;"+"NameError: "+errors[i].errorText+"&#10;&#10;");
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
    newFunctions = [];
    newValues = [];

    //Guardamos en tokens el resultado de splitFunction
    tokens = splitFunction();
      console.log(tokens);
    //Lexico
    lexico();
    //Sintactico
	pos = 0;
	codIntermedio = [];

    program();

    showerrors();
    //Llamamos a program()

    errorNum = 0;
    errors = [];
    console.log(codIntermedio);

}
/*
Hasta ahora lo que hace exigir es:
1.-Retorna una bandera que dice true o false y asi sabemos el error(Yo creo en el futuro sera mejor un entero si queremos mostras la cantidad de
errores y seguir checando el codigo)
2.-Compara el token con la posicion en la que deberia de ir


*/
function exigir(token) {
    let flag = false;
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
	flag = false;
	if(tokens[matCurrPlaceFil].length > matCurrPlaceCol){
		if(token == tokens[matCurrPlaceFil][matCurrPlaceCol]){
			flag = true;
		}
	}else{
        //Aumentamos uno a la fila
        matCurrPlaceFil++;
        //Reiniciamos las columnas
        matCurrPlaceCol = 0;
        if(token == tokens[matCurrPlaceFil][matCurrPlaceCol]){
            //Bandera true
            flag = true;
        }
    }
    return token == tokens[matCurrPlaceFil][matCurrPlaceCol];
}
/*
Funciones de la Gramatica para hacer los metodos exigir y verificar, tambien mandar errores
*/

//<program> ::= "class" "program" "{" <functions> <main function> "}"

function program() {
    if (exigir("class")) {
        if (exigir("program")) {
            if (exigir("{")) {
                functions();
                main_function();
                if (exigir("}")) {
	                console.log("Mensaje");
                }
                else
                    errorCreater("Error, unexpected token found, was expected: }", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
            }
            else
                errorCreater("Error, unexpected token found, was expected: {", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
        }
        else
	        errorCreater("Error, unexpected token found, was expected: program", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
    }else
	    errorCreater("Error, unexpected token found, was expected: program", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
}


//<functions> ::= <function> <functions alpha> | LAMBDA
function functions() {
	console.log(verificar("void"));
	console.log("Si entro a functions");
	if (verificar("void")){
    	funFunction();
    	functions_alpha();
    }
}

//<functions alpha>  ::= <function> <functions alpha> | LAMBDA
function functions_alpha() {
    if (verificar("void")) {
    	console.log("Si entro a function Alpha");
        funFunction();
        functions_alpha();
    }
}

//<main function> ::= "program" "(" ")" "{" <body> "}"

function main_function(){
	console.log("Si entro a main function");
    if(exigir("program")){
        if(exigir("(")){
            if(exigir(")")){
                if(exigir("{")){
                    body();
                    if(exigir("}")){

                    }else
                        errorCreater("Error, unexpected token found, was expected: }", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
                }else
                    errorCreater("Error, unexpected token found, was expected: {", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
            }else
                errorCreater("Error, unexpected token found, was expected: )", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
        }else
            errorCreater("Error, unexpected token found, was expected: (", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
    }else
        errorCreater("Error, unexpected token found, was expected: program", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
}


//<function> := "void" <name function> "("   ")" "{" <body> "}"
function funFunction() {
	console.log("Si entro a funfunction");
    if ( exigir( "void" ) ) {
        nameOfFunction();
	    if ( exigir( "(" ) ) {
	        if ( exigir ( ")" ) ) {
	            if ( exigir ( "{"  ) ) {
	                body();
                    if ( exigir( "}" ) ) {
		            }else
                        errorCreater("Error, unexpected token found, was expected: }", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
	            } else
	                errorCreater("Error, unexpected token found, was expected: {", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
            } else
                errorCreater("Error, unexpected token found, was expected: )", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
        } else
            errorCreater("Error, unexpected token found, was expected: (", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
    } else
        errorCreater("Error, unexpected token found, was expected: void", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
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
	console.log("Si entro a body");
    if( verificar("flip") || verificar("getCard") || verificar("putCard") || verificar("if") || verificar("while") || verificar("iterate") || verificarcostumer()){
    	console.log("Entra al if de body");
    	expression();
    	bodyAlpha();
    }
}

//<body alpha> ::= //<expression> //<body alpha> | LAMBDA
function bodyAlpha(){
	console.log("Si entro a body alpha");
    if( verificar("flip") || verificar("getCard") || verificar("putCard") || verificar("if") || verificar("while") || verificar("iterate") || verificarcostumer()){
        console.log("Entra al if de body alpha");
        expression();
        bodyAlpha();
    }
}

//<expression> ::= //<call function> //<if expression> |//<while expression> | //<iterate expression>

function expression(){
	console.log("Si entro a expression");
    if(verificar("if"))
        funIf();
    else if(verificar("while"))
        funWhile();
    else if(verificar("iterate"))
        iterate();
    else
    	callFunction();

}


//<call function> ::= //<name of function>
function callFunction(){

    nameOfFunction();
}

//<name of function> ::= //<official function> | //<customer function>

function nameOfFunction(){
	console.log("Si entro a Name of Function");
    if(verificar('flip') || verificar('getCard') || verificar('putCard')){
        official();
    }
    else if (verificar('{') || verificar('}') || verificar('(') || verificar(')')){
    	errorCreater("Error, missing statement calling function, was expected the name of function", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
    }
    else {
        console.log(newFunctions);
        customer();
    }
}

//<official function> ::= "flip" | "getCard" "(" //<number of deck> ")" | "putCard" "(" //<number of deck> ")"
function official(){
    if(verificar("flip")){
    	codIntermedio[pos++] = FLIP;
        exigir("flip");
        console.log("Le hizo flip")
    }else if(verificar("getCard")){
    	codIntermedio[pos++] = GETCARD;
        exigir("getCard");
        if(exigir("(")){
            console.log("Pidiendo número de deck");
            numberOfDeck();
            if(exigir(")")){
            }else
                errorCreater("Error, unexpected token found, was expected: )", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
        }else
            errorCreater("Error, unexpected token found, was expected: (", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
    }else if(verificar("putCard")){
        exigir("putCard");
        codIntermedio[pos++] = PUTCARD;
        if(exigir("(")){
            numberOfDeck();
            console.log("Pidiendo número de deck");
            if(exigir(")")){

            }else
                errorCreater("Error, unexpected token found, was expected: )", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
        }else
            errorCreater("Error, unexpected token found, was expected: (", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
    }else
        errorCreater("Error, unexpected token found, was expected: void - getCard - putCard", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
}



function verificarcostumer(){
  console.log(tokens[matCurrPlaceFil][matCurrPlaceCol]);
	return newFunctions.includes(tokens[matCurrPlaceFil][matCurrPlaceCol]);
}


//<customer function> ::= is a string with only letters th9 at was defined in a //<function> previously.
function customer(){
	console.log("Custome Function");
    //
    if(tokens[matCurrPlaceFil].length > matCurrPlaceCol){
    }else{
        matCurrPlaceFil++;
        matCurrPlaceCol = 0;
    }
    console.log(tokens[matCurrPlaceFil][matCurrPlaceCol]);
    console.log(!terminales.includes(tokens[matCurrPlaceFil][matCurrPlaceCol]));
    if(!terminales.includes(tokens[matCurrPlaceFil][matCurrPlaceCol])){
        console.log(tokens[matCurrPlaceFil][matCurrPlaceCol]);
        if (!newFunctions.includes(tokens[matCurrPlaceFil][matCurrPlaceCol])) {
        	newFunctions.push(tokens[matCurrPlaceFil][matCurrPlaceCol]);
        	newValues.push(pos++);
        } else {
          let numbOfFunc = 0;

          codIntermedio[pos++] = CALL;

          for (var i = 0; i < newFunctions.length; i++) {
              if(newFunctions[i] == tokens[matCurrPlaceFil][matCurrPlaceCol]){
                numbOfFunc = i;
              }
          }
          codIntermedio[pos++] = newValues[numbOfFunc];
        }
        matCurrPlaceCol++;

    }
    else
        errorCreater("Error, function name is reserved", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
}


//<number of deck> ::=  is a number between 0 to 52 ( inclusive )

function numberOfDeck(){
     if(tokens[matCurrPlaceFil].length > matCurrPlaceCol){
    }else{
        matCurrPlaceFil++;
        matCurrPlaceCol = 0;
    }
    if(!isNaN(tokens[matCurrPlaceFil][matCurrPlaceCol])){
        if(tokens[matCurrPlaceFil][matCurrPlaceCol] >= 0 && tokens[matCurrPlaceFil][matCurrPlaceCol] < 53){
            codIntermedio[pos++] = tokens[matCurrPlaceFil][matCurrPlaceCol];
            console.log(tokens[matCurrPlaceFil][matCurrPlaceCol]);
        }
        else
            errorCreater("Error, Expected number between 0 and 52, found another number", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
    }
    else
        errorCreater("Error, Expected number found string or something else", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
    matCurrPlaceCol++;
}

//<if expression> ::= "if" ( //<conditional> ) "{" //<body> "}"  //<elseif>

function funIf(){
	console.log("Si entro al if");
    if (exigir("if")){
    	codIntermedio[pos++] = IF;
        if (exigir("(")){
        	codIntermedio[pos++] = CONDICIONAL;
            conditional();
            if (exigir(")")){
                if (exigir("{")) {
                    //Esta linea que paso?
                	codIntermedio[pos++] = JMP;
                	stack.push(pos++);
                    body();
                    if (exigir("}")) {
                        funElseif();
                    }else
                        errorCreater("Error, unexpected token found, was expected: }", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
                }else
                    errorCreater("Error, unexpected token found, was expected: {", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
            }else
                errorCreater("Error, unexpected token found, was expected: )", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
        }else
            errorCreater("Error, unexpected token found, was expected: (", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
    }else
        errorCreater("Error, unexpected token found, was expected: if", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
}

//<elseif> ::= "else" "{" //<body> "}" | LAMBDA

function funElseif(){
	console.log("Si entro al else");
	if(verificar("else")){
        exigir("else");
        if(exigir("{")){
        	codIntermedio[stack.pop()] = pos + 2;
        	codIntermedio[pos++] = JMP;
        	stack.push(pos++);
            body();
            if(exigir("}")){
            	codIntermedio[stack.pop()] = pos;
            }else
                errorCreater("Error, unexpected token found, was expected: }", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
        }else
            errorCreater("Error, unexpected token found, was expected: {", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
    }else{
		codIntermedio[pos++] = stack.pop();
	}
}


//<while expression> ::= "while" "(" //<conditional> ")" "{" //<body> "}"

function funWhile(){
	console.log("Si entro al while");
    if(exigir("while")){
    	codIntermedio[pos++] = WHILE;
	    stack.push(pos);
        if(exigir("(")){
	        codIntermedio[pos++] = CONDICIONAL;
            conditional();
            if(exigir(")")){
                if(exigir("{")){
                	codIntermedio[pos++] = JMP;
                	stack.push(pos++);
                    body();
                    codIntermedio[pos++] = JMP;
                    codIntermedio[stack.pop()] = pos+2;
                    codIntermedio[pos++] = stack.pop();
                    if(exigir("}")){

                    }else
                        errorCreater("Error, unexpected token found, was expected: }", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
                }else
                    errorCreater("Error, unexpected token found, was expected: {", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
            }else
                errorCreater("Error, unexpected token found, was expected: )", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
        }else
            errorCreater("Error, unexpected token found, was expected: (", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
    }else
        errorCreater("Error, unexpected token found, was expected: while", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
}

//<iterate expression> ::= "iterate" "(" //<number> ")" "{" //<body> "}"

function iterate(){
    if(exigir("iterate")){
    	codIntermedio[pos++] = ITERATE;
    	stack.push(pos++);
        if(exigir("(")){
            number();
            if(exigir(")")){
                if(exigir("{")){
                    body();
                    codIntermedio[pos++] = JMP;
                    codIntermedio[pos++] = stack.pop();
                    if(exigir("}")){

                    }else
                        errorCreater("Error, unexpected token found, was expected: }", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
                }else
                    errorCreater("Error, unexpected token found, was expected: {", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
            }else
                errorCreater("Error, unexpected token found, was expected: )", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
        }else
              errorCreater("Error, unexpected token found, was expected: (", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
    }else
        errorCreater("Error, unexpected token found, was expected: iterate", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
}

//<conditional> ::= //<card simple condition> | //<card composed condition> | //<deck simple condition>

function conditional() {
    if (verificar("isRed") || verificar("isBlack") || verificar("isHeart") || verificar("isClubs") || verificar("isDiamond") || verificar("isSpaces") || verificar("isNotRed") || verificar("isNotBlack") || verificar("isNotHear") || verificar("isNotClubs") || verificar("isNotDiamond") || verificar("isNotSpades")){
        console.log("Encontramos una card simple function");
        cardSimpleFunction();
    }else if(verificar("VALUE")) {
        console.log("Encontramos una card composed function");
        cardComposedCondition();
    }
    else if(verificar("isEmpty") || verificar("isNotEmpty")){
        console.log("Encontramos una deck simple function");
        deckSimpleCondition();
    }
    else
        errorCreater("Error, Expected a valid conditional, found something else", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
}
//<card simple condition> ::= "isRed" | "isBlack" | "isHeart" | "isClubs" | "isDiamond" | "isSpades" | "isNotRed" | "isNotBlack" | "isNotHeart" | "isNotClubs" | "isNotDiamond" | "isNotSpades"

function cardSimpleFunction(){
    if(verificar("isRed")){
    	codIntermedio[pos++] = ConstIsRed;
	    exigir("isRed");
    }
    else if(verificar("isBlack")) {
    	codIntermedio[pos++] = ConstIsBlack;
	    exigir("isBlack");
    }
    else if(verificar("isHeart")){
    	codIntermedio[pos++] = ConstIsHeart;
	    exigir("isHeart");
    }
    else if(verificar("isClubs")){
    	codIntermedio[pos++] = ConstIsClubs;
	    exigir("isClubs");
    }
    else if(verificar("isDiamond")){
    	codIntermedio[pos++] = ConstIsDiamond;
	    exigir("isDiamond");
    }
    else if(verificar("isSpades")){
    	codIntermedio[pos++] = ConstIsSpades;
	    exigir("isSpades");
    }
    else if(verificar("isNotRed")){
    	codIntermedio[pos++] = ConstIsNotRed;
	    exigir("isNotRed");
    }
    else if(verificar("isNotBlack")){
    	codIntermedio[pos++] = ConstIsNotBlack;
	    exigir("isNotBlack");
    }
    else if(verificar("isNotHear")){
    	codIntermedio[pos++] = ConstIsNotHeart;
	    exigir("isNotHear");
    }
    else if(verificar("isNotClubs")){
    	codIntermedio[pos++] = ConstIsNotClubs;
	    exigir("isNotClubs");
    }
    else if(verificar("isNotDiamond")){
    	codIntermedio[pos++] = ConstIsNotDiamond;
	    exigir("isNotDiamond");
    }
    else if(verificar("isNotSpades")){
    	codIntermedio[pos++] = ConstIsNotSpades;
	    exigir("isNotSpades");
    }
}

//<card composed condition> ::= "VALUE" //<operator> //<number>

function cardComposedCondition(){
	console.log("Entra a la card composed condition");
    if(exigir("VALUE")){
	    codIntermedio[pos++] = CONSVALUE;
        if(verificar("<") || verificar(">") || verificar("<=") || verificar(">=") || verificar("==") || verificar("!=")){
            console.log("Encontramos un operador");
            operador();
            number();
        }else
            errorCreater("Error, Expected operator, found something else or it is missing", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
    }
}

//<number> ::= is a natural number between 1 - 13+
function number(){
    if(tokens[matCurrPlaceFil].length > matCurrPlaceCol){

    }else{
        matCurrPlaceFil++;
        matCurrPlaceCol = 0;
    }if(!isNaN(tokens[matCurrPlaceFil][matCurrPlaceCol])){
        if(tokens[matCurrPlaceFil][matCurrPlaceCol] % 1 == 0){
            if(tokens[matCurrPlaceFil][matCurrPlaceCol]>0 && tokens[matCurrPlaceFil][matCurrPlaceCol] < 14){
            	codIntermedio[pos++] = tokens[matCurrPlaceFil][matCurrPlaceCol];
                matCurrPlaceCol++;
            }else
                errorCreater("Error, number needs to be in range [1,13] ", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
        }else
            errorCreater("Error,number needs to be integer ", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
    }else
        errorCreater("Error, empty number ", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
}

//<operator> ::= "//<" | ">" | "//<=" | ">=" | "==" | "!="

function operador(){
    if(verificar("<")){
    	codIntermedio[pos++] = ConstMenorqueque;
	    exigir("<");
    }
    else if(verificar(">")){
    	codIntermedio[pos++] = ConstMayorque;
	    exigir(">");
    }
    else if(verificar("<=")){
    	codIntermedio[pos++] = ConstMenorigual;
	    exigir("<=");
    }
    else if(verificar(">=")){
    	codIntermedio[pos++] = ConstMayorigual;
	    exigir(">=");
    }
    else if(verificar("==")){
    	codIntermedio[pos++] = ConstIgualigual;
	    exigir("==");
    }
    else if(verificar("!=")){
    	codIntermedio[pos++] = ConstDiferente;
	    exigir("!=");
    }
}


//<deck simple condition> ::= isEmpty "(" //<number of deck> ")" | isNotEmpty "(" //<number of deck> ")"
function deckSimpleCondition(){
    if(verificar("isEmpty")){
    	exigir("isEmpty");
    	codIntermedio[pos++] = ConstIsEmpty;
        console.log("Encontramos un condicional simple de deck: isEmpty");
        if(exigir("(")){
            numberOfDeck();
            if(exigir(")")){

            }else
                errorCreater("Error, unexpected token found, was expected: )", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
        }else
            errorCreater("Error, unexpected token found, was expected: (", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
    }else if (verificar("isNotEmpty")){
	    exigir("isNotEmpty");
	    codIntermedio[pos++] = ConstIsNotEmpty;
	    console.log("Encontramos un condicional simple de deck: isNotEmpty");
        if(exigir("(")){
            numberOfDeck();
            if(exigir(")")){

            }else
                errorCreater("Error, unexpected token found, was expected: )", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
        }else
            errorCreater("Error, unexpected token found, was expected: (", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
    }
    else
        errorCreater("Expected a value conditional, found something else", tokens[matCurrPlaceFil][matCurrPlaceCol], matCurrPlaceFil, matCurrPlaceCol);
}
