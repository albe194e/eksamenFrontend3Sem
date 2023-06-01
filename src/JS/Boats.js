class Boats {


    createNewBoat() {

        const boatBody = {

            model: document.getElementById("boatType").value,
        }

        new Request('POST', boatBody).api('api/post/create/boat')

        window.location.reload()
    }

    editBoat(idToFind) {

        const id = document.getElementById(idToFind[0]).value
        const model = document.getElementById(idToFind[1]).value

        const newBody = {
            id: id,
            model: model
        }


        new Request('PUT', newBody).api('api/put/' + id + '/boat')
    }

    deleteBoat(idToFind) {

        new Request('DELETE').api('api/delete/' + idToFind + '/boat')

    }


}

const boatsHandler = new Boats()