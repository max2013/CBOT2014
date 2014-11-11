// JavaScript Document

//Var's
var ip = '192.168.0.124:81';//'10.0.0.6:8888';
var db;
var campos,values;
var arrDadosCampos = new Array();
var arrDadosValues = new Array();
var arrValuesDb = new Array();
var dbError = 0;
var dbCount = 0;
var arrTabelas = new Array('participantes');//, 'salas', 'sessoes', 'horarios', 'empresas'
            //
//var ExternalURL = 'http://'+ip+'/googledrive/Server/Projetos/MaxExperience/Desenvolvimento/Clientes/Abrafarma/Site/';

var ExternalURL = 'http://localhost/googledrive/Projetos/MaxExperience/Desenvolvimento/Clientes/Sanofi/08_App_CBOT_2014/CBOT2014/adm/';
//var ExternalURL = 'http://www.avmeventos.com.br/app/cbot2014/adm/';

var antsDb = new AntsDB();    

///PLUGIN DB-Data Base
function AntsDB(){
    
    
    //HandleConnect
    this.handleConnect = function() { 
        
        db = openDatabase('Cbot2014', '1.5', 'ralves_sql', 50 * 1024 * 1024); 
    },
    
    //HandleCreateDb
    this.handleCreateDb = function (){
          
       var dbCreate = false;
       
       db.transaction(handleCreateSuccess, handleCreateError);
        
        function handleCreateSuccess(tx, result) {
             //sessionStorage.userlogado = '';
             //tx.executeSql('DROP TABLE IF EXISTS tb_participantes');
             //tx.executeSql('DROP TABLE IF EXISTS tb_blocoanotacoes');
             //tx.executeSql('DROP TABLE IF EXISTS tb_aereo');
            
            //Tb Participantes
            
               
               //tb Usuarios
	var sql = 
		"CREATE TABLE IF NOT EXISTS tb_participantes( "+
		"participantesId INT(11), " +//INTEGER PRIMARY KEY AUTOINCREMENT
                "participantesHotel INT(11), " +
		"participantesNome VARCHAR(100), " +
		"participantesEmail VARCHAR(100), " +
                "participantesData VARCHAR(100), " +
		"participantesStatus INT(11) )";
		tx.executeSql(sql);
                
        //tb Areos
	var sql = 
		"CREATE TABLE IF NOT EXISTS tb_aereo( "+
		"aereoId INT(11), " +//INTEGER PRIMARY KEY AUTOINCREMENT
		"aereoParticipantesId INT(11), " +
		"aereoCidade VARCHAR(100), " +
		"aereoUf VARCHAR(100), " +
		"aereoEmitido VARCHAR(100), " +
		"aereoIdaOrigem VARCHAR(100), " +
		"aereoIdaDestino VARCHAR(100), " +
		"aereoIdaData VARCHAR(100), " +
		"aereoIdaCiaAerea VARCHAR(100), " +
		"aereoIdaVoo VARCHAR(100), " +
		"aereoIdaSaida VARCHAR(100), " +
		"aereoIdaChegada VARCHAR(100), " +
		"aereoIdaLocalizacao VARCHAR(100), " +
		"aereoIdaETicket VARCHAR(100), " +
		"aereoVoltaOrigem VARCHAR(100), " +
		"aereoVoltaDestino VARCHAR(100), " +
		"aereoVoltaData VARCHAR(100), " +
		"aereoVoltaCiaAerea VARCHAR(100), " +
		"aereoVoltaVoo VARCHAR(100), " +
		"aereoVoltaSaida VARCHAR(100), " +
		"aereoVoltaChegada VARCHAR(100), " +
		"aereoVoltaLocalizacao VARCHAR(100), " +
		"aereoVoltaETicket VARCHAR(100), " +
                "aereoData VARCHAR(100), " +
		"aereoStatus INT(11) )";
		tx.executeSql(sql);
                
                
                //Anotações
                var sql = 
		"CREATE TABLE IF NOT EXISTS tb_blocoanotacoes( "+
		"blocoanotacoesId INT(11), " +//INTEGER PRIMARY KEY AUTOINCREMENT
		"blocoanotacoesNota TEXT, " +
                "blocoanotacoesData VARCHAR(100), " +
		"blocoanotacoesStatus INT(11) )";
		tx.executeSql(sql);
                
                
                db.transaction(function(tx) {
            
            
                    tx.executeSql('select * from tb_participantes', [], 
                    function (tx, result)
                    {
                        var len = result.rows.length;
                        
                        if(len > 0)
                        {
                            sessionStorage.userlogado = 'true';
                            window.location = 'homepage.html';
                        }
                        else
                        {
                            sessionStorage.userlogado = '';
                            $('#content').show('slow');
                            $('#loading').hide('slow');
                        }

                    },
                    function()
                    {
                        alert('Devido a uma falha o aplicativo pode apresentar algumas indisponibilidades. Por favor feche e abra-o novamente.');
                        window.location = 'index.html';

                    });

                 });
        
                
                    
        }
        
        
        function handleCreateError(tx, result) {
            alert('#Error: Devido a uma falha o aplicativo pode apresentar algumas indisponibilidades. Por favor feche e abra-o novamente.');
            window.location = 'index.html';
        }
        
        
    },
            
    //handleGetDataServer
    /*
    this.handleGetDataServer = function(email)
    {
       //AGENDA
                db.transaction(function(tx) {

                    tx.executeSql('select * from tb_'+arrTabelas[dbCount], [], 
                    function (tx, result)
                    {
                        var len = result.rows.length;
                      
                        if(len < 1){

                             $('#uppercaseSuccess').html('Carregando informações: '+(dbCount+1)+'/'+arrTabelas.length)
                            //$.getJSON(ExternalURL+arrTabelas[dbCount]+'/handleSelect/isApp/true',function(data){
                              $.ajax({
                                url: ExternalURL+arrTabelas[dbCount]+'/handleSelect/isApp/true',
                                dataType: 'json',
                                async: true,
                                success: function(data) {

                                    var tabela = arrTabelas[dbCount];

                                    if(data.mensagem === 'fail')
                                    {
                                        alert('E#003 - Informe o Desenvolvedor');//Remover os dados do usuario do banco- adm/lib/php/sm_usuarios.php
                                    }
                                    else
                                    {

                                            db.transaction(handleInsertDataAgenda, handleDbAgendaError);

                                            function handleDbAgendaError(tx, result)
                                            {
                                                   alert('Houve um Erro!\nInforme o desenvolvedor.');
                                                   return false;
                                            }

                                            function handleInsertDataAgenda(tx, result)
                                            {

                                                     //console.log(data.mensagem)
                                                    $.each(data.mensagem, function(i, index) { 


                                                        var keyData='';
                                                        arrDadosCampos = [];
                                                        arrDadosValues = [];
                                                        campos = '';
                                                        values = '';

                                                        $.each(index, function(key, value)
                                                        {
                                                            arrDadosCampos.push(key);
                                                            arrDadosValues.push('"'+html_entity_decode(value)+'"');

                                                        });

                                                        campos = implode(", ", arrDadosCampos);
                                                        values = implode(", ", arrDadosValues);
                                                        //console.log(campos)
                                                        //DB Class insert
                                                        //var dbDataBase = new AntsDB();
                                                        antsDb.handleInsert({tabela:'tb_'+tabela, txDb:tx, field:campos, value:values});
                                                        

                                                    });

                                                    dbCount++;
                                                    antsDb.handleGetDataServer();
                                            }

                                    }
                                }

                             });

                         }
                         else
                         {
                             dbCount++;
                            antsDb.handleGetDataServer();
                         }
                    },
                    function()
                    {
                        dbCreate = true;
                        alert('Houve um Erro. Tente novamente, se o erro persistir, instale novamente o aplicativo.')
                    });

                 });
    },
    */
   
    //HandleInsert
    this.handleInsert = function(arrDados) {
         arrDados.txDb.executeSql("INSERT INTO "+arrDados.tabela+" ("+arrDados.field+") VALUES ("+arrDados.value+")");
        
    },
    
    this.handleGetDataSqlLite = function(objParams) {
        //objParams - Contém os parametros de (tabela = nome da tabela) e (function = Função de retorno)
        
        //AGENDA
        db.transaction(function(tx) {
            
            
           tx.executeSql('select * from tb_'+objParams.tabela+ ' WHERE ' +objParams.tabela+'ParticipantesId = '+sessionStorage.userId, [], 
           function (tx, result)
           {
               var len = result.rows.length;
              
               if(len < 1)
               {
                   objParams.function(false);
               }
               else
               {
                   objParams.function(true, result);
               }

           },
           function()
           {
               alert('Devido a uma falha o aplicativo pode apresentar algumas indisponibilidades. Por favor feche e abra-o novamente.');
               window.location = 'index.html';

           });

        });
    },
            
    this.handleGetData2SqlLite = function(objParams) {
        //objParams - Contém os parametros de (tabela = nome da tabela) e (function = Função de retorno)
        
       
        //AGENDA
        db.transaction(function(tx) {
           
           tx.executeSql('select * from tb_'+objParams.tabela, [], 
           function (tx, result)
           {
               var len = result.rows.length;
              
               if(len < 1)
               {
                   objParams.function(false);
               }
               else
               {
                   objParams.function(true, result);
               }

           },
           function()
           {
               alert('Devido a uma falha o aplicativo pode apresentar algumas indisponibilidades. Por favor feche e abra-o novamente.');
               window.location = 'index.html';

           });

        });
    },
            
    //HanldeClean
    this.handleClean = function(tabela) {
        
        db.transaction(handleCleanSuccess, handleCleanError);
        
        function handleCleanSuccess(tx, result)
        {
            tx.executeSql('DROP TABLE IF EXISTS '+tabela);
            
             //window.location = 'index.html';
        }
        
        function handleCleanError(tx, result)
        {
            alert('Houve um erro. Se o problema persistir envie-nos uma mensagem!');
        }
        
    }
    
}


        

////PLUGIN VALIDACAO
function AntsValidacao(){
    
    this.validaData = function()
    {
        var i=0;
        $('input, textarea').each(function() {
            // code
            
            if($(this).attr('required'))
            {
                
                if($(this).val() === '')
                {
                   i++;
                } 
            }
           
            
        });
        
        
        if(i > 0)return false;
        else return true;
            
        
    };
}


////PLUGIN VALIDA E-MAIL
function AntsValidacaoEmail(){
    
    this.validaEmail = function(email)
    {
        if(email != "")
        {
           var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
           if(filtro.test(email))
           {
              return true;
           } else {
             
             return false;
           }
        }
    }
     
}


////PLUGIN CARACTERES ESPECIAIS
function AntsValidacaoCaracteresEspeciais() {
    
    this.validarCaracteres = function(str)
    {
        //se não desejar números é só remover da regex abaixo
        var regex = '[\'\"]'//'[^a-zA-Z0-9]+';
        if(str.match(regex)) {
             //encontrou então não passa na validação
             return false;
        }
        else {
             //não encontrou caracteres especiais
             return true;
        }
    }
   
}


///////////Global Methods//////////////
 /*
function handlerEraseDbTransaction(tx, result)
{
	
	tx.executeSql('DROP TABLE IF EXISTS tb_estudos');
	tx.executeSql('DROP TABLE IF EXISTS tb_estudos_tipo');
	tx.executeSql('DROP TABLE IF EXISTS tb_aulas');
	tx.executeSql('DROP TABLE IF EXISTS tb_usuarios');
	tx.executeSql('DROP TABLE IF EXISTS tb_palestras');
	tx.executeSql('DROP TABLE IF EXISTS tb_mynote');
	tx.executeSql('DROP TABLE IF EXISTS tb_palestras_palestrantes');
	tx.executeSql('DROP TABLE IF EXISTS tb_palestrantes');
	
	
	$.getJSON(ExternalURL+'adm/lib/php/sm_usuarios.php?acao=delete&idUser='+UserId+'&format=json',function(data){
		
		if(data.mensagem == 'fail')
		{
			alert('E#003 - Informe o Desenvolvedor');//Remover os dados do usuario do banco- adm/lib/php/sm_usuarios.php
		}
		else
		{
			window.location = "index.html";
		}
	});
	
	
}
*/




///------------ Alerta ---------
function handleAlert(strAlerta, strMessage, strUrl)
{
	
	
	$("#id-alert").fadeIn('slow').click(
		function()
		{
			$("#id-alert").fadeOut('slow'
			  ,function() {
				// Animation complete.
				if(strUrl !=undefined) window.location = strUrl;
					
			  });
		});
	$("#alert-top-message").html(strAlerta);
	$("#alert-content-message").html(strMessage);
}


///SEND FORM
function handleInsertNewCadastro(){
    
        if(handleInputValidacao()){

        var postData = $('#form-cadastro').serializeArray();
        var formURL = ExternalURL+'participantes/handleInsert/front/true';
        
        
        $.post(formURL, { formulario:postData },
        
            function(data)
            {
                //console.log(postData);
            }
            , 'json').done(function(success)
            {
                if(success.mensagem === 'success')
                {
                    alert('Cadastro realizado com sucesso!');
                    window.location.reload();
                }
                else
                {
                    alert('Houve um erro ao efetuar o cadastro!');
                }

            }, 'json').fail(function(error)
            {
                //console.log(error);

            }, 'json');
        }
        else
        {
            alert('Preencher todos os campos!');
        }

}



function handleInputValidacao(){
    var validate = new AntsValidacao();
    return validate.validaData();
}