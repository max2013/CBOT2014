/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var dadosUser = new Object();
var canvas;
var userIdentificador, userChaveDeAcesso;


function viewAgenda()
{
    var ref = window.open('http://www.cbpabp.org.br/hotsite/programacao-xxxii-cbp/', '_blank', 'EnableViewPortScale=yes');
}
var app = {
    // Application Constructor
    initialize: function() {
         
        this.bindEvents();
    },
   
    bindEvents: function() {
        
      
        //document.addEventListener('deviceready', this.onDeviceReady, false);
    },
   
    onDeviceReady: function() {
		
               
		userIdentificador = '00000000000000DEVAPP2014';
		userChaveDeAcesso = '10643A243E804DB89C09C98658CF9282';
		
		canvas = document.getElementById('myCanvas');
		ctx = canvas.getContext('2d');
		
		 $.getJSON('http://social4u.topcode.com.br/AcaoFB/ObterDadosUsuarios', 
                        {
                                identificador: userIdentificador,
                                chaveAcesso: userChaveDeAcesso
                        }, 
                        function(data)
                        {

                                app.handleVerifyLoginUser(data);
                        }
                );
		 
       // this.receivedEvent();
    },
   
    receivedEvent: function() {
		 
                 
    //http://social4u.topcode.com.br/LoginFB?identificador=00000000000000DEVAPP2014&tipoIdentificador=RFID_GEN2&chaveAcesso=10643A243E804DB89C09C98658CF9282

    $.getJSON('http://social4u.topcode.com.br/AcaoFB/ObterDadosUsuarios', 
            {
                    identificador: userIdentificador,
                    chaveAcesso: userChaveDeAcesso
            }, 
            function(data)
            {

                    app.handleVerifyLoginUser(data);
            }
    );
      
    },
	
	handleVerifyLoginUser: function(result)
	{
		if(result.sucesso)
		{
			$('#dataUser').empty();
			dadosUser.sucesso = result.sucesso;
			dadosUser.mensagem = result.mensagem;
			dadosUser.nome = result.data.Nome;
			dadosUser.dataCadastro = result.data.DataCadastro;
			dadosUser.sexo = result.data.Sexo;
			dadosUser.dataNascimento = result.data.DataNascimento;
			
			$('#dataUser').html('Seja bem vindo: '+dadosUser.nome);
			
		}
		else
		{
			alert(result);
			//$('#div-login').show('slow');
		}
	},
	
	handleGetCamera: function ()
	{
		
		navigator.camera.getPicture(app.onSuccess, app.onFail, 
		{ 
		  quality : 100,
		  destinationType : Camera.DestinationType.DATA_URL,
		  sourceType : Camera.PictureSourceType.CAMERA,
		  allowEdit : false,
		  encodingType: Camera.EncodingType.JPEG,
		  targetWidth: 463,
		  popoverOptions: CameraPopoverOptions,
		  saveToPhotoAlbum: false 
  
		});	
	},
	
	onSuccess: function (imageData)
	{
		
		var image = document.getElementById('myImages');
		image.src = "data:image/jpeg;base64," + imageData;
		
		if (canvas.getContext){
                    alert('ooo');
			//ctx = canvas.getContext('2d');
			var img1 = new Image();
			img1.src= image.src;//imgsrc;
			//alert(img1.width + ' ' +img1.height);
			img1.onload = function(){
				//var imgWidth=576;
				//var imgHeight=600;
				canvas.width= 800;
				canvas.height= 600;
				//ctx.drawImage(img1,40,61);
                                ctx.drawImage(img1,0,0,800,600,30,60,800,600);
				
			}
			
			app.handleMarcaDagua('../../images/phonegap/moldura.png','Rafael');
		}
		
		
		 var dataURL = canvas.toDataURL("image/jpeg");
		 var apenasBase64 = dataURL;
                 apenasBase64 = apenasBase64.split(',');
		
		//alert(apenasBase64[1]);
                
		 var dados = {
			identificador: userIdentificador,
			chaveAcesso:  userChaveDeAcesso,
			textoMensagem: 'Legenda da Foto',
			imagemBase64: apenasBase64[1]
		 };
		
		
		$('#container-nfc-photo').fadeIn('slow');
                
                $('#boxNoAccept').click(function()
                {
                    $('#container-nfc-photo').fadeOut('slow');
                });
                
                $('#boxAccept').click(function()
                {
                    $.ajax({
			type: 'POST',
			url: 'http://social4u.topcode.com.br/AcaoFB/EnviarFotoBase64',
			data: dados,
			dataType: 'json',
			success: function (jsonData) {
				
				if (jsonData.sucesso == "true") {
					alert('sucesso!!!!');
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				var jsonErro = JSON.parse(jqXHR.responseText);
				if (jsonErro.sucesso == "false") {
					alert(jsonErro.mensagem);
				} else {
					alert("jqXHR.responseText --> " + jqXHR.responseText + "\njqXHR --> " + jqXHR + "\ntextStatus --> " + textStatus + " \nerrorThrown --> " + errorThrown);
				}
			}
                    });
                });
                
	},
	onFail: function (fail)
	{
		alert('Fail');
	},
	
	////MARCA D´AGUA
	handleMarcaDagua: function(imgsrc,txt)
	{
		if (canvas.getContext){
			
                       img=new Image();
                        img.onload=function(){
                           // canvas.width=800;
                            //canvas.height=600;
                            ctx.drawImage(img,0,0,800,600,0,0,650,350);
                        }
                        img.src="../../images/phonegap/moldura.png";
                /*
			var img1 = new Image();
			img1.src=imgsrc;
                        img1.onload = function(){
				var imgWidth=img1.width;
				var imgHeight=img1.height;
				//canvas.width= imgWidth;
				//canvas.height=imgHeight;
				//canvas.width=800;
                                //canvas.height=600;
                                ctx.drawImage(img,1, 1);
				
			}
			 */
			
		}
		//ctx.font = '26pt Arial';
		//ctx.fillText('Some example text!', 10, 40);
	},
        
        handleGoURL: function(url)
        {
            var ref = window.open('http://'+url, '_blank', 'location=yes');
        },
        handleGoInternalURL: function(url)
        {
            window.location=url;
        }
        
        
};
