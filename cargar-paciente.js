// Botón para conectarse a un servidor externo (API) y realizar una importación de datos a través de un archivo JSON
var botonBuscar = document.querySelector("#buscar-paciente");

botonBuscar.addEventListener("click",function(){
    var xhr = new XMLHttpRequest;  // Objeto que permite ejecutar requisiciones AJAX
    xhr.open("GET","https://alura-es-cursos.github.io/api-pacientes/pacientes.json"); //.open es una funcion para configurar la requisición (qué método queremos utilizar en la requisición y para cuál servidor vamos a enviarla)
    xhr.addEventListener("load",function(){ //
        var errorAjax = document.querySelector("#error-ajax");
        if(xhr.status == 200){ // Validación para saber si no hubo errores durante la requisición
            errorAjax.classList.add("invisible");
            var respuesta = xhr.responseText;
            var pacientes = JSON.parse(respuesta);
            pacientes.forEach(function(paciente){
                adicionarPacienteEnTabla(paciente);
            });
        }else{
            errorAjax.classList.remove("invisible");
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    });
    xhr.send(); // Para enviar la requisición necesitamos llamar al método send()
});