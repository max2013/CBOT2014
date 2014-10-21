/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 var dataUser = new Array();
 var dadosParticipantesDados = new Array();
 var db;
 var email;
 var nome;
 var url = '';
 
var usuarios = {
    
   
    Initialize: function()
    {
       ///alert('oo');
    },
        
    handleDeleteSuccess:function(tx, results)
    {
        
        tx.executeSql('DROP TABLE IF EXISTS tb_participantes');
        url = 'user';
        usuarios.handleCreateDb();
    },
    
    handleDeleteError:function(tx, results)
    {
        
        alert('delete error')
    },
    
    handleGetDataParticipante:function()
    {
        
        if($('#participantesEmail').val().length > 0)
        {
             alert('data')
            var formURL = ExternalURL+'participantes/';
            console.log(formURL+'handleListarParticipanteForEmail/email/'+$('#participantesEmail').val())
            $.post(formURL+'handleListarParticipanteForEmail/email/'+$('#participantesEmail').val(), function(data)
            {
              
               if(data.mensagem !== 'fail')
               {
                  //sessionStorage.userlogado = 'true';
                  //window.location = 'homepage.html';
                  antsDb.handleGetDataServer($('#participantesEmail').val());
               }
               else
               {
                   alert('E-mail não cadastrado!');
               }
            }, 'json');
        }
        else
        {
            alert('por favor, preencha seu e-mail.')
        }
    },
    
    /*
    handleSQLInsertSuccess:function(tx, results){
        var sql = "select * from tb_participantes";
	tx.executeSql(sql, [], getDataUsuarios);
        
                function getDataUsuarios(tx, results){
			var len = results.rows.length;
			
                        if(len === 0)
                        {
                            $.each(dataUser[0], function(i, index)
                            {
                                
                                tx.executeSql("INSERT INTO tb_participantes"+ 
                                        "(participantesId, "+
                                        "participantesNome, "+
                                        "participantesEmail, "+
                                        "participantesCidade, "+
                                        "participantesUf, "+
                                        "participantesEmitido, "+
                                        "participantesIdaOrigem, "+
                                        "participantesIdaDestino, "+
                                        "participantesIdaData, "+
                                        "participantesIdaCiaAerea, "+
                                        "participantesIdaVoo, "+
                                        "participantesIdaSaida, "+
                                        "participantesIdaChegada, "+
                                        "participantesIdaLocalizacao, "+
                                        "participantesIdaETicket, "+
                                        "participantesVoltaOrigem, "+
                                        "participantesVoltaDestino, "+
                                        "participantesVoltaData, "+
                                        "participantesVoltaCiaAerea, "+
                                        "participantesVoltaVoo, "+
                                        "participantesVoltaSaida, "+
                                        "participantesVoltaChegada, "+
                                        "participantesVoltaLocalizacao, "+
                                        "participantesVoltaETicket, "+
                                        "participantesStatus) "+
                                        " VALUES "+
                                        "("+index[0].participantesId+", '"+index[0].participantesNome+"',  '"+index[0].participantesEmail+"',  '"+index[0].participantesCidade+"',  '"+index[0].participantesUf+"', '"+index[0].participantesEmitido+"',  '"+index[0].participantesIdaOrigem+"',  '"+index[0].participantesIdaDestino+"',  '"+index[0].participantesIdaData+"', '"+index[0].participantesIdaCiaAerea+"',  '"+index[0].participantesIdaVoo+"',  '"+index[0].participantesIdaSaida+"',  '"+index[0].participantesIdaChegada+"', '"+index[0].participantesIdaLocalizacao+"', '"+index[0].participantesIdaETicket+"',  '"+index[0].participantesVoltaOrigem+"',  '"+index[0].participantesVoltaDestino+"',  '"+index[0].participantesVoltaData+"', '"+index[0].participantesVoltaCiaAerea+"',  '"+index[0].participantesVoltaVoo+"',  '"+index[0].participantesVoltaSaida+"',  '"+index[0].participantesVoltaChegada+"', '"+index[0].participantesVoltaLocalizacao+"',  '"+index[0].participantesVoltaETicket+"',  1)");
                                
                                    
                                    if(url === 'evento') window.location = 'home.html';
                                    else window.location = 'meus-dados.html';
                                    
                                    
                            });
                            
                            
                        }
                        else
                        {
                            if(url === 'evento') window.location = 'home.html';
                                    else window.location = 'meus-dados.html';
                        }
			
		}
    },
    
    handleSelectDadosPageMeusDados:function()
    {
        db = openDatabase('db_sql0', '1.0', '@usuario', 50 * 1024 * 1024);
        db.transaction(this.handleSelectSuccess, this.handleSelectError);
    },
    handleSelectError:function()
    {
        alert('Houve um erro ao carregar seus dados, por favor se o problema persistir feche e abra o aplicativo novamente.')
    },
    */
    
    handleSelectSuccess:function(tx, results)
    {
        var sql = "select * from tb_participantes";
	tx.executeSql(sql, [], getDataUsuarios);
        
            function getDataUsuarios(tx, results){
                var len = results.rows.length;
                
                for (var i=0; i<len; i++) {
				
                        var employee = results.rows.item(i);
                        dadosParticipantesDados.push(
                                                employee.participantesNome,
                                                employee.participantesEmail,
                                                employee.participantesCidade,
                                                employee.participantesUf,
                                                employee.participantesEmitido,
                                                employee.participantesIdaOrigem,
                                                employee.participantesIdaDestino,
                                                employee.participantesIdaData,
                                                employee.participantesIdaCiaAerea,
                                                employee.participantesIdaVoo,
                                                employee.participantesIdaSaida,
                                                employee.participantesIdaChegada,
                                                employee.participantesIdaLocalizacao,
                                                employee.participantesIdaETicket,
                                                employee.participantesVoltaOrigem,
                                                employee.participantesVoltaDestino,
                                                employee.participantesVoltaData,
                                                employee.participantesVoltaCiaAerea,
                                                employee.participantesVoltaVoo,
                                                employee.participantesVoltaSaida,
                                                employee.participantesVoltaChegada,
                                                employee.participantesVoltaLocalizacao,
                                                employee.participantesVoltaETicket,
                                                employee.participantesStatus
                                                ); 
                }
                
                email = employee.participantesEmail;
                nome = employee.participantesNome;
                
                $('#divNomeuser').html(employee.participantesNome);
                $('#divEmitido').html(employee.participantesEmitido);
                
                $('#divOrigem').html(employee.participantesIdaOrigem);
                $('#divDestino').html(employee.participantesIdaDestino);
                $('#divData').html(employee.participantesIdaData);
                $('#divCiaAerea').html(employee.participantesIdaCiaAerea);
                $('#divVoo').html(employee.participantesIdaVoo);
                $('#divSaida').html(employee.participantesIdaSaida);
                $('#divChegada').html(employee.participantesIdaChegada);
                $('#divLocalizacao').html(employee.participantesIdaLocalizacao);
                $('#divEticket').html(employee.participantesIdaETicket);
                
                //VOLTA//
                $('#divOrigemVolta').html(employee.participantesVoltaOrigem);
                $('#divDestinoVolta').html(employee.participantesVoltaDestino);
                $('#divDataVolta').html(employee.participantesVoltaData);
                $('#divCiaAereaVolta').html(employee.participantesVoltaCiaAerea);
                $('#divVooVolta').html(employee.participantesVoltaVoo);
                $('#divSaidaVolta').html(employee.participantesVoltaSaida);
                $('#divChegadaVolta').html(employee.participantesVoltaChegada);
                $('#divLocalizacaoVolta').html(employee.participantesVoltaLocalizacao);
                $('#divEticketVolta').html(employee.participantesVoltaETicket);
                
            }
    },
    getListUsuarios: function (idItem, container, remove)//itemId, tipo
    {
        $('#'+container).empty();
        
        var formURL = path_url+'usuarios/';
        $.post(formURL+'getListUsuarios', 
        {id:idItem},
        function(data){
            
            if(data.mensagem.length > 0)
            {
                $.each(data.mensagem, function(i, index)
                {
                    var idRandom = Math.floor((Math.random() * 999999) + 1);
                    $('#'+container).append('<li data-icon="delete" id="'+index.usuariosId+'" data-phone="'+index.usuariosTelefone+'" data-randomId="'+idRandom+'"><a href="#">'+index.usuariosNome+'</a></li>');

                });      
                $('#'+container+'>li').each(function(index)
                {
                    var thisElement = $(this);
                    
                    $( this ).click(function ()
                    {
                       if(remove)
                       {
                            if(confirm('Deseja DELETAR o item selecionado?'))
                            {
                                $.post(formURL + 'delete', {id:$(this).attr('id')}, function(data)
                                {
                                    if(data.mensagem === 'success')
                                    {
                                        thisElement.fadeOut('slow');
                                    }
                                    else
                                    {
                                       alert('Erro ao removeros dados!');
                                    }
                                },'json');
                            }
                       }
                       else
                       {
                           thisElement.remove();
                       }
                       

                    });

                });
                        
            }
            else
            {
                $('#'+container).append('<li data-icon="plus"><a href="#">Nenhum contato encontrado!</a></li>');
            }
                           
               $('#'+container).listview('refresh');   
                           
            
        },'json');
                        
          
    }
}
