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
                        Valor: Number(data[i].Valor),
                        Unidad: data[i].Unidad,
                        Frecuencia: data[i].Frecuencia
                    }
            );

        }
        //console.log(indicadorList["Agricultura ecológica"]);

        //console.log(pearsonCorrelation(indicadorList, "Agricultura ecológica", "Calidad del aire en el medio urbano. Contaminación por NO2"));
        console.log(pearsonCorrelation(indicadorList, "Agricultura ecológica", "Agricultura ecológica"));

        for (var key in indicadorList){
            //console.log(key);
        }
    });
}

/**
 *  @fileoverview Pearson correlation score algorithm.
 *  @author matt.west@kojilabs.com (Matt West)
 *  @license Copyright 2013 Matt West.
 *  Licensed under MIT (http://opensource.org/licenses/MIT).
 */


/**
 *  Calculate the person correlation score between two items in a dataset.
 *
 *  @param  {object}  prefs The dataset containing data about both items that
 *                    are being compared.
 *  @param  {string}  p1 Item one for comparison.
 *  @param  {string}  p2 Item two for comparison.
 *  @return {float}  The pearson correlation score.
 */
function pearsonCorrelation(prefs, p1, p2) {
    var si = [];

    var valor = "Valor";

    console.log(prefs[p1]);
    console.log(prefs[p2]);

    for (var key in prefs[p1]) {
        if (prefs[p2][key][valor]) {
            console.log(key);
            si.push(key);
        }
    }

    var n = si.length;

    if (n == 0) return 0;

    var sum1 = 0;
    for (var i = 0; i < si.length; i++){
         sum1 += prefs[p1][si[i]][valor];
     }

    var sum2 = 0;
    for (var i = 0; i < si.length; i++){
        sum2 += prefs[p2][si[i]][valor];
    }

    var sum1Sq = 0;
    for (var i = 0; i < si.length; i++) {
        sum1Sq += Math.pow(prefs[p1][si[i]][valor], 2);
    }


    var sum2Sq = 0;
    for (var i = 0; i < si.length; i++) {
        sum2Sq += Math.pow(prefs[p2][si[i]][valor], 2);
    }

    var pSum = 0;
    for (var i = 0; i < si.length; i++) {
        pSum += (prefs[p1][si[i]][valor] * prefs[p2][si[i]][valor]);
    }

    var num = pSum - (sum1 * sum2 / n);
    var den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *

    (sum2Sq - Math.pow(sum2, 2) / n));

    if (den == 0) return 0;

    return num / den;
}
