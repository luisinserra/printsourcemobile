function goBuscaRazao(){
	var nome=document.getElementById('tParm').value;
	window.localStorage.setItem("pgEmps",0);
    window.localStorage.setItem("passoEmps",5);
	var url = "http://clever-jetserver.rhcloud.com/crmws/ajax/getListaTabela.html?parm="+nome;
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
	
}