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
        "nodes": [
          {name: "Producción Interna"},
          {name: "Producción Externa"},
          {name: "Energias Renovables"},
          {name: "Energias No Renovables"},
          {name: "Carbón"},
          {name: "Eólica"},
          {name: "Hidráulica"},
          {name: "Nuclear"},
          {name: "Primaria"},
          {name: "Solar"},
          {name: "Consumo Final"},
          {name: "Transporte"},
          {name: "Industrial"},
          {name: "Doméstico"},
          {name: "Electricidad"},
          {name: "Gas Natural"},
          {name: "G.L.P."},
          {name: "Productos Petrolíferos"}
        ],
        "links": [
            {"source": 0, "target": 1, "value": 124.729},
            {"source": 0, "target": 4, "value": 124.729},
            {"source": 5, "target": 2, "value": 124.729},
            {"source": 1, "target": 3, "value": 124.729}

        ]
      };

    //generateChoroplethMap(provincias);
    changeIndex(provincias[3],-1);
    generateSankeyDiagram(energias);
}


function changeIndex(provincia, index){
    provincia.Index = Math.random()*2-1;
}


function update(provincia){
    changeIndex(provincia);
    updateMapColorProvince(provincia);
}
