function generateLineChart(blueData, orangeData){

    blueData.forEach(function(d) {
        d.date = d.date,1,1;
        d.value = +d.value;
    });

    orangeData.forEach(function(d) {
        d.date = d.date,1,1;
        d.value = +d.value;
    });

    var maxDate = d3.max(blueData.concat(orangeData), function(d){ return d.date; })
    var minDate = d3.min(blueData.concat(orangeData), function(d){ return d.date; })

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960/2 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;


    var x = d3.scale.linear()
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
        .orient("left")
        .tickFormat(d3.format("s"));

        //TODO

    var yGrid = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(3)
        .tickSize(-width,0,0)
        .tickFormat("");


    var line = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); });

    d3.select("#lineChart")
        .on("click", function(d){
            var x = d3.mouse(this)[0]-margin.left;
            changeDate(Math.round((maxDate-minDate)*(x/width)+minDate));
        });


    var svg = d3.select("#lineChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(blueData, function(d) { return d.date; }));
    y.domain([0, d3.max(blueData.concat(orangeData), function(d){ return d.value; })]);

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
}
