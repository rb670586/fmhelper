import React, { useState, useEffect } from 'react'
import SoccerLineUp from 'react-soccer-lineup'
import { usePalette } from 'react-palette'
import Select from 'react-select'
import axios from 'axios'
import { weights } from '../data/weights'

// Import styles
import './../styles/teamviewer.css'
import { isTypeOnlyImportOrExportDeclaration } from 'typescript'
import TeamTable from '../components/TeamTable'

export default function Team() {
    //Set states
    const [color, setColor] = useState('#588f58')
    const [pattern, setPattern] = useState('lines')
    const [badge, setBadge] = useState('/badgetemplate.png')
    const [showHomeTeam, setShowHomeTeam] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)

    const [nats, setNats] = useState([])
    const [firsts, setFirsts] = useState([])
    const [lasts, setLasts] = useState([])

    const [homeTeamColor, setHomeTeamColor] = useState('#f08080')
    const [homeTeamNumberColor, setHomeTeamNumberColor] = useState('#ffffff')
    const [homeGoalkeeperColor, setHomeGoalkeeperColor] = useState('#d6cb65')
    const [homeGoalkeeperNumberColor, setHomeGoalkeeperNumberColor] = useState('#333333')
    const [homeTeamClickable, setHomeTeamClickable] = useState(true)

    const options = [
        {
            label: "Premier League",
            options: [
                { label: "2021/22", value: "prem" },
                { label: "2010/11", value: "prem10_11" },
                { label: "UK + Ireland", value: "prem_uki" }
            ]
        },
        {
            label: "La Liga",
            options: [
                { label: "2021/22", value: "laliga" },
                { label: "Spanish", value: "laliga_spa" }
            ]
        },
        {
            label: "Bundesliga",
            options: [
                { label: "2021/22", value: "bundesliga" },
                { label: "Eastern European", value: "bundesliga_ee" }
            ]
        },
        {
            label: "Serie A",
            options: [
                { label: "2021/22", value: "seriea" },
                { label: "South American", value: "seriea_sa" }
            ]
        },
        {
            label: "Ligue 1",
            options: [
                { label: "2021/22", value: "ligue1" },
                { label: "African", value: "ligue1_africa" }
            ]
        },
        {
            label: "Champions League",
            options: [
                { label: "2021/22", value: "cl" },
            ]
        },

    ];

    //Get badge from input url
    function getBadgeFromURL() {
        let result = window.prompt("Enter badge url");
        setBadge(result)

    }

    //Set colors for player icons
    const { data, loading, error } = usePalette(badge)






    //Generate random array of 11 nationalities based on user selection from dropdown
    useEffect(() => {
        if (selectedOption) {
            let arr = weights[selectedOption.value]
            arr.sort(() => Math.random() - 0.5)

            for (let i = 0; i < 11; i++) {
                setNats(oldArray => [...oldArray, arr[i]])
            }
        }

    }, [selectedOption])

    useEffect(() => {
        // console.log("nats.length", nats.length)
        if (nats.length > 0) {
            for (let i = 0; i < nats.length; i++) {
                axios.get('http://localhost:4001/first/randomsearch', {
                    params: {
                        queryString: nats[i]
                    }
                })
                    .then(response => {
                        let idx = [i, response.data[0].first, response.data[0].nation1, response.data[0].id]
                        setFirsts(firsts => [...firsts, idx]);
                    })

                axios.get('http://localhost:4001/last/randomsearch', {
                    params: {
                        queryString: nats[i]
                    }
                })
                    .then(response => {
                        let idx = [i, response.data[0].last, response.data[0].nation1]
                        setLasts(lasts => [...lasts, idx]);
                    })
            }

        }
    }, [nats])


    //Build team
    // const buildHomeTeam = () => {
    //     return {
    //         squad: {
    //             gk: {
    //                 name: "Jones",
    //                 number: 1,
    //                 color: `${homeGoalkeeperColor}`,
    //                 numberColor: `${homeGoalkeeperNumberColor}`,
    //                 onClick: homeTeamClickable ? (() => alert(`Home team - Player ${1}`)) : undefined
    //             },
    //             df: [{
    //                 number: 2,
    //                 onClick: homeTeamClickable ? (() => alert(`Home team - Player ${2}`)) : undefined
    //             }, {
    //                 number: 4,
    //                 onClick: homeTeamClickable ? (() => alert(`Home team - Player ${4}`)) : undefined
    //             }, {
    //                 number: 5,
    //                 onClick: homeTeamClickable ? (() => alert(`Home team - Player ${5}`)) : undefined
    //             }, {
    //                 number: 3,
    //                 onClick: homeTeamClickable ? (() => alert(`Home team - Player ${3}`)) : undefined
    //             }],
    //             cm: [{
    //                 number: 6,
    //                 onClick: homeTeamClickable ? (() => alert(`Home team - Player ${6}`)) : undefined
    //             }, {
    //                 number: 8,
    //                 onClick: homeTeamClickable ? (() => alert(`Home team - Player ${8}`)) : undefined
    //             }],
    //             cam: [{
    //                 number: 11,
    //                 onClick: homeTeamClickable ? (() => alert(`Home team - Player ${11}`)) : undefined
    //             }, {
    //                 number: 10,
    //                 onClick: homeTeamClickable ? (() => alert(`Home team - Player ${10}`)) : undefined
    //             }, {
    //                 number: 7,
    //                 onClick: homeTeamClickable ? (() => alert(`Home team - Player ${7}`)) : undefined
    //             }],
    //             fw: [{
    //                 number: 9,
    //                 onClick: homeTeamClickable ? (() => alert(`Home team - Player ${9}`)) : undefined
    //             }]
    //         },
    //         style: {
    //             color: `${data.vibrant}`,
    //             numberColor: `${homeTeamNumberColor}`
    //         }
    //     }
    // }



    const buildHomeTeam = () => {

        //Build numbers
        const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
        let defNums = [2, 3, 4, 5, 6]
        defNums = defNums.concat(range(11, 25, 1))
        let midNums = [5, 6, 7, 8, 10]
        midNums = midNums.concat(range(11, 25, 1))
        let fwdNums = [7, 8, 9]
        fwdNums = fwdNums.concat(range(11, 25, 1))
        let finalNums = []

        for (let i = 0; i < 11; i++) {
            if (i <= 3) {
                let num = defNums[Math.floor(Math.random() * defNums.length)]
                finalNums.push(num)
                defNums = defNums.filter(item => item !== num)
                midNums = midNums.filter(item => item !== num)
                fwdNums = fwdNums.filter(item => item !== num)
            } else if (4 <= i <= 6) {
                let num = midNums[Math.floor(Math.random() * midNums.length)]
                finalNums.push(num)
                midNums = midNums.filter(item => item !== num)
                fwdNums = fwdNums.filter(item => item !== num)
            } else {
                let num = fwdNums[Math.floor(Math.random() * fwdNums.length)]
                finalNums.push(num)
                fwdNums = fwdNums.filter(item => item !== num)
            }
        }


        return {
            squad: {
                gk: {
                    name: `${nats[0][3]}`,
                    number: 1,
                    color: `${homeGoalkeeperColor}`,
                    numberColor: `${homeGoalkeeperNumberColor}`,
                    onClick: homeTeamClickable ? (() => alert(`${nats[0][2]} ${nats[0][3]} #${1}`)) : undefined
                },
                df: [{
                    name: `${nats[1][3]}`,
                    number: finalNums[1],
                    onClick: homeTeamClickable ? (() => alert(`Home team - Player ${2}`)) : undefined
                }, {
                    name: `${nats[2][3]}`,
                    number: finalNums[2],
                    onClick: homeTeamClickable ? (() => alert(`Home team - Player ${4}`)) : undefined
                }, {
                    name: `${nats[3][3]}`,
                    number: finalNums[3],
                    onClick: homeTeamClickable ? (() => alert(`Home team - Player ${5}`)) : undefined
                }, {
                    name: `${nats[4][3]}`,
                    number: finalNums[4],
                    onClick: homeTeamClickable ? (() => alert(`Home team - Player ${3}`)) : undefined
                }],
                cm: [{
                    name: `${nats[5][3]}`,
                    number: finalNums[5],
                    onClick: homeTeamClickable ? (() => alert(`Home team - Player ${6}`)) : undefined
                }, {
                    name: `${nats[6][3]}`,
                    number: finalNums[6],
                    onClick: homeTeamClickable ? (() => alert(`Home team - Player ${8}`)) : undefined
                }],
                cam: [{
                    name: `${nats[7][3]}`,
                    number: finalNums[7],
                    onClick: homeTeamClickable ? (() => alert(`Home team - Player ${11}`)) : undefined
                }, {
                    name: `${nats[8][3]}`,
                    number: finalNums[8],
                    onClick: homeTeamClickable ? (() => alert(`Home team - Player ${10}`)) : undefined
                }, {
                    name: `${nats[9][3]}`,
                    number: finalNums[9],
                    onClick: homeTeamClickable ? (() => alert(`Home team - Player ${7}`)) : undefined
                }],
                fw: [{
                    name: `${nats[10][3]}`,
                    number: finalNums[10],
                    onClick: homeTeamClickable ? (() => alert(`Home team - Player ${9}`)) : undefined
                }]
            },
            style: {
                color: `${data.vibrant}`,
                numberColor: `${homeTeamNumberColor}`
            }
        }
    }

    // Reset all input fields
    const resetData = () => {
        setNats([])
        setSelectedOption(null)
        setShowHomeTeam(false)
        setFirsts([])
        setLasts([])
    }
    var firstsSorted = firsts.sort(function (a, b) { return a[0] - b[0] })
    var lastsSorted = lasts.sort(function (a, b) { return a[0] - b[0] })

    // console.log(firstsSorted)
    // console.log(lastsSorted)

    if (nats.length > 0 && ((firstsSorted.length, nats.length) === (nats.length, lastsSorted.length))) {
        for (let i = 0; i < nats.length; i++) {
            nats[i] = [firstsSorted[i][3], firstsSorted[i][2], firstsSorted[i][1], lastsSorted[i][1]]
        }
    }

    // console.log(nats)
    // console.log("check", nats.length > 0 && typeof nats[0] == "object")
    return (
        <div className='float-container'>
            <div className='float-child-left'>
                <SoccerLineUp
                    size={"normal"}
                    color={color}
                    pattern={pattern}
                    homeTeam={showHomeTeam ? buildHomeTeam() : undefined}
                />
                <button onClick={setShowHomeTeam}>View Team</button>
                <button onClick={resetData}>Reset</button>
                <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                />
                {nats.length > 0 && typeof nats[0] == "object" &&
                    <TeamTable data={nats} />
                }

            </div>
            <div className='float-child-right'>
                <button onClick={getBadgeFromURL}>Get badge</button>
                <img
                    src={badge}
                    alt="logo"
                    width="270"
                    height="270"
                />
            </div>
        </div>
    )
}