function getBoatsByModelOrdered(model) {

    return new Request('GET').api('api/get/boats/model/' + model + '/ordered')

}


async function createTop10Tables() {


    const tableFOD40 = document.getElementById('top10FOD40');
    const tableFOD25TIL40 = document.getElementById('tableFOD25TIL40');
    const tableFOD25 = document.getElementById('tableFOD25');

    const tableList = [tableFOD40, tableFOD25TIL40, tableFOD25]

    const boatsFOD40 = await getBoatsByModelOrdered('FOD40');
    const boatsFOD25TIL40 = await getBoatsByModelOrdered('FOD25TIL40');
    const boatsFOD25 = await getBoatsByModelOrdered('FOD25');

    const boatsList = [boatsFOD40, boatsFOD25TIL40, boatsFOD25]

    console.log(boatsList)

    for (let i = 0; i < tableList.length; i++) {

        const toAdd = ['Plads', 'id', 'totalPoints']

        for (let j = 0; j < boatsList[i].length; j++) {


            createRowForFrontPage(tableList[i], toAdd, boatsList[i][j], j + 1)

        }

    }

}

function createRowForFrontPage(table, toAdd, boat, place) {

    const row = document.createElement('tr');

    for (let i = 0; i < toAdd.length; i++) {

        const td = document.createElement('td');

        if (toAdd[i] === 'Plads') {

            td.textContent = place
        } else {
            td.textContent = boat[toAdd[i]];
        }


        row.appendChild(td);
    }

    table.appendChild(row);


}

createTop10Tables()