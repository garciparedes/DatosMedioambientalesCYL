
function generateChoroplethMap(){

    var provincias = [
        'leon'
        , 'palencia'
        , 'burgos'
        , 'salamanca'
        , 'valladolid'
        , 'soria'
        , 'zamora'
        , 'avila'
        , 'segovia'
    ];
    var dataset = [ 1];


    //Width and height
    var w = 400;
    var h = 325;

    //Create SVG Element
    var svg = d3.select("#choroplethMap")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("viewBox", "0 0 800 650");

    var color = d3.scale.linear()
        .domain([-1, 0, 1])
        .range(["orange", "white", "blue"]);
    //Import the plane
    d3.xml("components/map_cyl.svg", "image/svg+xml", function(xml) {
        var importedNode = document.importNode(xml.documentElement, true);

        svg.node().appendChild(importedNode);

        for ( i = 0; i < provincias.length; i++){
            importedNode.getElementById(provincias[i]).style.fill = color(Math.random()*2-1);
        }

    });
}
