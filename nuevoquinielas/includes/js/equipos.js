function equipos(){
	//$('#agregarEquipo').attr('disabled',true).addClass('desactivado');
	
    $('#agregarEquipo').on('click',function(){
		 agregarEquipo();
    });
	
    $('#cancelnuevoequipo').on('click',function(){
		var cont = 0;
		$('.n').each(function(){
			if(cont<2){
			$(this).val('');
			cont++;
			}else{
			$(this).val(0);
			cont++;
			}
		});
		$('.nuevoEquipof').css('display','none');
    });
    
    $('#nome0').on('keyup',function(){
		validarEquipos($(this).val(),'monsaje','agregarEquipo');    
    });
	
	$('.nombreE').on('keyup',function(){
		var cual = $(this).attr('for');
		var nom1 = $('#nome'+cual).val();
		var nom2 = $('#nomeR'+cual).val();
		if (nom1 == nom2) {
			validarEquipos2('','mensaje'+cual,'actualizare'+cual,cual);
		}else{
			validarEquipos2(nom1,'mensaje'+cual,'actualizare'+cual,cual);
		}
    });
	
	$('.bverImg').on('click',function(){
		var cual = $(this).attr('for');
		$('#contImgeEm'+cual).slideDown('slow');
		$(this).removeClass('bverImg').addClass('bverImgOcul');
		$('.bverImgOcul').on('click',function(){
			var cual = $(this).attr('for');
			$('#contImgeEm'+cual).slideUp('slow');
			$('#imgeEm'+cual).val('');
			$(this).removeClass('bverImgOcul').addClass('bverImg');
			
		});
	});
	
	
}
//Se valida equipo para que no se repita
function validarEquipos(equipo,donde,cual){
    var ruta = '../../herramientas/funcionalidad/operacionesadminequipo.php';  //asignamos la ruta donde se enviaran los datos a una variable llamada url
	var pars= {'operacion': 2,'equipo':equipo}; //asignamos el parametro que se enviara
	$.ajax({
		dataType: "json",
		type: "POST",
        url : ruta,
        data: pars,
        success: function(msg){
			if (msg.edo == 1) {
				$("#"+donde).removeClass('notaMal').html('');
				$('#'+cual).removeClass('desactivado').attr('disabled',false);
			}else if (msg.edo == 2) {
				$("#"+donde).addClass(msg.clase).html(msg.mensaje);
				$('#'+cual).addClass('desactivado').attr('disabled',true);
			}else{
				$("#"+donde).removeClass('notaMal').html('');
				$('#'+cual).removeClass('desactivado').attr('disabled',false);
			}
	    },
	    statusCode:{
		404: function(){
            alert("pagina no encontrada");
		}
	    }
	});
	
}

//Se valida equipo para que no se repita
function validarEquipos2(equipo,donde,cual,cveEq){
	alert();
    var ruta = '../../herramientas/funcionalidad/operacionesadminequipo.php';  //asignamos la ruta donde se enviaran los datos a una variable llamada url
	var pars= {'operacion': 2,'equipo':equipo}; //asignamos el parametro que se enviara
	$.ajax({
		dataType: "json",
		type: "POST",
        url : ruta,
        data: pars,
        success: function(msg){
			if (msg.edo == 1) {
				$("#"+donde).removeClass('notaMal').html('');
				$("#cabecera"+cveEq).css('display','none');
				$('#'+cual).removeClass('desactivado').attr('disabled',false);
			}else if (msg.edo == 2) {
				$("#cabecera"+cveEq).css('display','table-row');
				$("#"+donde).addClass(msg.clase).html(msg.mensaje);
				$('#'+cual).addClass('desactivado').attr('disabled',true);
			}else{
				$("#cabecera"+cveEq).css('display','none');
				$("#"+donde).removeClass('notaMal').html('');
				$('#'+cual).removeClass('desactivado').attr('disabled',false);
			}
	    },
	    statusCode:{
		404: function(){
            alert("pagina no encontrada");
		}
	    }
	});
	
}

function agregarEquipo(){
	camposVacios();
    var ruta = '../../herramientas/funcionalidad/operacionesadminequipo.php';  //asignamos la ruta donde se enviaran los datos a una variable llamada url
	var metodo = $('#fagregarE').attr('method');
	
	if ($('#imgeq').val() != '') {
		var imagen = $('#imgeq')[0].files[0];
		var nombre = imagen.name;
		var fileExtension = nombre.substring(nombre.lastIndexOf('.')+1);
		var fileSize = imagen.size;
		var fileType = imagen.type;
		if (!isImage(fileExtension)) {
			alert("EL ARCHIVO CARGADO DEBE SER UNA IMAGEN (.png, .jpg, .jpeg)");
			return false;
		}
	}
	$('#jj0,#dif0,#tot0').attr('disabled',false);
	var formData = new FormData($('#fagregarE')[0]);
	$('#jj0,#dif0,#tot0').attr('disabled',true);
	$.ajax({
		type: metodo,
        url : ruta,
        data: formData,
		cache: false,
        contentType: false,
        processData: false,
		dataType: "json",
        success: function(data){
				$("#mensaje").addClass(data.clase);
				$("#mensaje").html(data.mensaje);
				if(data.estado == 1){
					$('#Eagregados').css({'display':'inline-block'});
					var muestra = "<tr><td><img src='"+ data.equipo.imagen +"' style='width:50px' /></td>";
					muestra += "<td>"+data.equipo.jj+"</td>";
					muestra += "<td>"+data.equipo.jg+"</td>";
					muestra += "<td>"+data.equipo.je+"</td>";
					muestra += "<td>"+data.equipo.jp+"</td>";
					muestra += "<td>"+data.equipo.gf+"</td>";
					muestra += "<td>"+data.equipo.gc+"</td>";
					muestra += "<td>"+data.equipo.dg+"</td>";
					muestra += "<td>"+data.equipo.tot+"</td></tr>";
					$('#tEagregados').append(muestra);
					document.getElementById("fagregarE").reset();
					$('label[for='+$('input[type=text]').attr('id')+']').removeClass('error');
					$("input[name=limpiar]").click();
				}else{
					$("#mensaje").addClass(data.clase);
					$("#mensaje").html(data.mensaje);
				}
				setTimeout(function() {
					$("#mensaje").html('');
					$("#mensaje").removeClass(data.clase);
				},5000);
	    },
	    statusCode:{
		404: function(){
            alert("pagina no encontrada");
		}
	    }
	});
	
}
