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
  var count;
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
        alert('Houve um erro ao remover os dados!');
    },
    
    handleGetDataParticipante:function()
    {
        var sql = "select * from tb_participantes";
        var sql2 = "select * from tb_aereo";
        var idParticipante;
        
        if($('#participantesEmail').val().length > 0)
        {
           
            var formURL = ExternalURL+'participantes/';
           // console.log(formURL+'handleListarParticipanteForEmail/email/'+$('#participantesEmail').val())
            $.post(formURL+'handleListarParticipanteForEmail/email/'+$('#participantesEmail').val(), function(data)
            {
               
                $('#content').hide('slow');
                $('#loading').show('slow');
                
               if(data.mensagem !== 'fail')
               {
                                       
                    $.each(data.mensagem, function(i, index) { 

                        idParticipante = index.participantesId;
                        sessionStorage.userId = idParticipante;
                        
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
                       
                        db.transaction(function(tx) {
                            
                            antsDb.handleInsert({tabela:'tb_participantes', txDb:tx, field:campos, value:values});
                            
                            $.post(formURL+'handleListarAereoForParticipantes/id/'+idParticipante, function(data)
                            {
                                if(data.mensagem !== 'fail')
                                {
                                    count = data.mensagem.length;
                                    $.each(data.mensagem, function(i, index) { 
                                        
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
                                        
                                        if(count >1)handleInsertData(campos, values, true)
                                        
                                        else handleInsertData(campos, values, false);
                                        
                                        
                                       
                                    });
                                    
                                    
                                }
                               
                               
                            },'json');
                             //
                        });
                       


                    });
                    
                    
                    function handleInsertData(a, b,c)
                    {
                        
                        if(c)
                        {
                            db.transaction(function(tx) {
                                            
                                antsDb.handleInsert({tabela:'tb_aereo', txDb:tx, field:a, value:b});

                            });
                            count--;
                        }
                        else
                        {
                            db.transaction(function(tx) {
                                            
                                antsDb.handleInsert({tabela:'tb_aereo', txDb:tx, field:a, value:b});

                            });
                            
                            setTimeout(function(){
                                window.location = 'homepage.html';
                            },2000)
                            
                        }
                        
                        //window.location = 'homepage.html';
                    }
               }
               else
               {
                   $('#content').show('slow');
                   $('#loading').hide('slow');
                   alert('E-mail não cadastrado!');
               }
            }, 'json');
        }
        else
        {
            alert('Por favor, preencha seu e-mail.')
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
        db = openDatabase('Cbot2014', '1.5', 'ralves_sql', 50 * 1024 * 1024);
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
                                                employee.participantesId,
                                                employee.participantesNome,
                                                employee.participantesEmail,
                                                employee.participantesStatus
                                                ); 
                }
                id = employee.participantesId;
                email = employee.participantesEmail;
                nome = employee.participantesNome;
                
                $('#divNomeuser').html(employee.participantesNome);
                $('#divEmitido').html(employee.participantesEmitido);
                
                var sql = "select * from tb_aereo WHERE aereoParticipantesId="+id;
                    tx.executeSql(sql, [], getDataAereo);
        
            }
            
            function getDataAereo(tx, results){
                var len = results.rows.length;
                var label = 'SAÍDA';
               
                for (var i=0; i<len; i++) {
                        
                        if(i === 0) label === 'IDA';
                        else label = 'Conexão';
                        var employee = results.rows.item(i);
                        $('#idToogle').append(
                                '<div class="toggle-1">'+
                                    '<div class="deploy-toggle-1" data-id="'+employee.aereoId+'" id="'+employee.aereoId+'">'+label+' - '+employee.aereoIdaData+'</div>'+
                                    '<div class="toggle-content" id="toggle-content'+employee.aereoId+'">'+
                                        '<table cellspacing=\'0\' class="table">'+
                                                   
                                                '<tr>'+
                                                    '<td class="table-sub-title" ><strong>Origem:</strong></td>'+
                                                    '<td colspan="2"><span id="divOrigem">'+employee.aereoIdaOrigem+'</span></td>'+
                                                '</tr>'+

                                                '<tr>'+
                                                    '<td class="table-sub-title" > <strong>Destino:</strong></td>'+
                                                    '<td colspan="2"><span id="divDestino">'+employee.aereoIdaDestino+'</span></td>'+
                                                '</tr>'+

                                                '<tr>'+
                                                    '<td class="table-sub-title" > <strong>Data:</strong></td>'+
                                                    '<td colspan="2"><span id="divData">'+employee.aereoIdaData+'</span></td>'+
                                                '</tr>'+

                                                '<tr>'+
                                                    '<td class="table-sub-title" > <strong>Companhia Aérea:</strong></td>'+
                                                    '<td colspan="2"><span id="divCiaAerea">'+employee.aereoIdaCiaAerea+'</span></td>'+
                                                '</tr>'+

                                                '<tr>'+
                                                    '<td class="table-sub-title" > <strong>Vôo:</strong></td>'+
                                                    '<td colspan="2"><span id="divVoo">'+employee.aereoIdaVoo+'</span></td>'+
                                                '</tr>'+

                                                '<tr>'+
                                                    '<td class="table-sub-title" > <strong>Saída:</strong></td>'+
                                                    '<td colspan="2"><span id="divSaida">'+employee.aereoIdaSaida+'</span></td>'+
                                                '</tr>'+

                                                '<tr>'+
                                                    '<td class="table-sub-title" > <strong>Chegada:</strong></td>'+
                                                    '<td colspan="2"><span id="divChegada">'+employee.aereoIdaChegada+'</span></td>'+
                                                '</tr>'+

                                                '<tr>'+
                                                    '<td class="table-sub-title" > <strong>Localização:</strong></td>'+
                                                    '<td colspan="2"><span id="divLocalizacao">'+employee.aereoIdaLocalizacao+'</span></td>'+
                                                '</tr>'+

                                                '<tr>'+
                                                    '<td class="table-sub-title" > <strong>Eticket:</strong></td>'+
                                                    '<td colspan="2"><span id="divEticket">'+employee.aereoIdaETicket+'</span></td>'+
                                                '</tr>'+

                                            '</table>'+
                                    '</div>'+
                                '</div>');
                        
                        $('#idToogle2').append(
                                '<div class="toggle-1">'+
                                    '<div class="deploy-toggle-1" data-id="'+(i*100)+'" id="'+(i*100)+'">'+label+' - '+employee.aereoVoltaData+'</div>'+
                                    '<div class="toggle-content" id="toggle-content'+(i*100)+'">'+
                                        '<table cellspacing=\'0\' class="table">'+
                                                   
                                                '<tr>'+
                                                    '<td class="table-sub-title" > <strong>Origem:</strong></td>'+
                                                    '<td colspan="2"><span id="divOrigem">'+employee.aereoVoltaOrigem+'</span></td>'+
                                                '</tr>'+

                                                '<tr>'+
                                                    '<td class="table-sub-title" > <strong>Destino:</strong></td>'+
                                                    '<td colspan="2"><span id="divDestino">'+employee.aereoVoltaDestino+'</span></td>'+
                                                '</tr>'+

                                                '<tr>'+
                                                    '<td class="table-sub-title" > <strong>Data:</strong></td>'+
                                                    '<td colspan="2"><span id="divData">'+employee.aereoVoltaData+'</span></td>'+
                                                '</tr>'+

                                                '<tr>'+
                                                    '<td class="table-sub-title" > <strong>Companhia Aérea:</strong></td>'+
                                                    '<td colspan="2"><span id="divCiaAerea">'+employee.aereoVoltaCiaAerea+'</span></td>'+
                                                '</tr>'+

                                                '<tr>'+
                                                    '<td class="table-sub-title" > <strong>Vôo:</strong></td>'+
                                                    '<td colspan="2"><span id="divVoo">'+employee.aereoVoltaVoo+'</span></td>'+
                                                '</tr>'+

                                                '<tr>'+
                                                    '<td class="table-sub-title" > <strong>Saída:</strong></td>'+
                                                    '<td colspan="2"><span id="divSaida">'+employee.aereoVoltaSaida+'</span></td>'+
                                                '</tr>'+

                                                '<tr>'+
                                                    '<td class="table-sub-title" > <strong>Chegada:</strong></td>'+
                                                    '<td colspan="2"><span id="divChegada">'+employee.aereoVoltaChegada+'</span></td>'+
                                                '</tr>'+

                                                '<tr>'+
                                                    '<td class="table-sub-title" > <strong>Localização:</strong></td>'+
                                                    '<td colspan="2"><span id="divLocalizacao">'+employee.aereoVoltaLocalizacao+'</span></td>'+
                                                '</tr>'+

                                                '<tr>'+
                                                    '<td class="table-sub-title" > <strong>Eticket:</strong></td>'+
                                                    '<td colspan="2"><span id="divEticket">'+employee.aereoVoltaETicket+'</span></td>'+
                                                '</tr>'+

                                            '</table>'+
                                    '</div>'+
                                '</div>');
                        
                        
                        $('#'+employee.aereoId).click(function()
                        {
                            $('#toggle-content'+$(this).attr('id')).toggle('slow');
                        });
                        
                        $('#'+(i*100)).click(function()
                        {
                            $('#toggle-content'+$(this).attr('id')).toggle('slow');
                        });
                        
                }
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
