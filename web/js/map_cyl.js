function changeColor(){

    d3.xml("components/map_cyl.svg", function(xml) {

        document.body.appendChild(xml.documentElement);

        //var elem = document.getElementById('map_cyl');
        //var svgDoc = elem.contentDocument;
            var elem2 = document.getElementById('leon');
            elem2.style.fill = 'rgb(0,0,0)';

            

            var circle = d3.select("svg").append("circle")
                .attr("cx", 100)
                .attr("cy", 100)
                .attr("r", 20)
                .style("fill", "red");

        });

        var elem3 = document.getElementById('valladolid');
        elem3.style.fill = 'rgb(0,0,0)';


}
