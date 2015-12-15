

function extract(fileName){

    d3.dsv(";", "text/plain; charset=ISO-8859-1")(fileName, function(data) {
        console.log (data);
    });
}
