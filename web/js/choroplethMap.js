
function generateChoroplethMap(){

    var dataset = [ 1];


    //Width and height
    var w = 400;
    var h = 325;

    //Create SVG Element
    var svg = d3.select("#choroplethMap")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("viewBox", "0 0 "+ w * 2 +" "+ h * 2);


    //Import the plane
    d3.xml("components/map_cyl.svg", "image/svg+xml", function(xml) {
        var importedNode = document.importNode(xml.documentElement, true);

        svg.node().appendChild(importedNode);

        var elem2 = importedNode.getElementById('leon');
        elem2.style.fill = d3.rgb(31,119,180);

        var elem3 = importedNode.getElementById('valladolid');
        elem3.style.fill = d3.rgb(31,119,180);

        var elem3 = importedNode.getElementById('soria');
        elem3.style.fill = d3.rgb(31,119,180);

        var elem3 = importedNode.getElementById('palencia');
        elem3.style.fill = d3.rgb(31,119,180);

    });
}
