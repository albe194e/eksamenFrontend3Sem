function showContent(link) {

    const mainDiv = document.getElementById('mainDiv');

    const div1 = document.getElementById('content1');
    const div2 = document.getElementById('content2');
    const div3 = document.getElementById('content3');
    const div4 = document.getElementById('content4');

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

        case 'content4' :
            div4.style.display = "block";
            break;
    }
}

async function getBoats() {

    return new Request('GET').api('api/get/all/boats')
}

function createBoatDropdown() {


    const boatTypes = ['FOD40', 'FOD25', 'FOD25TIL40']

    const boatTypeDropdown = document.getElementById('boatType');

    for (let i = 0; i < boatTypes.length; i++) {

        const option = document.createElement('option');
        option.value = boatTypes[i]
        option.text = boatTypes[i]

        boatTypeDropdown.appendChild(option);
    }

}


//Delete table for boats
async function createDeleteTableForBoats() {

    const table = document.getElementById('deleteBoatTable');

    if (table.childElementCount > 0) {
        return;
    }

    const boats = await getBoats()


    const toAdd = ['id', 'model', 'button'];


    boats.forEach(boat => {

        createRowForDeleteTable(table, toAdd, boat)
    })


}

function createRowForDeleteTable(table, toAdd, data) {

    console.log(data.id)

    const row = document.createElement('tr');

    toAdd.forEach(element => {

        console.log(element)

        const td = document.createElement('td');

        let tdData = data[element];

        if (element === 'button') {
            const button = document.createElement('button');
            button.innerText = 'slet båden';
            button.onclick = function () {
                boatsHandler.deleteBoat(data.id)
                row.remove();
            }
            td.appendChild(button);
        } else {
            td.innerText = tdData
        }


        row.appendChild(td);
    })

    table.appendChild(row);

}


//Edit table for boats
async function createEditTableForBoats() {

    const table = document.getElementById('editTableBoats');

    if (table.childElementCount > 0) {
        return;
    }

    const boats = await getBoats()


    const toAdd = ['id', 'model', 'button'];

    boats.forEach(boat => {

        createRowForEditTable(table, toAdd, boat)

    })


}

function createRowForEditTable(table, toAdd, data) {

    const row = document.createElement('tr')

    const idToFind = []

    for (let i = 0; i < toAdd.length - 1; i++) {
        idToFind.push(toAdd[i] + data.id)
    }


    toAdd.forEach(element => {


        const td = document.createElement('td')

        let tdData = data[element];

        if (element === 'button') {

            const button = document.createElement('button')
            button.innerText = 'Updater'
            button.onclick = function () {
                boatsHandler.editBoat(idToFind)
                table.innerHTML = ''
                setTimeout(createEditTableForBoats, 100)
            }
            td.appendChild(button)
        } else {

            if (element === 'model') {

                const select = document.createElement('select')

                createBoatDropdownForEdit(select, tdData)


                select.id = element + data.id


                td.appendChild(select)

            } else {
                const p = document.createElement('p')


                p.id = element + data.id
                p.textContent = tdData
                p.value = tdData
                td.appendChild(p)

            }

        }
        row.appendChild(td)
    })

    table.appendChild(row)
}

function createBoatDropdownForEdit(element, boat) {

    const boatTypes = ['FOD40', 'FOD25', 'FOD25TIL40']

    for (let i = 0; i < boatTypes.length; i++) {

        const option = document.createElement('option');
        option.value = boatTypes[i]
        option.text = boatTypes[i]

        if (boat === boatTypes[i]) {
            option.selected = true
        }

        element.appendChild(option);
    }

}


//See all boats
async function displayAllBoats() {

    const boats = await getBoats()

    const table = document.getElementById('allBoatsTable')

    if (table.childElementCount > 0) {
        return;
    }

    const toAdd = ['id', 'model'];

    boats.forEach(boat => {

        createRowForAllBoatsTable(table, toAdd, boat)

    })


}

function createRowForAllBoatsTable(table, toAdd, data) {

    const row = document.createElement('tr')

    toAdd.forEach(element => {

        const td = document.createElement('td')

        td.innerText = data[element]

        row.appendChild(td)
    })

    table.appendChild(row)
}