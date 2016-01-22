<?php
$class_flogin = (!empty($_SESSION['ERROR']))? '' : ' OCULTO';
?>

<div class="info degrad1" id="instrucciones">
	<!--<button type="button" class="degrad2 boton fDer cerrar"> X</button>-->
    
	<div id='contInst'>
		<div class='contenedorI'><img src='includes/img/iconos/campo.png' class='imgIn'/></div>
		<div class='contenedorI'><img src='includes/img/iconos/user.png' class='imgIn'/></div>
		<div class='contenedorI'><img src='includes/img/iconos/tiempo.png' class='imgIn'/></div>
		<div class='contenedorI'><img src='includes/img/iconos/precio.png' class='imgIn'/></div>
		<div class='contenedorI'><img src='includes/img/iconos/premio.png' class='imgIn'/></div>
		<div class='contenedorI'><img src='includes/img/iconos/flags.png' class='imgIn'/></div>
	</div>
	
    
</div>

<style>
	#contInst{
		/*background:red;*/
		width:100%;
		text-align: center;
	}
	.contenedorI{
		width:30%;
		/*background: blue;*/
		display: inline-block;
		vertical-align: top;
		text-align: center;
		margin: 2% 0;
	}
	.imgIn{
		width:30%;	
	}
	
</style>


