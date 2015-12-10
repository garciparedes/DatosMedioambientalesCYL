
function generateChoroplethMap(){

    d3.xml("components/map_cyl.svg", function(xml) {

        document.body.appendChild(xml.documentElement);


        var elem2 = document.getElementById('leon');
        elem2.style.fill = d3.rgb(31,119,180);

        var elem3 = document.getElementById('valladolid');
        elem3.style.fill = d3.rgb(31,119,180);

        var elem3 = document.getElementById('soria');
        elem3.style.fill = d3.rgb(31,119,180);

        });
}
