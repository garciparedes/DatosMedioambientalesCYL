var indicadoresProduccion = [
    "Producción de energía con carbón",
    "Producción de energía eólica",
    "Producción de energía hidráulica",
    "Producción de energía nuclear",
    "Producción de energía primaria",
    "Producción energía solar en Castilla y León"
];

var indicadoresConsumo = [
    "Consumo de energía del sector del transporte",
    "Consumo de energía del sector industrial",
    "Consumo de energía final",
    "Consumo doméstico de electricidad",
    "Consumo doméstico de gas natural",
    "Consumo doméstico de G.L.P.",
    "Consumo doméstico de productos petrolíferos"
];

function mainJS(){
    extract(indicadoresProduccion.concat(indicadoresConsumo));
}

function mainWithData(data){
    console.log(data.length);
    console.log(data);

    console.log(getYearDataAllProvinces(data, indicadoresProduccion));



    var provincias =
        [
            {
                Name: 'leon',
                Index: 0.2
            },
            {
                Name: 'palencia',
                Index: -0.5
            },
            {
                Name: 'burgos',
                Index: 0.2
            },
            {
                Name: 'salamanca',
                Index: 0.5
            },
            {
                Name: 'valladolid',
                Index: 0.2
            },
            {
                Name: 'zamora',
                Index: 0.2
            },
            {
                Name: 'avila',
                Index: 0.7
            },
            {
                Name: 'segovia',
                Index: -0.2
            },
            {
                Name: 'soria',
                Index: 0.2
            }
    ];

    var energias = {
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

    generateChoroplethMap(provincias);

    generateLineChart(
        getYearDataAllProvinces(data, indicadoresProduccion),
        getYearDataAllProvinces(data, ["Consumo de energía final"]),
        2010
    );
    generateSankeyDiagram(energias);


    changeLinks(energias);
}


function changeLinks(energias){
    energias.links[2]=  {source: 0, target: 4, value: 50.729};
}


function changeProvinceIndex(province, index){
    province.Index = index;
}


function changeProvince(province){
    console.log(province);
}

function changeDate(date){

    console.log(date);
}
