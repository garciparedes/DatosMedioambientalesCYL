function generateLineChart(blueData, orangeData, FechaValidez){
    blueData.forEach(function(d) {
        d.FechaValidez = d.FechaValidez;
        d.Valor = +d.Valor;
    });

    orangeData.forEach(function(d) {
        d.FechaValidez = d.FechaValidez;
        d.Valor = +d.Valor;
    });

    var maxDate = d3.max(blueData.concat(orangeData), function(d){ return d.FechaValidez; })
    var minDate = d3.min(blueData.concat(orangeData), function(d){ return d.FechaValidez; })

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = (960+200)/2 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;


     x = d3.scale.linear()
        .range([0, width]);

     y = d3.scale.linear()
        .range([height, 0]);


    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(5)
        .orient("bottom")
        .tickFormat(d3.format("g"));

    yAxis = d3.svg.axis()
        .scale(y)
        .ticks(5)
        .orient("left")
        .tickFormat(d3.format("s"));


    var yGrid = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
        .tickSize(-width,0,0)
        .tickFormat("");


    line = d3.svg.line()
        .x(function(d) { return x(d.FechaValidez); })
        .y(function(d) { return y(d.Valor); });

    d3.select("#lineChart")
        .on("click", function(d){
            var x = d3.mouse(this)[0]-margin.left;
            if (x >= 0 && x <= width ){
                updateTimeLine(x)
                changeDate(Math.round((maxDate-minDate)*(x/width)+minDate));
            }
        });

    var svg = d3.select("#lineChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(blueData, function(d) { return d.FechaValidez; }));
    y.domain([0, d3.max(blueData.concat(orangeData), function(d){ return d.Valor; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("font-size", 10)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("TEP");

    svg.append("g")
        .attr("class", "grid")
        .call(yGrid);

    svg.append("path")
        .datum(blueData)
        .attr("class", "blueline")
        .attr("d", line);

    svg.append("path")
        .datum(orangeData)
        .attr("class", "orangeline")
        .attr("d", line);

    // Add the Legend
    svg.append("text")
        .attr("x", (width/4)+310) // spacing
        .attr("y", (margin.bottom)-20)
        .style("fill", function() { // dynamic colours
            return "steelblue"; })
        .text("Producción");

    // Add the Legend
    svg.append("text")
        .attr("x", (width/4)+310) // spacing
        .attr("y", (margin.bottom))
        .style("fill", function() { // dynamic colours
            return "orange"; })
        .text("Consumo");

    var timeLine = svg.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", height)
        .attr("stroke", "black");


    function updateTimeLine(pos){
        timeLine
            .attr("x1", pos)
            .attr("x2", pos);
    }

    function updateTimeLineFromDate(FechaValidez){
        updateTimeLine(width*(FechaValidez-minDate)/(maxDate-minDate));
    }

    updateTimeLineFromDate(FechaValidez);

}

function updateLineChart(blueData, orangeData){
    var svg = d3.select("#lineChart");

    y.domain([0, d3.max(blueData.concat(orangeData), function(d){ return d.Valor; })]);

    svg.select(".blueline")
        .datum(blueData)
        .attr("d", line);

    svg.select(".orangeline")
        .datum(orangeData)
        .attr("d", line);

    svg.select(".y")
        .call(yAxis)

}
