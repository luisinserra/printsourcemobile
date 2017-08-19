var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function goAcesso(){
    setTimeout('pronto()',5000);
}
function pronto(){
    var texto="Acesso concedido";
    document.getElementById('spanAcesso').innerHTML=texto; 
}

function getMassa(){
    var dados='[{"rc":"1296","rs":"ABC INSTRUMENTOS CIRURGICOS"},{"rc":"1013","rs":"Acgtech Instrumentação e Sistemas"},{"rc":"1912","rs":"ALBERT EINSTEIN"},{"rc":"1940","rs":"CeP INSTRUMENTAÇÃO E CONTROLE SS LTDA."},{"rc":"3020","rs":"FIA - Fundação Instituto de Administração"},{"rc":"1586","rs":"FUNDAÇÃO INST. MOLESTIA  APAR. DIGES.E DA NUTRIÇÃO"},{"rc":"1112","rs":"Goethe Inst SP-Centro Cul Brasil Alemanha"},{"rc":"2700","rs":"Heraeus Electro-Nite Instrumentos Ltda."},{"rc":"2765","rs":"Hospital Albert Einstein"},{"rc":"3275","rs":"iAi? Instituto de Artes Interativas"},{"rc":"1611","rs":"IBEP INSTITUTO BRASILEIRO DE EDIÇÕES PEDAGOGICAS L"},{"rc":"3056","rs":"IBEVAR - Instituto Brasileiro de Executivos de Var"},{"rc":"3325","rs":"IBGC - Instituto Brasileiro de Governanca Corporat"},{"rc":"3308","rs":"IEAGE - Instituto de Estudos Avançados de Gestão e"},{"rc":"2829","rs":"IMDEP ( Instituto de Melhoramento e Desenvolviment"},{"rc":"3570","rs":"IMO - Instituto de Moléstias Oculares"},{"rc":"3615","rs":"Insper - Institute of Education and Research"},{"rc":"2729","rs":"Insper Instituto de Ensino e Pesquisa"},{"rc":"2031","rs":"INSTITUTO ADOLFO LUTZ"},{"rc":"1145","rs":"Instituto Agogê"},{"rc":"2434","rs":"Instituto Aleph"},{"rc":"1626","rs":"INSTITUTO BRASILEIRO DE GOVERNANÇA CORPORATIVA"},{"rc":"3209","rs":"Instituto Central do Hospital das Clinicas"},{"rc":"3272","rs":"INSTITUTO DE DIREITO PRIVADO"},{"rc":"2905","rs":"Instituto de Políticas Governamentais e Assessoram"},{"rc":"3616","rs":"Instituto EcoSocial"},{"rc":"1627","rs":"INSTITUTO EDUCACIONAL OSWALDO QUIRINO"},{"rc":"3475","rs":"Instituto Inovação"},{"rc":"1223","rs":"INSTITUTO MONITOR"},{"rc":"3603","rs":"Instituto Orion"},{"rc":"576","rs":"Instituto Ponte do Saber"},{"rc":"1628","rs":"INSTITUTO PRESBITERIANO MACKENZIE"},{"rc":"1636","rs":"IPT - INSTITUTO DE PESQUISA TECNOLOGICA"},{"rc":"3653","rs":"Kaizen Institute Brazil"},{"rc":"3501","rs":"Keypeople Instituto de Desenvolvimento Humano"},{"rc":"3130","rs":"Lean Institute Brasil"},{"rc":"1236","rs":"MEGURO INSTRUMENTOS ELETRONICOS LTDA"},{"rc":"2074","rs":"PATRI POLITICAS PÚBLICAS, RELAÇÕES INST."},{"rc":"2092","rs":"SAS INSTITUTES BRASIL LTDA."},{"rc":"1268","rs":"SENSORES ELETRONICOS INSTRUTECH LTDA"},{"rc":"1786","rs":"SERVTEC INSTALACOES E MANUTENÇÃO LTDA"},{"rc":"2103","rs":"THIMON INSTRUMENTOS CIRURGICOS LTDA-ME"}]';
    return dados;
}

function testa(){
    window.localStorage.setItem("pgEmps",0);
    window.localStorage.setItem("passoEmps",5);
    var dados=getMassa();
    var json=JSON.parse(dados);
    var encodado=JSON.stringify(json);
    window.localStorage.setItem("json",encodado);
    goExibePgEmps();
}
function goExibePgEmps(){
    var dados=window.localStorage.getItem("json");
    var empresas=JSON.parse(dados);
    var indice=localStorage.getItem("pgEmps");
    var n=empresas.length;
    var tInicial=240;
    for (var i = 0; i < empresas.length; i++) {
        var empresa=empresas[i];
        var codigo=empresa.rc;
        var nome=empresa.rs;
        console.log(codigo+"-"+nome);
        var top=tInicial+(i*50);
        var parte='<span id="spanLin'+i+'" style="padding: 10px;position:absolute;width:350px;height:50px;top:'+top+'px;left:0px;right:0px;margin:auto;"><a href="javascript:getEmpresa('+codigo+');" class="z" style="font-size: 25px;">'+nome+'</a></span><br><br>';
        $('#spanSaida').append(parte);
        var elemento=document.getElementById('spanLin'+i);
        //elemento.style.width='350px';
        elemento.classList.add('cantinhos');
    }
}