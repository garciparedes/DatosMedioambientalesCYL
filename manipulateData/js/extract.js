var fileName ="Indicadores_medioambientales.csv";
function extract(){

    d3.csv("Indicadores_medioambientales.csv", function(data) {
        var len = data.length;
        for (i = 0; i < len; i++){
            console.log(data[i].Indicador);
        }
    });
}
