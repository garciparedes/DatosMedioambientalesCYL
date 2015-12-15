


function getMapPallete(){
    return d3.scale.linear()
        .domain([-1, 0, 1])
        .range(["orange", "white", "blue"]);
}


function generateChoroplethMap(provincias){

    //Width and height
    var w = 400;
    var h = 325;


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
    });
}


function setAttr(provincia){
    updateMapColorProvince(provincia);
    setOnClick(provincia);
}


function setOnClick(provincia){
    d3.select("#" + provincia.Name)
        .on("click",function(){
            update(provincia);
    });
}


function updateMapColorProvince(provincia){
    d3.select("#" + provincia.Name)
        .style( "fill", getMapPallete()(provincia.Index));
}
