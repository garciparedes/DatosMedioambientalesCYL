function generateSankeyDiagram(data){


    var dataSankey = {
        nodes: [
          {name: "Producción Interna"},
          {name: "Producción Externa"},
          {name: "Renovables"},
          {name: "No Renovables"},
          {name: "Carbón"},
          {name: "Eólica"},
          {name: "Hidráulica"},
          {name: "Nuclear"},
          {name: "Primaria"},
          {name: "Solar"},
          {name: "Consumo"},
          {name: "Transporte"},
          {name: "Industrial"},
          {name: "Doméstico"},
          {name: "Electricidad"},
          {name: "Gas Natural"},
          {name: "G.L.P."},
          {name: "Petróleo"},
          {name: "Exportación"}
        ],
        links: [
            {source: 0, target: 2, value: 4},
            {source: 0, target: 3, value: 2},

            {source: 3, target: 4, value: 1},
            {source: 3, target: 7, value: 1},

            {source: 2, target: 5, value: 1},
            {source: 2, target: 6, value: 1},
            {source: 2, target: 8, value: 1},
            {source: 2, target: 9, value: 1},


            {source: 4, target: 10, value: 1},
            {source: 5, target: 10, value: 1},
            {source: 6, target: 10, value: 1},
            {source: 7, target: 10, value: 1},
            {source: 8, target: 10, value: 1},
            {source: 9, target: 10, value: 1},
            {source: 1, target: 10, value: 1},


            {source: 10, target: 11, value: 1},
            {source: 10, target: 12, value: 1},
            {source: 10, target: 13, value: 4},
            {source: 10, target: 18, value: 1},

            {source: 13, target: 14, value: 1},
            {source: 13, target: 15, value: 1},
            {source: 13, target: 16, value: 1},
            {source: 13, target: 17, value: 1}

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
    var height = 400 - margin.top - margin.bottom;

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
        .nodeWidth(100)
        .nodePadding(50)
        .size([width, height])
        .nodes(dataSankey.nodes)
        .links(dataSankey.links)
        .layout(32);



    // Path dataSankey generator.
    var path = sankey.link();



    // Draw the links.
    var links = svg.append("g").selectAll(".link")
        .data(dataSankey.links)
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
        .data(dataSankey.nodes)
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
            "font-size": 10,
            transform: null
        })
        .text(function (d) {
            return d.name;
        }
    );
}
