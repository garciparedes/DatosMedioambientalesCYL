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
    //console.log(data);
    datt = data;


    provinciasChoroplet = new Array();
    var i;
    for(i = 0; i < provinciasName.length; i++){
        provinciasChoroplet = provinciasChoroplet.concat(
            getAllYearAllProvinceDataRatio(
                datt, provinciasName[i], indicadoresProduccion, ["Consumo de energía final"]));

    }
    //console.log(provinciasChoroplet);


    provinciasProductionLinechart = new Array();

    for(i = 0; i < provinciasName.length; i++){
        provinciasProductionLinechart = provinciasProductionLinechart.concat(
            getAllYearOneProvinceData(
                datt, provinciasName[i], indicadoresProduccion));

    }

    provinciasConsumptionLinechart = new Array();

    for(i = 0; i < provinciasName.length; i++){
        provinciasConsumptionLinechart = provinciasConsumptionLinechart.concat(
            getAllYearOneProvinceData(
                datt, provinciasName[i], ["Consumo de energía final"]));

    }

    globalProductionLinechart = getAllYearAllProvinceData(data, indicadoresProduccion);
    globalConsumptionLinechart = getAllYearAllProvinceData(data, ["Consumo de energía final"]);
    //console.log(getAllYearOneProvinceData(data, "Valladolid", indicadoresProduccion));
    //console.log(provinciasConsumptionLinechart);
    //console.log(getAllYearOneProvinceData(data, "León", ["Consumo de energía final"]));
    //console.log(getAllYearAllProvinceDataRatio(data, "León", indicadoresProduccion, ["Consumo de energía final"]));
    //console.log(getOneYearAllProvinceOneDataRatio(data, "León", indicadoresProduccion, ["Consumo de energía final"], 2010));
    //console.log(getOneYearOneProvinceData(data, 2010, "Palencia"));


    var date = 2010;
    globalSankey = getOneYearAllProvinceData(data, date);

    generateChoroplethMap(provinciasChoroplet.filter(isCorrectDate(date)));

    generateLineChart(
        globalProductionLinechart,

        globalConsumptionLinechart,
        date
    );
    console.log(globalSankey);
    generateSankeyDiagram(globalSankey);


    d3.select("#textProvince").text("Flujo Energético en " + "Castilla y León");

    d3.select("#restoreProvince")
        .text("Castilla y León")
        .on("click", function(d){
            updateLineChart(
                globalProductionLinechart,
                globalConsumptionLinechart
            );
            d3.select("#textProvince").text("Flujo Energético en " + "Castilla y León");

        });
}


function changeLinks(energias){
    energias.links[2]=  {source: 0, target: 4, value: 50.729};
}


function changeProvinceIndex(province, index){
    province.Index = index;
}


function changeProvince(province){
    d3.select("#textProvince").text("Flujo Energético en " + province);
    updateLineChart(
        provinciasProductionLinechart.filter(isCorrectProvince(province)),
        provinciasConsumptionLinechart.filter(isCorrectProvince(province))
    );

}

function changeDate(date){

    updateMapColorProvince(provinciasChoroplet.filter(isCorrectDate(date)));

}
