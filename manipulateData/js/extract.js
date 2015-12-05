var fileName ="http://www.datosabiertos.jcyl.es/web/jcyl/risp/es/mediciones/indicadoresambientales/1284227444931.csv";


function extract(){

    d3.dsv(";", "text/plain; charset=ISO-8859-1")(fileName, function(data) {
        var len = data.length;
        console.log(len);
        console.log(data[0]);
        var indicadorList = new Array();

        for (i = 0; i < len; i++){

            if (indicadorList[data[i].Indicador] == undefined){
                indicadorList[data[i].Indicador] = new Array();
            }

            indicadorList[data[i].Indicador].push(
                    {
                        Provincia: data[i]["Provincia"],
                        FechaValidez: data[i]["Fecha validez"],
                        Valor: Number(data[i]["Valor"].replace('.','')),
                        Unidad: data[i]["Unidad"],
                        Frecuencia: data[i]["Frecuencia"]
                    }
            );

        }
        console.log(indicadorList["Agricultura ecológica"][0]);

        console.log(
            + "\n"
            +pearsonCorrelation(indicadorList, "Consumo de energía del sector del transporte", "Consumo de energía del sector del transporte")
            + "\n"
        );

        /*
        for (var key in indicadorList){
            for (var key2 in indicadorList){
                //try {
                    console.log("\n"
                        + key
                        + "\n"
                        + key2
                        + "\n"
                        +pearsonCorrelation(indicadorList, key, key2)
                        + "\n"
                    );

                }catch(err){
                    console.log(
                        " \n"
                        + key
                        + "\n"
                        + key2
                        + "\n"
                        + err
                        + "\n"
                    );

                }

            }

        }

        */

    });
}

/**
 *  @fileoverview Pearson correlation score algorithm.
 *  @author matt.west@kojilabs.com (Matt West)
 *  @license Copyright 2013 Matt West.
 *  Licensed under MIT (http://opensource.org/licenses/MIT).
 *
 *  Calculate the person correlation score between two items in a dataset.
 *
 *  @param  {object}  prefs The dataset containing data about both items that
 *                    are being compared.
 *  @param  {string}  p1 Item one for comparison.
 *  @param  {string}  p2 Item two for comparison.
 *  @return {float}  The pearson correlation score.
 */
function pearsonCorrelation(prefs, p1, p2) {

    var lP1 = prefs[p1].length;
    var lP2 = prefs[p2].length;
    var n = lP1 * lP2;

    if (n == 0) return 0;

    var sum1 = 0;
        for (var i = 0; i < lP1; i++) sum1 += prefs[p1][i].Valor;

    var sum2 = 0;
        for (var i = 0; i < lP2; i++) sum2 += prefs[p2][i].Valor;

    var sum1Sq = 0;
    for (var i = 0; i < lP1; i++) {
        sum1Sq += Math.pow(prefs[p1][i].Valor, 2);
    }

    var sum2Sq = 0;
    for (var i = 0; i < lP2; i++) {
        sum2Sq += Math.pow(prefs[p2][i].Valor, 2);
    }

    var pSum = 0;
    for (var i = 0; i < lP1; i++) {
        for (var j = 0; j < lP2; j++) {
            pSum += prefs[p1][i].Valor * prefs[p2][j].Valor/n;
        }
    }

    var num = pSum - (sum1 * sum2 / n);

    var den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *
                        (sum2Sq - Math.pow(sum2, 2) / n));

    if (den == 0) return 0;

    return num / den;
}
