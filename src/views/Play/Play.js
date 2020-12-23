import React, {useState, useEffect} from 'react'
import moment from 'moment'
import Semaforo from '../../components/Semaforo/Semaforo'


import {NavLink} from "react-router-dom";


const Play = (props) => {
	const [ previousGreen, setPreviousGreen ] = useState('' )
	const [durataSemaforo, setDurataSemaforo] = useState()
	const [durataGreen, setDurataGreen] = useState()
	const [durataYellow, setDurataYellow] = useState()
	const [durataRed, setDurataRed] = useState()
	const [ counter, setCounter ] = useState( 1 )
	const {match} = props
	const id = parseInt(match.params.id)
	const [colore, setColore] = useState({color :'' })
	let appoggia = 0;

	useEffect( () => {
		fetch( `http://localhost:5000/api/v1/play/${id}`)
			.then( res => res.json())
			// .then( res => JSON.parse(res))
			.then( res => {
				console.log(res.time)
				setPreviousGreen(res.time)
				setDurataSemaforo(res.totalDuration)
				setDurataGreen(res.greenDuration)
				setDurataYellow(res.yellowDuration)
				setDurataRed(res.redDuration)
				return res
			})
			.then( res => {
				console.log('sono nel then' + previousGreen)
				start( res.time )
			})
		// console.log('sono qui dopo la fetch')

	}, [ ] )


	useEffect( () => {
		if ( counter != 1 && counter > 0) {
			setTimeout( () => {
				console.log('sono nel secondo use effect' + counter)
				setCounter( counter -1000 )
			}, 1000)
		}
	}, [ counter ])

	useEffect( () => {
		let lightElapse
		switch ( colore.color ) {

			case 'green':
				lightElapse = durataGreen
				break;

			case 'yellow':
				lightElapse = durataYellow
				break;

			case 'red':
				lightElapse = durataRed
				break;

			default:
				break;

		}
		setTimeout( () => {
			switch ( colore.color ) {

				case 'green':
					setColore({color: 'yellow'})
					break;

				case 'yellow':
					setColore({color: 'red'})
					break;

				case 'red':
					setColore({color: 'green'})
					break;

				default:
					break;

			}
		}, lightElapse )
	}, [ colore ])

	const start = ( last_green ) => {

		let format = 'h:mm:ss:SSS'
		let now = moment().format(format)
		let proximus = moment.utc(now, format).diff(moment.utc( last_green, format), 'milliseconds')
		console.log('previous green ' + last_green)
		let next = last_green
		console.log('next' + next)
		let superato = false

		while ( !superato ) {
			next = moment.utc( next, 'h:mm:ss:SSS' ).add( 12006, 'milliseconds').format("h:mm:ss:SSS")
			console.log(next)
			if ( moment.utc(now, format).diff(moment.utc( next, format), 'milliseconds') < 0)
				superato = true
		}
		console.log(next)
		console.log('esco dal while')

		now = moment().format(format)
		let timeSpreadToNextGreen = Math.abs(moment.utc(now, format).diff(moment.utc( next, format), 'milliseconds'))
		console.log(timeSpreadToNextGreen)
		let evenTimer = timeSpreadToNextGreen - timeSpreadToNextGreen % 1000
		setTimeout( () => {
			setCounter( evenTimer )
			console.log('sono nel secondo timeout')
		}, timeSpreadToNextGreen % 1000 )
		setTimeout( () => setColore({ color:'green'}) , timeSpreadToNextGreen)

	}


	return (
		<div>
			sono il semaforo: {previousGreen} e inizio fra {counter / 1000} secondi.
			<span> il semaforo è ora: { colore.color }</span>
			<div>
				<Semaforo
					light={colore}
					onLightRelease={ '' }
					onActivation={ '' }
					id = {id}
				/>
			</div>
		</div>

	)
}

export default Play