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

    generateChoroplethMap(provincias);
    changeIndex(provincias[3],-1);
    //generateSankeyDiagram();
}


function changeIndex(provincia, index){
    provincia.Index = Math.random()*2-1;
}


function update(provincia){
    changeIndex(provincia);
    updateMapColorProvince(provincia);
}
