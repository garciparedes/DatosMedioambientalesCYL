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

var provinciasName = ["León", "Palencia", "Burgos", "Zamora",
                    "Valladolid", "Soria", "Salamanca", "Ávila", "Segovia"];


function mainJS(){
    extract(indicadoresProduccion.concat(indicadoresConsumo));
}

function mainWithData(data){
    //console.log(data.length);
    console.log(data);

    //console.log(getAllYearOneProvinceData(data, "Valladolid", indicadoresProduccion));
    //console.log(getAllYearOneProvinceData(data, "León", indicadoresProduccion));
    //console.log(getAllYearOneProvinceData(data, "León", ["Consumo de energía final"]));
    //console.log(getAllYearAllProvinceDataRatio(data, "León", indicadoresProduccion, ["Consumo de energía final"]));
    //console.log(getOneYearAllProvinceOneDataRatio(data, "León", indicadoresProduccion, ["Consumo de energía final"], 2010));

    //console.log(getOneYearAllProvinceData(data, 2010));

    //console.log(getOneYearOneProvinceData(data, 2010, "Palencia"));
    var provincias = new Array();
    var i;
    var date = 2000;
    for(i = 0; i < provinciasName.length; i++){
        provincias.push(
            getOneYearAllProvinceOneDataRatio(
                data, provinciasName[i], indicadoresProduccion, ["Consumo de energía final"], date));
    }
    console.log(provincias);

    console.log(provincias);

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
        getAllYearAllProvinceData(data, indicadoresProduccion),
        getAllYearAllProvinceData(data, ["Consumo de energía final"]),
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

    updateLineChart(
        getAllYearOneProvinceData(datt,province.Provincia, indicadoresProduccion),
        getAllYearOneProvinceData(datt,province.Provincia, ["Consumo de energía final"])
    );
}

function changeDate(date){

    var provincias = new Array();
    var i;
    for(i = 0; i < provinciasName.length; i++){
        provincias.push(
            getOneYearAllProvinceOneDataRatio(
                datt, provinciasName[i], indicadoresProduccion, ["Consumo de energía final"], date));
    }

    updateMapColorProvince(provincias);

}
