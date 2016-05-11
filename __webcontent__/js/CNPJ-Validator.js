/**
 * Função para validação de CNPJ
 * Created by Rudiney Patrick on May 4, 2016
 * 
 * @param cnpj Objeto (elemento html) que contém o número do CNPJ a ser validado.
 **/
app.userEvents.validateCNPJ = function() {
//app.userEvents.validateCNPJ = function(cnpj) {
  var cnpj = event.srcElement;  //Obtem o valor do proprio elemento caller do evento.
	var strCNPJ = cnpj.value;
	
	var pesos = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
	var pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
	var numeros = new Array();
	var cnpjNumero = new Array();
	var resultMult = new Array();
	
	// Verifica se o conteúdo do CNPJ informado válido
	if(strCNPJ == undefined || strCNPJ.length == 0){
		//alert("CNPJ invalido!");
		return false;
	}
	
	// Organiza os algarismos do CNPJ em array
	for(var i = 0; i <= 13; i++) {
		numeros[i] = cnpjNumero[i] = strCNPJ.charAt(i);
	}
	
	//console.log(numeros);
	
	// Valida CNPJ com todos os algarismos repetidos (ex. 00.000.000/0000-00)
	var numeroRepetido = true;
	for(var i = 0; i < (cnpjNumero.length - 1); i++){
		if(cnpjNumero[i] != cnpjNumero[i + 1]) {
			numeroRepetido = false;
			break;
		}
	}
	
	if(numeroRepetido) {
	  //$("#cnpjAlert").show();
	  getAlertCNPJ(event).show();
	  //cnpj.value = "";
	  
		return false;
	}
	
	// Multipica cada algarismo pelo seu peso correspondente.
	for(var i = 0; i < pesos.length; i++) {
		resultMult[i] = numeros[i] * pesos[i];
	}
	
	// console.log(resultMult);
	
	// Calcula a somatória da multiplicação (algarismo x peso)
	var somatoria = 0;
	for(var i = 0; i < resultMult.length; i++) {
		somatoria += resultMult[i];
	}
	
	//console.log(somatoria);
	
	// Obtem o primeiro digito verificador
	var resto1 = somatoria % 11;
	var digitoVerificador1 = resto1 < 2 ? 0 : (11 - resto1);
	
	//console.log("Digito Verificador 1: " + digitoVerificador1);
	
	// Multipica cada algarismo pelo seu peso correspondente, agora acrescentando o primeiro digito verificador.
	numeros[12] = digitoVerificador1;
	resultMult = new Array();
	for(var i = 0; i < pesos2.length; i++) {
		resultMult[i] = numeros[i] * pesos2[i];
	}
	
	//console.log(resultMult);
	
	// Calcula a somatória da multiplicação (algarismo x peso)
	var somatoria = 0;
	for(var i = 0; i < resultMult.length; i++) {
		somatoria += resultMult[i];
	}
	
	//console.log(somatoria);
	
	// Obtem o segundo digito verificador
	var resto2 = somatoria % 11;
	var digitoVerificador2 = (11 - resto2) > 9 ? 0 : (11 - resto2);
	
	//console.log("CNPJ: " + strCNPJ + " - Digito Verificador 1: " + digitoVerificador1 + " - Digito Verificador 2: " + digitoVerificador2);
	
	// Valida os digitos do CNPJ informado
	if(cnpjNumero[12] == digitoVerificador1 &&
	   cnpjNumero[13] == digitoVerificador2) {
		   cnpj.value = autoApplyMaskToCNPJ(cnpj.value);
		   //$("#cnpjAlert").hide();
		   getAlertCNPJ(event).hide();
		   return true;
	} else {
		//alert("CNPJ invalido!");
		//$("#cnpjAlert").show();
		getAlertCNPJ(event).show();
		//cnpj.value = "";
		return false;
	}
};

function autoApplyMaskToCNPJ(input) {
		var str = input + '';
	    	str = str.replace(/\D/g,'');
	    	str = str.replace(/^(\d{2})(\d)/,'$1.$2');
	    	str = str.replace(/^(\d{2})\.(\d{3})(\d)/,'$1.$2.$3');
	    	str = str.replace(/\.(\d{3})(\d)/,'.$1/$2');
	    	str = str.replace(/(\d{4})(\d)/,'$1-$2');
			
	    return str;
};


app.userEvents.removeMaskFromCNPJ = function(){
  // $("#cnpjAlert").hide();
  getAlertCNPJ(event).hide();
  
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

// Função que retorna o elemento responsável pela exibição da div de mensagem de alerta, para o elemento caller.
// Necessário, pois pode haver mais de um componente validador (CPF/CNPJ) na tela.
function getAlertCNPJ(event) {
    var elementCaller = event.srcElement; // Obtem o elemento caller do evento.
    var msgAlert = $(elementCaller).parent().find("div[id=cnpjAlert]");  // Obtem o elemento de mensagem para o caller do evento.
    
    return msgAlert;
}