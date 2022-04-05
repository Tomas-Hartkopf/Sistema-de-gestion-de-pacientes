//Asociación del formulario con el botón de adición por medio del capturador de eventos.

var botonAdicionar = document.querySelector("#adicionar-paciente");

botonAdicionar.addEventListener("click", function(event){ //Creamos una función anónima que solo será llamada con el evento especificado.
    // La función preventDefault evita que la pagina se recarge al darle click al botón
    event.preventDefault(); 

    
    var form = document.querySelector("#form-adicionar"); 
    var paciente = capturarDatosPacientes(form)
    var errores = validarPaciente(paciente);
    if(errores.length > 0){
        exhibirMensajesErrores(errores);
        return;
    }
    adicionarPacienteEnTabla(paciente);
    form.reset(); // Vaciar el formulario

    var mensajesErrores = document.querySelector("#mensajes-errores");
    mensajesErrores.innerHTML = "";
});

// Añadir el nuevo paciente y sus datos a la tabla
function adicionarPacienteEnTabla(paciente){
    var pacienteTr = construirTr(paciente);
    var tabla = document.querySelector("#tabla-pacientes");
    tabla.appendChild(pacienteTr);
}

// Guardar los datos del paciente ingresado
// Esta función debe recibir el formulario y retornar todos los datos del paciente
function capturarDatosPacientes(form){

    var paciente = {
        nombre: form.nombre.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calcularIMC(form.peso.value,form.altura.value)
    }
    return paciente;
}

// Recibe como parámetro el paciente y devuelve el pacienteTr
// Dentro de esta función construirTr, vamos a llamar a la función construirTd
function construirTr(paciente){
        
        var pacienteTr = document.createElement("tr");
        pacienteTr.classList.add("paciente");

        // Asociar los datos con el paciente (establecer una jerarquía entre los elementos)
        pacienteTr.appendChild(construirTd(paciente.nombre,"info-nombre"));
        pacienteTr.appendChild(construirTd(paciente.peso,"info-peso"));
        pacienteTr.appendChild(construirTd(paciente.altura,"info-altura"));
        pacienteTr.appendChild(construirTd(paciente.gordura,"info-gordura"));
        pacienteTr.appendChild(construirTd(paciente.imc,"info-imc"));

        return pacienteTr;
}

// Crea la <td> y adiciona la clase junto con los datos.
// Como la clase y el dato varían para cada <td> , vamos a recibirlos como parámetro.
function construirTd(dato,clase){
    var td = document.createElement("td");
    td.classList.add(clase);
    td.textContent = dato;

    return td;
}

// Toma los datos del paciente y devuelve un array donde figuraran los errores encontrados
function validarPaciente(paciente){
    var errores = []

    if(paciente.nombre.length == 0){
        errores.push("El nombre no puede estar vacio");
    }
    if(paciente.peso.length == 0){
        errores.push("El peso no puede estar vacio");
    }
    if(paciente.altura.length == 0){
        errores.push("La altura no puede estar vacia");
    }
    if(paciente.gordura.length == 0){
        errores.push("El % de gordura no puede estar vacio");
    }
    if(!validarPeso(paciente.peso)){
        errores.push("El peso es incorrecto");
    }
    if(!validarAltura(paciente.altura)){
        errores.push("La altura es incorrecta");
    }
    return errores;
}

// Recibe como parametro un array y muestra su contenido en el navegador
function exhibirMensajesErrores(errores){
    var ul = document.querySelector("#mensajes-errores");
    ul.innerHTML = ""

    errores.forEach(function(error){
        var li = document.createElement("li");
        li.textContent = error;
        ul.appendChild(li);
    });
}