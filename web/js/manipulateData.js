

/**
 * Extract function.
 *
 * It returns data in filename formated
 * and filtered with indicatorList-.
 *
 * @param {array} indicatorList Array of indicator names which we need.
 */
function extract( indicatorList){
    var fileName ="data/indicadores_medioambientales.csv";

    d3.dsv(";", "text/plain; charset=ISO-8859-1")(fileName, function(data) {
        var formatedData = new Array();

        var habitantes = data.filter(isHabitantes);

        data.forEach(function(d) {
            if(contains(indicatorList,String(d["Indicador"]))){

                if((String(d["Unidad"]).toUpperCase() != "TEP") &&
                    (String(d["Unidad"]) != "Toneladas equivalentes de petróleo")) {
                    formatedData.push( sameUnitIndicators(d, habitantes));
                } else {
                    formatedData.push({
                        Indicador: String(d["Indicador"]),
                        Provincia: String(d["Provincia"]),
                        FechaValidez: Number(d["Fecha validez"]),
                        Valor: Number(d["Valor"].replace(/\./g,''))/*,
                        Unidad: String(d["Unidad"].toUpperCase()),
                        Frecuencia: Number(d["Frecuencia"])*/
                    });
                }
            }
        });
        addNewIndicators(formatedData);
    });
}

function isHabitantes(value) {
  return value.Indicador == "Evolución demográfica";
}

function isCorrect(provincia, fechaValidez) {
  return function(value) {
        return ( (value["Provincia"] == provincia) && (value["Fecha validez"] == fechaValidez)) ;
    }
}

function isCorrect2(provincia, fechaValidez) {
  return function(value) {
        return ( (value.Provincia == provincia) && (value.FechaValidez == fechaValidez)) ;
    }
}
function sameUnitIndicators(d, habitantes){
    var unit = String(d["Unidad"]);

    if (unit == "Tm"){
        return {
            Indicador: String(d["Indicador"]),
            Provincia: String(d["Provincia"]),
            FechaValidez: Number(d["Fecha validez"]),
            Valor: Number(d["Valor"].replace(/\./g,'') * 0.1102)/*,
            Unidad: "TEP"),
            Frecuencia: Number(d["Frecuencia"])*/
        };

    } else if (unit == "Kw/h"){
        return {
            Indicador: String(d["Indicador"]),
            Provincia: String(d["Provincia"]),
            FechaValidez: Number(d["Fecha validez"]),
            Valor: Number(d["Valor"].replace(/\./g,'') * 0.00008598)/*,
            Unidad: "TEP"),
            Frecuencia: Number(d["Frecuencia"])*/
        };
    } else{
        var nHab = Number(habitantes.filter(
            isCorrect(d["Provincia"], d["Fecha validez"]))[0]["Valor"].replace(/\./g,'')
        );

        if (unit == "Megavatios-hora por habitante"){

            return {
                Indicador: String(d["Indicador"]),
                Provincia: String(d["Provincia"]),
                FechaValidez: Number(d["Fecha validez"]),
                Valor: Number(d["Valor"].replace(/\./g,'') * 0.00008598 * 1000 * nHab)/*,
                Unidad: "TEP"),
                Frecuencia: Number(d["Frecuencia"])*/
            };

        } else if (unit == "Miles de termias/hab"){
            return {
                Indicador: String(d["Indicador"]),
                Provincia: String(d["Provincia"]),
                FechaValidez: Number(d["Fecha validez"]),
                Valor: Number(d["Valor"].replace(/\./g,'') * 0.00252 * nHab)/*,
                Unidad: "TEP"),
                Frecuencia: Number(d["Frecuencia"])*/
            };
        } else if (unit == "Tep/hab"){
            return {
                Indicador: String(d["Indicador"]),
                Provincia: String(d["Provincia"]),
                FechaValidez: Number(d["Fecha validez"]),
                Valor: Number(d["Valor"].replace(/\./g,'') * nHab)/*,
                Unidad: "TEP"),
                Frecuencia: Number(d["Frecuencia"])*/
            };
        } else {
            console.log("ERROR");
        }
    }
    return d;
}


function addNewIndicators(data){
    data = data.concat(generateProductionSum(data));

    mainWithData(data);
}

function generateProductionSum(data){
    //console.log(indicadoresProduccion);
    var productionSum = new Array();

    data.forEach(function(d) {
        if(contains(indicadoresProduccion, String(d.Indicador))){
            if ((dat = productionSum.filter(isCorrect2(d.Provincia, d.FechaValidez))[0]) == undefined){
                productionSum.push(
                    {
                        Indicador: "ProducciónFinal",
                        Provincia: d.Provincia,
                        FechaValidez: d.FechaValidez,
                        Valor: d.Valor/*,
                        Unidad: String(d["Unidad"].toUpperCase()),
                        Frecuencia: Number(d["Frecuencia"])*/
                    }
                );

            } else {
                dat.Valor = dat.Valor + d.Valor;
                //console.log(dat);

            }
        }
    });
    //console.log(productionSum);
    return productionSum;
}


/**
 * contains function.
 *
 * It returns true if obj belong to a.
 *
 * Code from "http://stackoverflow.com/q/237104/3921457"
 *
 * @param {array} a Array where find.
 * @param {object} obj Object to find.
 */
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
