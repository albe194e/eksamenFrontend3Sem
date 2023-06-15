class Race {

    addResultToBoat(data, counter) {

        const id = data.result.id
        const value = document.getElementById('id' + data.boatId.id + 'id' + data.result.id + 'id' + counter).value

        console.log('ID: ' + id + ' Value: ' + value)

        console.log(value)

        new Request('PUT').api('api/put/' + id + '/raceresult/' + value)


    }

    addBoatToRace(boat, sailRace) {

        const boatId = boat
        const sailRaceId = sailRace.id


        new Request('POST').api('api/post/add/boat/' + boatId + '/sailrace/' + sailRaceId)

        setTimeout(function () {

            showRace(sailRace)
        }, 100)

    }

    removeBoatFromRace(boat, sailRace) {

        const boatId = boat.id
        const sailRaceId = sailRace.id

        console.log('boatId: ' + boatId + ' sailRaceId: ' + sailRaceId)

        new Request('DELETE').api('api/delete/boat/' + boatId + '/sailrace/' + sailRaceId)

        setTimeout(function () {

            showRace(sailRace)
        }, 100)

    }

    finishRace(race) {

        const id = race.id

        new Request('PUT').api('api/put/finish/sailrace/' + id)

        setTimeout(function () {

            window.location.reload()
        }, 100)


    }


}

const raceHandler = new Race;