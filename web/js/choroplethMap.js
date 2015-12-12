
function generateChoroplethMap(){

    var dataset = [ 1];


    //Width and height
    var w = 1000;
    var h = 1000;




    //Import the svgMap
    d3.xml("components/map_cyl.svg", "image/svg+xml", function(xml) {
        var importedNode = document.importNode(xml.documentElement, true);
        var svgMap = document.getElementById("choroplethMap")
            .appendChild(importedNode.cloneNode(true));

        svgMap.setAttribute("width", "500px");
        svgMap.setAttribute("height", "300px");
        svgMap.setAttribute("style", "background-color red");
        svgMap.setAttribute("height", "300px");


        var elem2 = svgMap.getElementById('leon');
        elem2.style.fill = d3.rgb(31,119,180);

        var elem3 = svgMap.getElementById('valladolid');
        elem3.style.fill = d3.rgb(31,119,180);

        var elem3 = svgMap.getElementById('soria');
        elem3.style.fill = d3.rgb(31,119,180);

        /*
      d3.select(svgMap).select("path").attr("fill", "blue");
      d3.select(svgMap).select("svg4146").attr("transform", function(d, i){
          return "translate(" + (i * (w / dataset.length)) + ","
              + (h - d*4 - (w )) + ")"
              +"scale("+ 0.5 +")";
      });
      */



    });


}
