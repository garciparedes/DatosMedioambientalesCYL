var fileName ="Indicadores_medioambientales.csv";


function extract(){

    d3.csv(fileName, function(data) {
        var len = data.length;
        var indicadorList = new Array();

        for (i = 0; i < len; i++){

            if (indicadorList[data[i].Indicador] == undefined){
                indicadorList[data[i].Indicador] = new Array();
            }

            indicadorList[data[i].Indicador].push(
                    {
                        Provincia: data[i].Provincia,
                        FechaValidez: data[i].FechaValidez,
                        Valor: data[i].Valor,
                        Unidad: data[i].Unidad,
                        Frecuencia: data[i].Frecuencia
                    }
            );

        }

        for (var key in indicadorList){
            console.log(indicadorList[key]);
        }

        /*
        indicadorList ["hola"] = "Chanchanchan";
        console.log(indicadorList["adios"]);
        if (indicadorList["adios"] == undefined){
            console.log(indicadorList["hola"]);
        }
        */
    });
}
