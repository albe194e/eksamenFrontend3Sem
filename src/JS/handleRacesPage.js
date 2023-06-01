function showContent(link) {

    const mainDiv = document.getElementById('mainDiv');

    const div1 = document.getElementById('content1');
    const div2 = document.getElementById('content2');
    const div3 = document.getElementById('content3');
    const div4 = document.getElementById('specificRace');

    for (let i = 0; i < mainDiv.childElementCount; i++) {
        mainDiv.children[i].style.display = "none";
    }

    console.log(link)

    switch (link) {

        case 'content1' :
            div1.style.display = "block";
            break;
        case 'content2' :
            div2.style.display = "block";
            break;
        case 'content3' :
            div3.style.display = "block";
            break;

        case 'specificRace' :
            div4.style.display = "block";
            break;
    }
}


function getRaces() {

    return new Request('GET').api('api/get/all/sailraces')
}

function getUpcommingRaces() {

    return new Request('GET').api('api/get/sailrace/from/status/notfinished')
}

function getFinishedRaces() {

    return new Request('GET').api('api/get/sailrace/from/status/finished')

}

function getResultsFromRace(id) {

    return new Request('GET').api('api/get/results/race/' + id)
}

function getWeeklyRaces() {

    return new Request('GET').api('api/get/weekly/sailraces')

}


function getBoatsInRace(id) {

    return new Request('GET').api('api/get/all/boats/sailrace/' + id)
}

function getBoatsBasedOnType(type) {

    return new Request('GET').api('api/get/boats/model/' + type)

}


async function showWeeklyRaces() {

    const table = document.getElementById('weeklyRacesTable');

    if (table.childElementCount > 0) {
        return
    }

    const weeklyRaces = await getWeeklyRaces();

    const toAdd = ['id', 'model', 'participants', 'button']

    for (let i = 0; i < weeklyRaces.length; i++) {

        console.log(weeklyRaces[i])

        createRowForRaceTables(table, toAdd, weeklyRaces[i])
    }
}

async function showUpcommingRaces() {

    const table = document.getElementById('upcommingRaces');

    if (table.childElementCount > 0) {
        return
    }

    const upcommingRaces = await getUpcommingRaces();

    const toAdd = ['id', 'model', 'participants', 'button']

    for (let i = 0; i < upcommingRaces.length; i++) {

        createRowForRaceTables(table, toAdd, upcommingRaces[i])

    }


}

async function showFinishedRaces() {

    const table = document.getElementById('finishedRaces');

    if (table.childElementCount > 0) {
        return
    }

    const finsihedRaces = await getFinishedRaces()

    const toAdd = ['id', 'model', 'participants', 'button']

    for (let i = 0; i < finsihedRaces.length; i++) {

        createRowForRaceTables(table, toAdd, finsihedRaces[i])


    }


}

async function createRowForRaceTables(table, toAdd, data) {

    const boatsInRace = await getBoatsInRace(data.id);


    const tr = document.createElement('tr');


    for (let i = 0; i < toAdd.length; i++) {


        const td = document.createElement('td');

        td.textContent = data[toAdd[i]];

        if (toAdd[i] === 'button') {

            const button = document.createElement('button');
            button.textContent = 'Gå til kapsejlads';
            button.onclick = function () {
                showContent('specificRace');
                showRace(data);
            }

            td.appendChild(button);
        }

        if (toAdd[i] === 'participants') {

            td.textContent = boatsInRace.length;
        }

        tr.appendChild(td);
    }

    table.appendChild(tr);


}

async function showRace(race) {

    const boatsInRace = await getBoatsInRace(race.id);
    const results = await getResultsFromRace(race.id);

    console.log(boatsInRace)

    const table = document.getElementById('specificRaceTable');

    if (table.childElementCount > 0) {
        table.innerHTML = '';
    }


    const toAdd = ['id', 'model', 'point', 'editBtn', 'deleteBtn']

    for (let i = 0; i < boatsInRace.length; i++) {

        let dataMap = {
            boatId: boatsInRace[i],
            result: results[i]
        }

        await createRowForRace(table, toAdd, dataMap, race)

    }

    await createAddNewBoatRow(table, race)

    const btn = document.getElementById("finishRaceBtn")
    const addBoatBtn = document.getElementById("addBoatBtn")
    const select = document.getElementById('selectBoat')


    if (!race.finished) {

        addBoatBtn.style.display = "block"
        select.style.display = "block"
        btn.style.display = "block"
        btn.onclick = function () {

            raceHandler.finishRace(race)

            window.location.reload();
        }
    } else {
        addBoatBtn.style.display = "none"
        select.style.display = "none"
        btn.style.display = "none"
    }


}

async function createRowForRace(table, toAdd, data, race) {

    const row = document.createElement('tr');

    let counter = 0;

    toAdd.forEach(element => {

        const td = document.createElement('td');

        if (element === 'point') {

            const input = document.createElement('input');
            input.type = 'number';

            input.value = data.result.result;

            input.id = 'id' + data.boatId.id + 'id' + data.result.id + 'id' + counter

            td.appendChild(input)
        } else if (element === 'editBtn') {
            const button = document.createElement('button')
            button.id = 'resultBtn'
            button.textContent = 'Set point';


            button.onclick = function () {
                raceHandler.addResultToBoat(data, counter)
                setTimeout(function () {
                    showRace(race)
                }, 100)
            }
            td.appendChild(button)
        } else if (element === 'deleteBtn') {

            const button = document.createElement('button')
            button.style.color = 'red'
            button.id = 'deleteBtn'
            button.textContent = 'fjern båd fra kapsejlads';
            button.addEventListener('click', () => {
                raceHandler.removeBoatFromRace(data.boatId, race)
            })
            td.appendChild(button)
        } else {


            td.textContent = data.boatId[element];
        }


        row.appendChild(td);

    })
    table.appendChild(row);

}

async function createAddNewBoatRow(table, race) {

    const boats = await getBoatsBasedOnType(race.model);

    console.log(boats)

    const tr = document.createElement('tr');

    tr.id = 'addBoatRow'

    const selectBoats = document.createElement('td');
    const tdButton = document.createElement('td');

    const select = document.createElement('select');
    select.id = 'selectBoat'

    boats.forEach(element => {

        const option = document.createElement('option');
        option.value = element.id
        option.textContent = element.id;

        select.appendChild(option)
    })

    selectBoats.appendChild(select)
    const button = document.createElement('button')
    button.id = 'addBoatBtn'
    button.textContent = 'Tilføj båd'
    button.onclick = function () {
        raceHandler.addBoatToRace(select.value, race)
    }
    tdButton.appendChild(button)

    tr.appendChild(selectBoats)
    tr.appendChild(tdButton)

    table.appendChild(tr)

}