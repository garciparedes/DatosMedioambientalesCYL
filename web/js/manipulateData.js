

/**
 * Extract function.
 *
 * It returns data in filename formated
 * and filtered with indicatorList-.
 *
 * @param {string} filename String name of the file.
 * @param {array} indicatorList Array of indicator names which we need.
 */
function extract(fileName, indicatorList){

    d3.dsv(";", "text/plain; charset=ISO-8859-1")(fileName, function(data) {
        var formatedData = new Array();

        data.forEach(function(d) {
            if(contains(indicatorList,String(d["Indicador"]))){
                formatedData.push({
                        Indicador: String(d["Indicador"]),
                        Provincia: String(d["Provincia"]),
                        FechaValidez: Number(d["Fecha validez"]),
                        Valor: Number(d["Valor"].replace('.','')),
                        Unidad: String(d["Unidad"]),
                        Frecuencia: Number(d["Frecuencia"])
            });}
        });
        mainWithData(formatedData);
    });
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
