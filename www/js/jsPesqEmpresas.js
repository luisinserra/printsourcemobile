function goBuscaRazao(){
	document.getElementById('divResultado').style.display='none';
	var nome=document.getElementById('tParm').value;
	window.localStorage.setItem("pgEmps",0);
    window.localStorage.setItem("passoEmps",50);
	var url = "http://clevermidia.com.br/printsource/crmws/ajax/chooseRazao.jsonx?parm="+nome;
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
	window.localStorage.setItem("codEmpresa",codigo);
	var url="http://clever-jetserver.rhcloud.com/crmws/ajax/getRegistro.jsonx?nomeClasse=Empresas&valor="+codigo+"&campo=id&tipoCampo=String";
	$.get(url, function(dados){
		var dto=JSON.stringify(dados);
		dto=dto.replaceAll('\\n','<br>');
		mostraEmpresa(dto);
	});
}

function mostraEmpresa(dto){
	var dados=JSON.parse(dto);
	var empresa=getJson(dados);
	var ddEmpresa=JSON.stringify(empresa);
	window.localStorage.setItem("ddEmpresa",ddEmpresa);
	$("#spanSaida").empty();
	if (empresa.email == 'null'){empresa.email='';}
	if (empresa.website == 'null'){empresa.website='';}
	if (empresa.contatoEmpresa == 'null'){empresa.contatoEmpresa='';}
	if (empresa.cargoContato == 'null'){empresa.cargoContato='';}
	if (empresa.deptoContato == 'null'){empresa.deptoContato='';}
	if (empresa.emailContato == 'null'){empresa.emailContato='';}
	if (empresa.pabx == 'null'){empresa.pabx='';}
	if (empresa.obs == 'null'){empresa.obs='';}
	formataDadosEmpresa(empresa);
}
function formataDadosEmpresa(empresa){
    document.getElementById('divResultado').style.display='block';
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

function pegaContatos(){
	window.open('contatos.html','_top');
}
function carregouContatos(){
	var ddEmpresa=window.localStorage.getItem("ddEmpresa");
	var empresa=JSON.parse(ddEmpresa);
	var razao=empresa.razaoSocial;
	document.getElementById('tRazao').innerHTML=razao;

	var url="http://clever-jetserver.rhcloud.com/crmws/getContatosEmpresa.jsonx?codigo="+empresa.id;
	$.get(url, function(dados) {
		var contatos=dados.registros;
		exibeContatos(contatos);
	});
}
function exibeContatos(contatos){
	var parte='';
	var n=contatos.length;
	var idsContatos='';
	for (var i = 0; i < n; i++) {
		var contato=contatos[i];
		if (idsContatos != ''){
			idsContatos+=',';
		}
		idsContatos+=contato.id;
		if (contato.email == 'null'){ contato.email='';}
		if (contato.depto == 'null'){contato.depto='';}
		if (contato.cargo == 'null'){contato.cargo='';}
		parte+='<div class="container cantonado">';
		parte+='	<div class="row">';
		parte+='		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">';
		parte+='			<span style="float: right;"><b>Nome</b></span>';
		parte+='		</div>';
		parte+='		<div class="col-xs-9 col-sm-9 col-md=9 col-lg-9">';
		parte+='			'+contato.nome;
		parte+='		</div>';
		parte+='	</div>';
		parte+='';
		parte+='	<div class="row">';
		parte+='		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">';
		parte+='			<span style="float: right;"><b>E-mail</b></span>';
		parte+='		</div>';
		parte+='		<div class="col-xs-9 col-sm-9 col-md=9 col-lg-9">';
		parte+='			'+contato.email;
		parte+='		</div>';
		parte+='	</div>';
		parte+='';
		parte+='	<div class="row">';
		parte+='		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">';
		parte+='			<span style="float: right;"><b>Depto</b></span>';
		parte+='		</div>';
		parte+='		<div class="col-xs-9 col-sm-9 col-md=9 col-lg-9">';
		parte+='			'+contato.depto;
		parte+='		</div>';
		parte+='	</div>';
		parte+='';
		parte+='	<div class="row">';
		parte+='		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">';
		parte+='			<span style="float: right;"><b>Cargo</b></span>';
		parte+='		</div>';
		parte+='		<div class="col-xs-9 col-sm-9 col-md=9 col-lg-9">';
		parte+='			'+contato.cargo;
		parte+='		</div>';
		parte+='	</div>';
		parte+='<center><B>Fones</B></center>';
		parte+='<span id="spanFone'+i+'"></span>';
		parte+='</div>';
		parte+='<br>';
	}

	document.getElementById('spanContatos').innerHTML=parte;
	putMemo('curId',0);
	putMemo('idsContatos',idsContatos);
	complementaTelefones();
}
function complementaTelefones(){
	var idsContatos=getMemo('idsContatos');
	if (idsContatos != ''){
		var termos=idsContatos.split(',');
		var idx=getMemo('curId');
		idx=parseInt(idx,10);
		if (idx < termos.length){
			var codigo=termos[idx];
			idx++;
			putMemo('curId',idx);
			getFonesContato(codigo);
		}
	}
}
function getFonesContato(codigo){
	var url="http://clever-jetserver.rhcloud.com/crmws/getFonesContato.jsonx?codigo="+codigo;
	$.get(url, function(dados) {
		var fones=dados.registros;
		exibeFones(fones);
	});
}
function exibeFones(fones){
	var parte='';
	var n=fones.length;
	for (var i = 0; i < n; i++){
		var fone=fones[i];
		var tipo=fone.tipoFone;
		var nometipo="";
		if (tipo == 1){nometipo='Celular';}
		if (tipo == 2){nometipo='Comercial';}
		if (tipo == 3){nometipo='Fax';}
		if (tipo == 4){nometipo='Residencial';}
		if (tipo == 5){nometipo='Módulo';}
		if (tipo == 9){nometipo='Nextel';}
		if (tipo == 11){nometipo='Oi';}
		if (tipo == 12){nometipo='Claro';}
		if (tipo == 14){nometipo='Vivo';}
		var ddd=fone.ddd;
		if (ddd == 'null'){ddd='';}
		var fone=fone.fone;
		if (fone == 'null'){fone='';}
		parte+='	<div class="row">';
		parte+='		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">';
		parte+='			'+nometipo;
		parte+='		</div>';
		parte+='		<div class="col-xs-9 col-sm-9 col-md=9 col-lg-9">';
		parte+='			('+ddd+') '+fone;
		parte+='		</div>';
		parte+='	</div>';
		parte+='<br>';
	}
	var idx=getMemo("curId");
	idx=parseInt(idx,10);
	idx--;
	var elemento=document.getElementById('spanFone'+idx);
	elemento.innerHTML=parte;
	complementaTelefones();
}

function pegaEnderecos(){
	window.open('enderecos.html','_top');
}
function carregaEnderecos(){
	var ddEmpresa=window.localStorage.getItem("ddEmpresa");
	var empresa=JSON.parse(ddEmpresa);
	var razao=empresa.razaoSocial;
	document.getElementById('tRazao').innerHTML=razao;

	var url="http://clever-jetserver.rhcloud.com/crmws/getEnderecosEmpresa.html?codigo="+empresa.id;

	var negocio='http://clever-jetserver.rhcloud.com/crmws/getEnderecosEmpresa';
    var funcao='';
    var parms="&codigo="+empresa.id;
    putMemo('encoda','S');
    putMemo('retornoAx', 'retornoKK');
    chamaJSon(negocio,funcao,parms);

    /*
	$.get(url, function(dados) {
		var enderecos=dados.registros;
		alert("Chamando exibição para "+enderecos+"...");
		exibeEnderecos(enderecos);
	}).fail(function (e){
		alert("Falha");
		alert(e.getMessage());
	});
	*/
}
function retornoKK(dados){
	var enderecos=dados.registros;
	exibeEnderecos(enderecos);
}
function exibeEnderecos(enderecos){
	var parte='';
	var n=enderecos.length;
	for (var i = 0; i < n; i++){
		var endereco=enderecos[i];
		var referencia=endereco.referencia;
		if (referencia == 'null'){referencia='';}
		var bairro=endereco.bairro;
		if (bairro == 'null'){bairro='';}
		var cep=endereco.cep;
		if (cep == 'null'){cep='';}
		var cidade=endereco.cidade;
		if (cidade == 'null'){cidade='';}
		var complemento=endereco.complemento;
		if (complemento == 'null'){complemento='';}
		var estado=endereco.estado;
		if (estado == 'null'){estado='';}
		var logradouro=endereco.logradouro;
		if (logradouro == 'null'){logradouro='';}
		var numero=endereco.numero;
		if (numero == 'null'){numero='';}
		var tipoLogradouro=endereco.tipoLogradouro;
		if (tipoLogradouro == 'null'){tipoLogradouro='';}
		parte+='<div class="container cantonado">';
		parte+='	<div class="row">';
		parte+='		<div class="col-xs-9 col-sm-9 col-md=9 col-lg-9">';
		parte+='			'+tipoLogradouro+' '+logradouro;
		parte+=', '+numero;
		if (complemento != ''){
			parte+=' - '+complemento;
		}
		parte+='		</div>';
		parte+='	</div>';
		parte+='	<div class="row">';
		parte+='		<div class="col-xs-9 col-sm-9 col-md=9 col-lg-9">';
		parte+='        	<B>Cidade:</B> '+cidade+'-'+estado;
		parte+='		</div>';
		parte+='	</div>';
		parte+='';
		if (referencia != ''){
			parte+='	</div>';
			parte+='	<div class="row">';
			parte+='		<div class="col-xs-9 col-sm-9 col-md=9 col-lg-9">';
			parte+='        	<B>Referência:</B> '+referencia;
			parte+='		</div>';
			parte+='	</div>';
		}
		parte+='<br>';
		parte+='</div>';
	}
	document.getElementById('spanEnderecos').innerHTML=parte;
}


function goBuscaContatos(){
	document.getElementById('divResultado').style.display='none';
	var nome=document.getElementById('tParm').value;
	window.localStorage.setItem("pgEmps",0);
    window.localStorage.setItem("passoEmps",50);
	var url = "http://clever-jetserver.rhcloud.com/crmws/ajax/chooseContatos.jsonx?parm="+nome;
	$.get(url, function(data) {
    	$("#spanSaida").empty();
    	var dto=JSON.stringify(data);
    	window.localStorage.setItem("dto",dto);
    	exibeResultadoContatos();
	}
	);
}
function exibeResultadoContatos(){
	var indice=window.localStorage.getItem("pgEmps");
	var passo=window.localStorage.getItem("passoEmps");
	var start=parseInt(indice, 10)*parseInt(passo, 10);
	var n=start+passo;
	var dados=window.localStorage.getItem("dto");
	var contatos=getJson(dados);
	if (n > contatos.length){
		n=contatos.length;
	}
	var dto=window.localStorage.getItem("dto");
	var contatos=JSON.parse(dados);
	var tInicial=240;
	for (var i = 0; i < n; i++){
		var contato=contatos[i];
		var codigo=contato.rc;
        var nome=contato.rs;
        var top=tInicial+(i*50);
        var parte='<span id="spanLin'+i+'" style="padding: 10px;position:absolute;width:350px;height:50px;top:'+top+'px;left:0px;right:0px;margin:auto;"><a href="javascript:getContato('+codigo+');" class="z" style="font-size: 25px;">'+nome+'</a></span><br><br>';
        $('#spanSaida').append(parte);
        var elemento=document.getElementById('spanLin'+i);
        elemento.classList.add('cantinhos');
	}
}
function getContato(codigo){
	window.localStorage.setItem("codContato",codigo);
	var url="http://clever-jetserver.rhcloud.com/crmws/ajax/getRegistro.jsonx?nomeClasse=Contatos&valor="+codigo+"&campo=id&tipoCampo=String";
	$.get(url, function(dados){
		var dto=JSON.stringify(dados);
		dto=dto.replaceAll('\\n','<br>');
		mostraContato(dto);
	});
}
function mostraContato(dto){
	var dados=JSON.parse(dto);
	var contato=getJson(dados);
	var ddContato=JSON.stringify(contato);
	window.localStorage.setItem("ddContato",contato);
	$("#spanSaida").empty();
	if (contato.email == 'null'){contato.email='';}
	if (contato.cargo == 'null'){contato.cargo='';}
	if (contato.depto == 'null'){contato.depto='';}
	if (contato.referencia == 'null'){contato.referencia='';}
	if (contato.apelido == 'null'){contato.apelido='';}
	formataDadosContato(contato);
}
function formataDadosContato(contato){
    document.getElementById('divResultado').style.display='block';
    document.getElementById('tNome').innerHTML=contato.nome;
    document.getElementById('tApelido').innerHTML=contato.apelido;
    document.getElementById('tEmail').innerHTML=contato.email;
    document.getElementById('tCargo').innerHTML=contato.cargo;
    document.getElementById('tDepto').innerHTML=contato.depto;
    document.getElementById('tRef').innerHTML=contato.referencia;
    getEmpresaByContato(contato.id)
}
function getEmpresaByContato(codContato){
	var negocio='http://clever-jetserver.rhcloud.com/crmws/getEmpresaByContato';
    var funcao='';
    var parms="&codigo="+codContato;
    putMemo('encoda','S');
    putMemo('retornoAx', 'retornoEmpresa');
    chamaJSon(negocio,funcao,parms);
}
function retornoEmpresa(dados){
	var empresa=dados.registros[0];
	var razao=empresa.razaoSocial;
	var fantasia=empresa.fantasia;
	var parte=razao+' ('+fantasia+')';
	document.getElementById('tEmpresa').innerHTML=parte;
}
// http://node27.codenvy.io:38899/ajax/getRegistro.jsonx?nomeClasse=Empresas&valor=985&campo=id&tipoCampo=String
// http://clever-jetserver.rhcloud.com/crmws/ajax/getRegistro.jsonx?nomeClasse=Empresas&valor=985&campo=id&tipoCampo=String
// [{"codigo":"cnpj","nome":"64674393200012","marcado":false},{"codigo":"email","nome":null,"marcado":false},{"codigo":"razaoSocial","nome":"clevermidia","marcado":false},{"codigo":"obs","nome":"PIS: 108.98695.59.4\n\nAT&T network:\nftp://ftp.attglobal.net/pub/custom/ibm_linux/agnclient-1.0-2.0.1.3003.i386.rpm\n\nftp://ftp.attglobal.net/pub/custom/ibm_linux/","marcado":false},{"codigo":"fantasia","nome":"clevermidia","marcado":false},{"codigo":"ie","nome":null,"marcado":false},{"codigo":"cargoContato","nome":null,"marcado":false},{"codigo":"codTipoendereco","nome":"0","marcado":false},{"codigo":"contatoEmpresa","nome":"Luis","marcado":false},{"codigo":"dddfax","nome":null,"marcado":false},{"codigo":"dddPABX","nome":"11","marcado":false},{"codigo":"deptoContato","nome":"Diretoria","marcado":false},{"codigo":"dtAtualizacao","nome":"","marcado":false},{"codigo":"dtUltContato","nome":"","marcado":false},{"codigo":"emailContato","nome":"luis@clevermidia.com.br","marcado":false},{"codigo":"faturamento","nome":null,"marcado":false},{"codigo":"fax","nome":null,"marcado":false},{"codigo":"mailing","nome":"0","marcado":false},{"codigo":"numeroFuncionarios","nome":"0","marcado":false},{"codigo":"pabx","nome":"3010-0440","marcado":false},{"codigo":"produtosServicos","nome":"CRM Clevermidia, Chever House Imóveis","marcado":false},{"codigo":"ramoAtividade","nome":"0","marcado":false},{"codigo":"website","nome":"clevermidia.com.br","marcado":false},{"codigo":"status","nome":null,"marcado":false},{"codigo":"id","nome":"985","marcado":false}]

// http://node28.codenvy.io:38805/getContatosEmpresa.jsonx?codigo=985
// http://clever-jetserver.rhcloud.com/crmws/getContatosEmpresa.jsonx?codigo=985
// {"registros":[{"nome":"Luis","tipoFone":"1","email":"luis@clevermidia.com.br","ddd":"11","fone":"8268-8888","depto":"Diretoria","anoNasc":"null","apelido":"Luis","campo1":"null","campo2":"null","campo3":"null","campo4":"null","campo5":"null","cargo":"mkt","celMsg":"null","conjuge":"Sônia","cpf":"04377945820","dddMsg":"null","diaNasc":"11","dtNasc":"","mesNasc":"09","referencia":"20017535122","sexo":"M","valor1":"null","valor2":"null","valor3":"null","valor4":"null","valor5":"null","status":"0","id":"1049"}]}

// http://node28.codenvy.io:39691/getFonesContato.jsonx?codigo=1049
// http://clever-jetserver.rhcloud.com/crmws/getFonesContato.jsonx?codigo=1049
// {"registros":[{"tipoFone":"5","ddd":"11","fone":"2683-8281","codContato":"1049","id":"183"}]}

// http://node29.codenvy.io:41186/getEnderecosEmpresa.html?codigo=985
// {"registros":[{"referencia":"null","empresa":"985","bairro":"null","cep":"null","cidade":"São Paulo","cnpjLocal":"null","codTpEndMais":"0","complemento":"null","estado":"SP","logradouro":"Particular A","numero":"53","tipoLogradouro":"TV","id":"3882"}]}

// http://node11.codenvy.io:40308/ajax/chooseContatos.jsonx?parm=Dani
// [{"rc":"2925","rs":"Dani Porto"},{"rc":"86","rs":"Daniel"},{"rc":"109","rs":"Daniel"},{"rc":"1915","rs":"DANIEL"},{"rc":"1250","rs":"DANIEL"},{"rc":"319","rs":"Daniel Accorsi"},{"rc":"824","rs":"Daniel Amato"},{"rc":"2926","rs":"Daniel Amato"},{"rc":"2479","rs":"Daniel Amato"},{"rc":"1133","rs":"Daniel Barna"},{"rc":"2928","rs":"Daniel Canello"},{"rc":"2929","rs":"Daniel Chaves"},{"rc":"741","rs":"Daniel Chohfi"},{"rc":"844","rs":"Daniel Claro Zanardi"},{"rc":"740","rs":"Daniel De Simone"},{"rc":"1073","rs":"DANIEL DESTRO"},{"rc":"2930","rs":"Daniel Duarte Filho"},{"rc":"2931","rs":"Daniel Ely Haziot"},{"rc":"2932","rs":"Daniel Ferian de Aguiar"},{"rc":"764","rs":"Daniel Filipe Vercellino Rodrigues"},{"rc":"2625","rs":"Daniel Golçalves"},{"rc":"2933","rs":"Daniel Kaestli"},{"rc":"1520","rs":"DANIEL MACHADO"},{"rc":"4071","rs":"Daniel Monteiro"},{"rc":"1214","rs":"Daniel Mornacco"},{"rc":"2934","rs":"Daniel Nakamura"},{"rc":"786","rs":"Daniel Nyari"},{"rc":"335","rs":"Daniel Paiva"},{"rc":"209","rs":"Daniel Peixoto"},{"rc":"220","rs":"Daniel Pissaia"},{"rc":"2935","rs":"Daniel Portela"},{"rc":"103","rs":"Daniel Reis Chaves"},{"rc":"2936","rs":"Daniel Spinola"},{"rc":"755","rs":"Daniel Tadeu Scapulatempo"},{"rc":"2937","rs":"Daniel Vieira"},{"rc":"2051","rs":"DANIELA"},{"rc":"1458","rs":"DANIELA"},{"rc":"2938","rs":"Daniela Alves"},{"rc":"2939","rs":"Daniela Barbieri"},{"rc":"1190","rs":"Daniela Bastos"},{"rc":"2940","rs":"Daniela Kneubil"},{"rc":"2941","rs":"Daniela Melo"},{"rc":"735","rs":"Daniela Pereira"},{"rc":"2942","rs":"Daniela Robles"},{"rc":"68","rs":"Daniele"},{"rc":"1674","rs":"DANIELE"},{"rc":"2491","rs":"Daniele Scaloni"},{"rc":"2943","rs":"Daniele Schneider Horst"},{"rc":"2009","rs":"Daniele Silva"},{"rc":"2432","rs":"Daniella Ayalla"},{"rc":"1618","rs":"Danielle"},{"rc":"2944","rs":"Danielle Carvalho (Dancka)"},{"rc":"2945","rs":"Danielle Francisquini"},{"rc":"4109","rs":"Danielle Nakashima"},{"rc":"1923","rs":"DANILA COSTA"},{"rc":"4101","rs":"Danilo"},{"rc":"2946","rs":"Danilo Barbieri Cordeiro"},{"rc":"1024","rs":"Danilo Camargo"},{"rc":"2947","rs":"Danilo Franco Kovacsik"}]

// http://node10.codenvy.io:40326/getEmpresaByContato.html?codigo=2925
