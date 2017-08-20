function goBuscaRazao(){
	document.getElementById('divResultado').style.display='none';
	var nome=document.getElementById('tParm').value;
	window.localStorage.setItem("pgEmps",0);
    window.localStorage.setItem("passoEmps",50);
	var url = "http://clever-jetserver.rhcloud.com/crmws/ajax/chooseRazao.jsonx?parm="+nome;
	$.get(url, function(data) {
    	$("#spanSaida").empty();
    	var dto=JSON.stringify(data);
    	window.localStorage.setItem("dto",dto);
    	exibeResultadps();
	}
	);
}

function exibeResultadps(){
	var indice=window.localStorage.getItem("pgEmps");
	var passo=window.localStorage.getItem("passoEmps");
	var start=parseInt(indice, 10)*parseInt(passo, 10);
	var n=start+passo;
	var dados=window.localStorage.getItem("dto");
	var empresas=getJson(dados);
	if (n > empresas.length){
		n=empresas.length;
	}
	var dto=window.localStorage.getItem("dto");
	var empresas=JSON.parse(dados);
	var tInicial=240;
	for (var i = 0; i < n; i++){
		var empresa=empresas[i];
		var codigo=empresa.rc;
        var nome=empresa.rs;
        var top=tInicial+(i*50);
        var parte='<span id="spanLin'+i+'" style="padding: 10px;position:absolute;width:350px;height:50px;top:'+top+'px;left:0px;right:0px;margin:auto;"><a href="javascript:getEmpresa('+codigo+');" class="z" style="font-size: 25px;">'+nome+'</a></span><br><br>';
        $('#spanSaida').append(parte);
        var elemento=document.getElementById('spanLin'+i);
        elemento.classList.add('cantinhos');
	}
}

function getEmpresa(codigo){
	alert("Buscando empresa "+codigo+"...");
	var url="http://clever-jetserver.rhcloud.com/crmws/ajax/getRegistro.jsonx?nomeClasse=Empresas&valor="+codigo+"&campo=id&tipoCampo=String";
	$.get(url, function(dados){
		alert("Chegou!");
		var dto=JSON.stringify(data);
		alert("strignificado, fazer replace...");
		dto=dto.replaceAll('\\n','<br>');
		alert("repla�ado. Mostrando...");
		mostraEmpresa(dto);
	});
}

function mostraEmpresa(dto){
	alert("Entrou");
	var dados=JSON.parse(dto);
	alert("Parssados");
	var empresa=getJson(dados);
	alert("Virou empresa");
	$("#spanSaida").empty();
	if (empresa.email == 'null'){empresa.email='';}
	if (empresa.website == 'null'){empresa.website='';}
	if (empresa.contatoEmpresa == 'null'){empresa.contatoEmpresa='';}
	if (empresa.cargoContato == 'null'){empresa.cargoContato='';}
	if (empresa.deptoContato == 'null'){empresa.deptoContato='';}
	if (empresa.emailContato == 'null'){empresa.emailContato='';}
	if (empresa.pabx == 'null'){empresa.pabx='';}
	if (empresa.obs == 'null'){empresa.obs='';}
	alert("Dados formatados, abrir janela...");
	formataDadosEmpresa(empresa);
}

function formataDadosEmpresa(empresa){
	alert("Abrindo...");
    document.getElementById('divResultado').style.display='block';
    alert("Aberto");
    document.getElementById('tRS').innerHTML=empresa.razaoSocial;
    document.getElementById('tFanta').innerHTML=empresa.fantasia;
    document.getElementById('tEmail').innerHTML=empresa.email;
    document.getElementById('tSite').innerHTML=empresa.website;
    document.getElementById('tContato').innerHTML=empresa.contatoEmpresa;
    document.getElementById('tCargo').innerHTML=empresa.cargoContato;
    document.getElementById('tDepto').innerHTML=empresa.deptoContato;
    document.getElementById('tMC').innerHTML=empresa.emailContato;
    document.getElementById('tPabx').innerHTML=empresa.pabx;
    document.getElementById('tObs').innerHTML=empresa.obs;
}

// http://node27.codenvy.io:38899/ajax/getRegistro.jsonx?nomeClasse=Empresas&valor=985&campo=id&tipoCampo=String
// http://clever-jetserver.rhcloud.com/crmws/ajax/getRegistro.jsonx?nomeClasse=Empresas&valor=985&campo=id&tipoCampo=String
// [{"codigo":"cnpj","nome":"64674393200012","marcado":false},{"codigo":"email","nome":null,"marcado":false},{"codigo":"razaoSocial","nome":"clevermidia","marcado":false},{"codigo":"obs","nome":"PIS: 108.98695.59.4\n\nAT&T network:\nftp://ftp.attglobal.net/pub/custom/ibm_linux/agnclient-1.0-2.0.1.3003.i386.rpm\n\nftp://ftp.attglobal.net/pub/custom/ibm_linux/","marcado":false},{"codigo":"fantasia","nome":"clevermidia","marcado":false},{"codigo":"ie","nome":null,"marcado":false},{"codigo":"cargoContato","nome":null,"marcado":false},{"codigo":"codTipoendereco","nome":"0","marcado":false},{"codigo":"contatoEmpresa","nome":"Luis","marcado":false},{"codigo":"dddfax","nome":null,"marcado":false},{"codigo":"dddPABX","nome":"11","marcado":false},{"codigo":"deptoContato","nome":"Diretoria","marcado":false},{"codigo":"dtAtualizacao","nome":"","marcado":false},{"codigo":"dtUltContato","nome":"","marcado":false},{"codigo":"emailContato","nome":"luis@clevermidia.com.br","marcado":false},{"codigo":"faturamento","nome":null,"marcado":false},{"codigo":"fax","nome":null,"marcado":false},{"codigo":"mailing","nome":"0","marcado":false},{"codigo":"numeroFuncionarios","nome":"0","marcado":false},{"codigo":"pabx","nome":"3010-0440","marcado":false},{"codigo":"produtosServicos","nome":"CRM Clevermidia, Chever House Im�veis","marcado":false},{"codigo":"ramoAtividade","nome":"0","marcado":false},{"codigo":"website","nome":"clevermidia.com.br","marcado":false},{"codigo":"status","nome":null,"marcado":false},{"codigo":"id","nome":"985","marcado":false}]

// http://node28.codenvy.io:38805/getContatosEmpresa.jsonx?codigo=985
// http://clever-jetserver.rhcloud.com/crmws/getContatosEmpresa.jsonx?codigo=985
// {"registros":[{"nome":"Luis","tipoFone":"1","email":"luis@clevermidia.com.br","ddd":"11","fone":"8268-8888","depto":"Diretoria","anoNasc":"null","apelido":"Luis","campo1":"null","campo2":"null","campo3":"null","campo4":"null","campo5":"null","cargo":"mkt","celMsg":"null","conjuge":"S�nia","cpf":"04377945820","dddMsg":"null","diaNasc":"11","dtNasc":"","mesNasc":"09","referencia":"20017535122","sexo":"M","valor1":"null","valor2":"null","valor3":"null","valor4":"null","valor5":"null","status":"0","id":"1049"}]}

// http://node28.codenvy.io:39691/getFonesContato.jsonx?codigo=1049
// http://clever-jetserver.rhcloud.com/crmws/getFonesContato.jsonx?codigo=1049
// {"registros":[{"tipoFone":"5","ddd":"11","fone":"2683-8281","codContato":"1049","id":"183"}]}

