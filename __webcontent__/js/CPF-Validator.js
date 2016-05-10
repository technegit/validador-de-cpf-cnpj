/**
 * Função para validação de CPF
 * Created by Rudiney Patrick on May 3, 2016
 * 
 * @param cpf Objeto (elemento html) que contém o número do CPF a ser validado.
 **/
app.userEvents.validateCPF = function(){
//app.userEvents.validateCPF = function(cpf) {
  var cpf = event.srcElement; // Obtem o valor do proprio elemento caller do evento.
	var strCPF = cpf.value;
	//strCPF = strCPF.replace('.', '');
		
	var pesos  = [10, 9, 8, 7, 6, 5, 4, 3, 2];
	var pesos2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
	var numeros = new Array();
	var cpfNumero = new Array();
	var resultMult = new Array();
	
	// Verifica se o conteúdo do CPF informado válido
	if(strCPF == undefined || strCPF.length == 0){
		//alert("CPF invalido!");
		return false;
	}
	
	// Organiza os algarismos do CPF em array
	for(var i = 0; i <= 10; i++) {
		numeros[i] = cpfNumero[i] = strCPF.charAt(i);
	}
	
	// Valida CPF com todos os algarismos repetidos (ex. 111.111.111-11)
	var numeroRepetido = true;
	for(var i = 0; i < (cpfNumero.length - 1); i++){
		if(cpfNumero[i] != cpfNumero[i + 1]) {
			numeroRepetido = false;
			break;
		}
	}
	
	if(numeroRepetido) {
	  cpf.value = "";
	  
		return false;
	}
	
	// Multipica cada algarismo pelo seu peso correspondente.
	for(var i = 0; i < pesos.length; i++) {
		resultMult[i] = numeros[i] * pesos[i];
	}
	
	// Calcula a somatória da multiplicação (algarismo x peso)
	var somatoria = 0;
	for(var i = 0; i < resultMult.length; i++) {
		somatoria += resultMult[i];
	}
	
	// Obtem o primeiro digito verificador
	var resto1 = somatoria % 11;
	var digitoVerificador1 = (11 - resto1) > 9 ? 0 : (11 - resto1);
	
	
	// Multipica cada algarismo pelo seu peso correspondente, agora acrescentando o primeiro digito verificador.
	numeros[9] = digitoVerificador1;
	resultMult = new Array();
	for(var i = 0; i < pesos2.length; i++) {
		resultMult[i] = numeros[i] * pesos2[i];
	}
	
	// Calcula a somatória da multiplicação (algarismo x peso)
	var somatoria = 0;
	for(var i = 0; i < resultMult.length; i++) {
		somatoria += resultMult[i];
	}
	
	// Obtem o segundo digito verificador
	var resto2 = somatoria % 11;
	var digitoVerificador2 = (11 - resto2) > 9 ? 0 : (11 - resto2);
	
	// console.log("CPF: " + strCPF + " - Digito Verificador 1: " + digitoVerificador1 + " - Digito Verificador 2: " + digitoVerificador2);
	
	// Valida os digitos do CPF informado
	if(cpfNumero[9] == digitoVerificador1 &&
	   cpfNumero[10] == digitoVerificador2) {
		   cpf.value = autoApplyMaskToCPF(cpf.value);
		   return true;
	} else {
		//alert("CPF invalido!");
		cpf.value = "";
		return false;
	}
};


function autoApplyMaskToCPF(input) {
		var str = input + '';
	      str = str.replace(/\D/g,'');
	    	str = str.replace(/^(\d{3})(\d)/,'$1.$2');
	    	str = str.replace(/^(\d{3})\.(\d{3})(\d)/,'$1.$2.$3');
	    	str = str.replace(/\.(\d{3})(\d)/,'.$1-$2');
	    	str = str.replace(/(\d{4})(\d)/,'$1-$2');
			
	    return str;
};


app.userEvents.removeMaskFromCPF = function(){
  var input = event.srcElement;
  var str = input.value + '';
	var chars = ['.', '-', '/'];
	
	for(var i = 0; i < chars.length; i++) {
		str = replaceAll(str, chars[i], '');
	}
	
	return 	(input.value = str);
};


function replaceAll(str, oldChar, newChar) {
	while (str.indexOf(oldChar) != -1) {
 		str = str.replace(oldChar, newChar);
	}
	
	return str;
};