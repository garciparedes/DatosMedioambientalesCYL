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
                        Provincia: String(data[i]["Provincia"]),
                        FechaValidez: Number(data[i]["Fecha validez"]),
                        Valor: Number(data[i]["Valor"].replace('.','')),
                        Unidad: String(data[i]["Unidad"]),
                        Frecuencia: Number(data[i]["Frecuencia"])
                    }
            );

        }
        console.log(indicadorList["Agricultura ecológica"]);
        console.log(indicadorList["Consumo de energía del sector del transporte"]);

        console.log(
            + "\n"
            +pearsonCorrelation(
                indicadorList
                , "Consumo de energía del sector del transporte"
                , "Consumo de energía del sector del transporte")
            + "\n"
        );

        var p = 0.0;
        for (var key in indicadorList){
            for (var key2 in indicadorList){
                try {
                    p = pearsonCorrelation(indicadorList, key, key2);
                    if (Math.abs(p)> 0.5 && Math.abs(p) !=1){
                    console.log("\n"
                        + key
                        + "\n"
                        + key2
                        + "\n"
                        + p
                        + "\n"
                    );
                }

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

    var X = prefs[p1].reverse();
    var Y = prefs[p2].reverse();

    var lX = X.length;
    var lY = Y.length;
    var n = (lX < lY)? lX : lY;

    if (n == 0) return 0;

    var sum1 = 0;
    for (var i = 0; i < n; i++) sum1 += X[i].Valor;

    var sum2 = 0;
    for (var i = 0; i < n; i++) sum2 += Y[i].Valor;

    var sum1Sq = 0;
    for (var i = 0; i < n; i++) {
        sum1Sq += Math.pow(X[i].Valor, 2);
    }

    var sum2Sq = 0;
    for (var i = 0; i < n; i++) {
        sum2Sq += Math.pow(Y[i].Valor, 2);
    }

  var pSum = 0;
  for (var i = 0; i < n; i++) {
    pSum += X[i].Valor * Y[i].Valor;
  }

    var num = pSum - (sum1 * sum2 / n);
    var den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *
                (sum2Sq - Math.pow(sum2, 2) / n));

    if (den == 0) return 0;

    return num / den;
}
