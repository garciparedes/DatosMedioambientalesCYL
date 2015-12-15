function generateLineChart(data, data2){
    var margin = {top: 20, right: 20, bottom: 30, left: 100},
        width = 960/2 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;


    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(5)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(3)
        .orient("left");

    var line = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

    var svg = d3.select("#lineChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    data.forEach(function(d) {
        d.date = new Date(d.date,1,1);
        d.close = +d.close;
    });

    data2.forEach(function(d) {
        d.date = new Date(d.date,1,1);
        d.close = +d.close;
    });

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d){ return d.close; })]);

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

    svg.append("path")
        .datum(data)
        .attr("class", "blueline")
        .attr("d", line);

    svg.append("path")
        .datum(data2)
        .attr("class", "orangeline")
        .attr("d", line);
}
