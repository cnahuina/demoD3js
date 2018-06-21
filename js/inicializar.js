window.onload = inicializar;

var refPresidentes;

function inicializar(){
    // Me devuelve un array con todos los elementos que sean de la clase candidato
    imagenesDeCandidatos = document.getElementsByClassName("candidato");
    
    //ejecutar numVotos
    for (var i = 0; i < imagenesDeCandidatos.length; i++){
        imagenesDeCandidatos[i].addEventListener("click", aumentarNumVotos, false)
    }
    // Funcion
    mostrarGraficoConDatosDeFirebase();

}
function aumentarNumVotos(event){
    var nombreCandidato = this.getAttribute("data-nombre-candidato");
    
    var refCandidato = refPresidentes.child(nombreCandidato);

    refCandidato.once("value",function(snapshot){
        var candidato = snapshot.val();


        var numVotosActualizado = candidato.numVotos + 1;
        refCandidato.update({nombre: candidato.nombre,numVotos: numVotosActualizado});
    });

}
function mostrarGraficoConDatosDeFirebase(){
    refPresidentes = firebase.database().ref().child("presidentes");

    refPresidentes.on("value", function(snapshot){
        var datosDeFirebase = snapshot.val();
        var datosAMostrar = [];
        
        var total= 0;
        for(var key in datosDeFirebase){
            total += datosDeFirebase[key].numVotos;
        }

        for(var key in datosDeFirebase){
            var porcentajeDeVotos = datosDeFirebase[key].numVotos / total;
            datosAMostrar.push({valorx: datosDeFirebase[key].nombre, valory: porcentajeDeVotos});
        }

        document.getElementById("grafica").innerHTML="";
        dibujar(datosAMostrar);
    });
}