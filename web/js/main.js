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
function mainJS(){



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

    var production = [
          {
              date: 2001,
              value: 3256
          },
          {
              date: 2002,
              value: 3423
          },
          {
              date: 2003,
              value: 243
          },
          {
              date: 2004,
              value: 524
          },
          {
              date: 2005,
              value: 653
          },
          {
              date: 2006,
              value: 235
          },
          {
              date: 2007,
              value: 764
          },
          {
              date: 2008,
              value: 74
          },
          {
              date: 2009,
              value: 536
          },
          {
              date: 2010,
              value: 311
          },
          {
              date: 2011,
              value: 14
          },
          {
              date: 2012,
              value: 134
          },
          {
              date: 2013,
              value: 432
          },
          {
              date: 2014,
              value: 343
          }
    ];

    var consumption = [
            {
                date: 2001,
                value: 8564
            },
            {
                date: 2002,
                value: 323
            },
            {
                date: 2003,
                value: 143
            },
            {
                date: 2004,
                value: 224
            },
            {
                date: 2005,
                value: 353
            },
            {
                date: 2006,
                value: 535
            },
            {
                date: 2007,
                value: 164
            },
            {
                date: 2008,
                value: 974
            },
            {
                date: 2009,
                value: 836
            },
            {
                date: 2010,
                value: 211
            },
            {
                date: 2011,
                value: 514
            },
            {
                date: 2012,
                value: 434
            },
            {
                date: 2013,
                value: 242
            },
            {
                date: 2014,
                value: 232
            }
        ];

    generateChoroplethMap(provincias);
    generateLineChart(production, consumption, 2011);
    generateSankeyDiagram(energias);

    energias.links[2]=  {source: 0, target: 4, value: 50.729};

    changeLinks(energias);
    provincias[7].Index = -1;


}

function changeLinks(energias){
    energias.links[2]=  {source: 0, target: 4, value: 50.729};
}


function changeProvinceIndex(province, index){
    province.Index = Math.random()*2-1;
}


function changeProvince(province){
    changeProvinceIndex(province, 0);
    updateMapColorProvince(province);
}

function changeDate(date){
    for (i =0; i < provincias.length; i++){
        updateMapColorProvince(provincias[i]);
    }

    console.log(date);
}
