function mainJS(){

    var provincias =
        [
            {
                Name: 'leon',
                Index: 0.2
            },
            {
                Name: 'palencia',
                Index: -1
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

    //generateChoroplethMap(provincias);
    changeIndex(provincias[3],-1);

    //generateSankeyDiagram(energias);
    energias.links[2]=  {source: 0, target: 4, value: 50.729};

    changeLinks(energias);

    var data = [
        {
            date: 2001,
            close: 3256
        },
        {
            date: 2002,
            close: 3423
        },
        {
            date: 2003,
            close: 243
        },
        {
            date: 2004,
            close: 524
        },
        {
            date: 2005,
            close: 653
        },
        {
            date: 2006,
            close: 235
        },
        {
            date: 2007,
            close: 764
        },
        {
            date: 2008,
            close: 74
        },
        {
            date: 2009,
            close: 536
        },
        {
            date: 2010,
            close: 311
        },
        {
            date: 2011,
            close: 14
        },
        {
            date: 2012,
            close: 134
        },
        {
            date: 2013,
            close: 432
        },
        {
            date: 2014,
            close: 343
        }
    ];
    generateLineChart(data);

}

function changeLinks(energias){
    energias.links[2]=  {source: 0, target: 4, value: 50.729};
}


function changeIndex(provincia, index){
    provincia.Index = Math.random()*2-1;
}


function update(provincia){
    changeIndex(provincia);
    updateMapColorProvince(provincia);
}
