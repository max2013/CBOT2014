
   var db;
   var email;
        
    function handleSelectAnotacoes ()
    {
         db.transaction(this.handleSQLSelectSuccess, this.handleDbAnotacoesError);
    }
    function handleSQLSelectSuccess(tx, result)
    {
        var sql = "select * from tb_blocoanotacoes";
	tx.executeSql(sql, [], getSelectAnotacoes);
        
        function getSelectAnotacoes(tx, results){
            var len = results.rows.length;

            if(len !== 0)
            {
                var employee = results.rows.item(0);
                $('#contactMessageTextarea').val(employee.blocoanotacoesNota)

            }
        }
        
         var sql = "select * from tb_participantes";
         tx.executeSql(sql, [], getDataUsuarios);
        
        function getDataUsuarios(tx, results){
                var employee = results.rows.item(0);
                email = employee.participantesEmail;
               
            }
        
    }
    function handleDbInsertAnotacoes()
    {
        db.transaction(this.handleSQLInsertSuccess, this.handleSQLInsertError);
    }
    
    function handleSQLInsertSuccess(tx, result)
    {
        
        var sql = "select * from tb_blocoanotacoes";
	tx.executeSql(sql, [], getDataAnotacoes);
        
        function getDataAnotacoes(tx, results){
			var len = results.rows.length;
			
                        if(len === 0)
                        {
                           
                                tx.executeSql("INSERT INTO tb_blocoanotacoes"+ 
                                        "(blocoanotacoesId,blocoanotacoesNota) "+
                                        " VALUES "+
                                        "(1, '"+$('#contactMessageTextarea').val()+"')");
                               alert('Anotações salvas com sucesso!') 
                           
                        }
                        else
                        {
                            
                           tx.executeSql('DROP TABLE IF EXISTS tb_blocoanotacoes');
                            var sql = 
                                    "CREATE TABLE IF NOT EXISTS tb_blocoanotacoes( "+
                                    "blocoanotacoesId INT(11), " +//INTEGER PRIMARY KEY AUTOINCREMENT
                                    "blocoanotacoesNota TEXT, " +
                                    "blocoanotacoesData VARCHAR(100), " +
                                    "blocoanotacoesStatus INT(11) )";
                                    tx.executeSql(sql); 
                                    
                                    tx.executeSql("INSERT INTO tb_blocoanotacoes"+ 
                                        "(blocoanotacoesId,blocoanotacoesNota) "+
                                        " VALUES "+
                                        "(1, '"+$('#contactMessageTextarea').val()+"')");
                                
                                alert('Anotações salvas com sucesso!') 
                        }
			
		}
    }
    
     function handleSQLInsertError(tx, result)
    {
        alert('Houve um erro, tente novamente.')
    }
    