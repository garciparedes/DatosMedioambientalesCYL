
function getMapPallete(min, max){
    return d3.scale.linear()
        .domain([min, 0, max])
        .range(["orange", "white", "blue"]);
}


function generateChoroplethMap(provincias){

    //Width and height
    var w = 400;
    var h = 270;


    //Create SVG Element
    var svg = d3.select("#choroplethMap")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("viewBox", "0 0 800 650");

    //Import the plane
    d3.xml("components/map_cyl.svg", "image/svg+xml", function(xml) {
        var importedNode = document.importNode(xml.documentElement, true);
        svg.node().appendChild(importedNode);
        for ( i = 0; i < provincias.length; i++){
            setAttr(provincias[i]);
        }
        updateMapColorProvince(provincias);

    });
}


function setAttr(provincia){
    if (provincia.Provincia == "León"){
        provincia.Provincia = "leon";
    } else if (provincia.Provincia == "Ávila"){
        provincia.Provincia = "avila";

    }
    setOnClick(provincia);
}


function setOnClick(provincia){
    d3.select("#" + provincia.Provincia.toLowerCase())
        .on("click",function(){
            changeProvince(provincia);
    });
}


function updateMapColorProvince(provincias){
    var max = d3.max(provincias, function(d){ return d.Ratio; })
    var min = d3.min(provincias, function(d){ return d.Ratio; })

    provincias.forEach(function (d) {
        // body...

        if (d.Provincia == "León"){
            d.Provincia = "leon";
        } else if (d.Provincia == "Ávila"){
            d.Provincia = "avila";

        }
        d3.select("#" + d.Provincia.toLowerCase())
            .style( "fill", getMapPallete(min,max)(d.Ratio));
    });
}
