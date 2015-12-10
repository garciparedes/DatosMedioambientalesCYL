function generateSankeyDiagram(){

    var data = {
        'nodes': [
            {name: "a"},
            {name: "b"},
            {name: "c"},
            {name: "d"},
            {name: "e"},
            {name: "f"},
            {name: "h"},
            {name: "i"},
            {name: "j"},
            {name: "k"}
        ],
        'links': [
            {source: 0, target: 2, value: 10},
            {source: 0, target: 3, value: 4},
            {source: 1, target: 2, value: 9},
            {source: 1, target: 3, value: 8},
            {source: 2, target: 4, value: 2},
            {source: 2, target: 5, value: 6},
            {source: 2, target: 6, value: 7},
            {source: 3, target: 4, value: 8},
            {source: 3, target: 5, value: 4},
            {source: 6, target: 7, value: 4},
            {source: 6, target: 8, value: 4},
            {source: 3, target: 6, value: 2}
        ]
    };

    // Some setup stuff.
    var margin = {
        top: 1,
        right: 1,
        bottom: 6,
        left: 1
    };

    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var color = d3.scale.category20();



    // SVG (group) to draw in.
    var svg = d3.select("#sankeyDiagram").append("svg")
        .attr({
            width: width + margin.left + margin.right,
            height: height + margin.top + margin.bottom
        })
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // Set up Sankey object.
    var sankey = d3.sankey()
        .nodeWidth(30)
        .nodePadding(10)
        .size([width, height])
        .nodes(data.nodes)
        .links(data.links)
        .layout(32);



    // Path data generator.
    var path = sankey.link();



    // Draw the links.
    var links = svg.append("g").selectAll(".link")
        .data(data.links)
        .enter()
        .append("path")
        .attr({
            "class": "link",
            d: path
        })
        .style("stroke-width", function (d) {
            return Math.max(1, d.dy);
        })


    links.append("title")
        .text(function (d) {
            return d.source.name + " to " + d.target.name + " = " + d.value;
        }
    );



    // Draw the nodes.
    var nodes = svg.append("g").selectAll(".node")
        .data(data.nodes)
        .enter()
        .append("g")
        .attr({
            "class": "node",
            transform: function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            }
        });



    nodes.append("rect")
        .attr({
            height: function (d) {
                return d.dy;
        },
            width: sankey.nodeWidth()
        })
        .style({
            fill: function (d) {
                return d.color = color(d.name.replace(/ .*/, ""));
            },
            stroke: function (d) {
                return d3.rgb(d.color).darker(2);
            }
        })
        .append("title")
            .text(function (d) {
                return d.name;
            }
        );



    nodes.append("text")
        .attr({
            x: sankey.nodeWidth() / 2,
            y: function (d) {
                return d.dy / 2;
            },
            dy: ".35em",
            "text-anchor": "middle",
            transform: null
        })
        .text(function (d) {
            return d.name;
        }
    );
}
