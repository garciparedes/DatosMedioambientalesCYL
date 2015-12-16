

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

function isCorrectDate( fechaValidez) {
  return function(value) {
        return (value.FechaValidez == fechaValidez);
    }
}

function isCorrectIndicator( indicador) {
    return function(value) {
        return (value.Indicador == indicador);
    }
}


function isCorrectProvince( province) {
    return function(value) {
        return (value.Provincia == province);
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
    var indicadoresProduccion = [
        "Producción de energía con carbón",
        "Producción de energía eólica",
        "Producción de energía hidráulica",
        "Producción de energía nuclear",
        "Producción de energía primaria",
        "Producción energía solar en Castilla y León"
    ];

    var indicadoresProduccionRenobable = [
        "Producción de energía eólica",
        "Producción de energía hidráulica",
        "Producción de energía primaria",
        "Producción energía solar en Castilla y León"
    ];

    var indicadoresProduccionNoRenobable = [
        "Producción de energía con carbón",
        "Producción de energía nuclear"
    ];

    var indicadoresConsumoDomestico = [
        "Consumo doméstico de electricidad",
        "Consumo doméstico de gas natural",
        "Consumo doméstico de G.L.P.",
        "Consumo doméstico de productos petrolíferos"
    ];

    data = data.concat(
        generateProductionSum(data, indicadoresProduccionRenobable, "ProducciónNoRenovable"),
        generateProductionSum(data, indicadoresProduccionNoRenobable, "ProducciónRenovable"),
        generateProductionSum(data, indicadoresProduccion, "ProducciónFinal"),
        generateProductionSum(data, indicadoresConsumoDomestico, "ConsumoDoméstico")
    );
    mainWithData(data);
}

function generateProductionSum(data, indicators, id){
    //console.log(indicadoresProduccion);
    var sum = new Array();

    data.forEach(function(d) {
        if(contains(indicators, String(d.Indicador))){
            if ((dat = sum.filter(isCorrect2(d.Provincia, d.FechaValidez))[0]) == undefined){
                sum.push(
                    {
                        Indicador: id,
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
    return sum;
}


function getOneYearAllProvinceData(data, date){
    var sum = new Array();
    data = data.filter(isCorrectDate(date));
    data.forEach(function(d) {
        if ((dat = sum.filter(isCorrectIndicator( d.Indicador))[0]) == undefined){
            sum.push(
                {
                    Indicador: d.Indicador,
                    Valor: d.Valor
                }
            );

        } else {
            dat.Valor += d.Valor;
        }
    });
    return sum;
}

function getOneYearOneProvinceData(data, date, province){
    var sum = new Array();
    data = data.filter(isCorrectDate(date));
    data = data.filter(isCorrectProvince(province));

    data.forEach(function(d) {
        if ((dat = sum.filter(isCorrectIndicator( d.Indicador))[0]) == undefined){
            sum.push(
                {
                    Indicador: d.Indicador,
                    Valor: d.Valor
                }
            );

        } else {
            dat.Valor += d.Valor;
        }
    });
    return sum;
}

function getAllYearAllProvinceData(data, indicators){
    var sum = new Array();
    data.forEach(function(d) {
        if(contains(indicators, String(d.Indicador))){
            if ((dat = sum.filter(isCorrectDate(d.FechaValidez))[0]) == undefined){
                sum.push(
                    {
                        FechaValidez: d.FechaValidez,
                        Valor: d.Valor
                    }
                );

            } else {
                dat.Valor += d.Valor;
                //console.log(dat);

            }
        }
    });
    return sum;
}

function getAllYearOneProvinceData(data, province, indicators){
    var sum = new Array();
    data.forEach(function(d) {
        if ((contains(indicators, String(d.Indicador))) && ( province == d.Provincia)) {
            if ((dat = sum.filter(isCorrectDate( d.FechaValidez))[0]) == undefined){
                sum.push(
                    {
                        FechaValidez: d.FechaValidez,
                        Provincia: province,
                        Valor: d.Valor
                    }
                );

            } else {
                dat.Valor += d.Valor;
            }
        }
    });
    return sum;
}

function getAllYearAllProvinceDataRatio(data, province, indicators1, indicators2){
    var sum = new Array();
    var data1 = getAllYearOneProvinceData(data, province, indicators1).sort(compareDate);
    var data2 = getAllYearOneProvinceData(data, province, indicators2).sort(compareDate);

    for( i = 0; i < data1.length; i++){
        sum.push(
            {
                Provincia: province,
                FechaValidez: data1[i].FechaValidez,
                Ratio: (data1[i].Valor / data2[i].Valor)-1
            }
        );
    }

    return sum;
}

function getOneYearAllProvinceOneDataRatio(data, province, indicators1, indicators2, date){
    var dat =  getAllYearAllProvinceDataRatio(data, province, indicators1, indicators2);
    var i = 0;
    while ((dat[i].FechaValidez != date) && i < dat.length){
        i++;
    }
    return  dat[i];
}

/**
 * http://stackoverflow.com/a/1129270/3921457
 * @param {object} obj Object to find.
 * @param {object} obj Object to find.
 */
function compareDate(a,b) {
    if (a.FechaValidez < b.FechaValidez)
        return -1;
    if (a.FechaValidez > b.FechaValidez)
        return 1;
    return 0;
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
