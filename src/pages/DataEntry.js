// Import deps
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Papa from "papaparse";
import { saveAs } from "file-saver";


// Import components
import NamesTable from '../components/NamesTable'
import Pics from './Pics';


// Import styles
import './../styles/dataentry.css'

// Create Bookshelf component
export default function DataEntry() {

    const [playerData, setPlayerData] = useState([])
    const [firsts, setFirsts] = useState([])
    const [lasts, setLasts] = useState([])
    const [natCount, setNatCount] = useState(-1)
    const [nats, setNats] = useState([])


    function parseData(url, callBack) {
        Papa.parse(url, {
            download: true,
            dynamicTyping: true,
            complete: function (results) {
                callBack(results.data);
            }
        });
    }

    useEffect(() => {

        function renderFunction(data) {
            //Data is usable here
            var individualPlayer = []
            //Add UID and Nat
            for (let i = 1; i < data.length - 1; i++) {
                individualPlayer.push(data[i])
                setNats(oldArray => [...oldArray, data[i][1]])
            }
            setPlayerData(individualPlayer)

        }

        parseData("/data/data.csv", renderFunction);
    }, [])

    useEffect(() => {
        setNatCount(natCount + 1)

    }, [])

    useEffect(() => {

        if (natCount > -1) {
            axios.get('http://localhost:4001/first/randomsearch', {
                params: {
                    queryString: nats[natCount]
                }
            })
                .then(response => {
                    // console.log("natCount", natCount)
                    // console.log("nat", nats[natCount])
                    // console.log(response.data[0].first)

                    let idx = [natCount, response.data[0].first, response.data[0].nation1]
                    setFirsts(firsts => [...firsts, idx]);
                })

            axios.get('http://localhost:4001/last/randomsearch', {
                params: {
                    queryString: nats[natCount]
                }
            })
                .then(response => {
                    let idx = [natCount, response.data[0].last, response.data[0].nation1]
                    setLasts(lasts => [...lasts, idx]);
                })
        }

        setNatCount(natCount + 1)
        // triggers everytime nats is updated
    }, [nats])


    var firstsSorted = firsts.sort(function (a, b) { return a[0] - b[0] })
    var lastsSorted = lasts.sort(function (a, b) { return a[0] - b[0] })

    // console.log("firstsSorted", firstsSorted)
    // console.log("lastsSorted", lastsSorted)
    // console.log("playerData", playerData)

    // console.log(firstsSorted.length, lastsSorted.length, playerData.length)
    // console.log(playerData.length > 0 && ((firstsSorted.length, playerData.length) == (playerData.length, lastsSorted.length)))


    if (playerData.length > 0 && ((firstsSorted.length, playerData.length) === (playerData.length, lastsSorted.length))) {
        for (let i = 0; i < playerData.length; i++) {
            playerData[i][2] = firstsSorted[i][1]
            playerData[i][3] = lastsSorted[i][1]
        }
    }

    function refreshPage() {
        window.location.reload(false);
    }

    function exportNamesFile() {
        let buildString = ""
        for (let i = 0; i < playerData.length; i++) {
            const subarray = playerData[i];
            let substring = ""
            let uid = subarray[0]
            let first = '"' + subarray[2] + '"'
            let commmon = "\"\"" //Empty double quotes
            let last = '"' + subarray[3] + '"'
            substring += "\"CHANGE_PLAYER_NAME\"" + "\t" + uid + "\t" + first + "\t" + commmon + "\t" + last

            buildString += substring + "\n"
        }
        var blob = new Blob([buildString], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "Rename.txt");
    }

    return (
        <div className="name-list-wrapper">
            <div className="name-list-form">
                <div className="form-wrapper">
                    <div className="form-row">
                        <fieldset>
                            <button className="btn-add" onClick={refreshPage}>Refresh Page</button>
                            <button className="btn-add" onClick={exportNamesFile}>Export Names</button>
                        </fieldset>
                    </div>
                </div>
            </div>
            {/* Render names list component */}
            <NamesTable data={playerData} />
            <Pics data={playerData} />

        </div>
    )
}
