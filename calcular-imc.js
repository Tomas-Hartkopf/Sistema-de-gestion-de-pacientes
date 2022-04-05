//Selección y validación de los datos ingresados de peso y altura de todos los pacientes

var pacientes = document.querySelectorAll(".paciente");

for(var i=0; i<pacientes.length; i++){

    var paciente = pacientes[i]
    var tdPeso = paciente.querySelector(".info-peso");
    var peso = tdPeso.textContent;

    var tdAltura = paciente.querySelector(".info-altura");
    var altura = tdAltura.textContent;

    var tdIMC = paciente.querySelector(".info-imc");


    pesoEsValido = validarPeso(peso);
    alturaEsValida = validarAltura(altura);

    if(!pesoEsValido){
        console.log("Peso incorrecto");
        tdIMC.textContent = "Peso incorrecto";
        pesoEsValido = false;
        paciente.classList.add("paciente-incorrecto"); //Agregamos una clase para poder marcar aquellos pacientes con datos no válidos
    }

    if(!alturaEsValida){
        console.log("Peso incorrecto");
        tdIMC.textContent = "Altura incorrecto";
        alturaEsValida = false;
        paciente.classList.add("paciente-incorrecto"); //Agregamos una clase para poder marcar aquellos pacientes con datos no válidos
    }

    //Generación de IMC con los datos ingresados de cada paciente

    if (pesoEsValido && alturaEsValida){
        tdIMC.textContent = calcularIMC(peso,altura);
    }

}

function calcularIMC(peso,altura){
    var imc = peso / (altura * altura);
    return imc.toFixed(2);
}


function validarPeso(peso){
    if((peso >= 0 && peso < 1000)){
        return true;
    }else{
        return false;
    }
}

function validarAltura(altura){
    if((altura >= 0 && altura < 3.00)){
        return true;
    }else{
        return false;
    }
}