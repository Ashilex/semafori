import React, {useState, useEffect} from 'react'
// import semafori_list from '../../assets/data/semafori.json'
import clsx from "clsx";
import style from './AddSemaforo.module.css';
import Semaforo from '../../components/Semaforo/Semaforo'
import {Link, useLocation } from 'react-router-dom'

import moment from 'moment'



const AddSemaforo = (props) => {
	const { nextId } = props.location.state
	const [step, setStep] = useState(1)
	const [data, setData] = useState([])
	const [tempi, setTempi]	= useState({ green: '', yellow: '', red: '' })
	const [formData, setFormData] = useState('')
	const [light, setLight] = useState({color:''})
	const location = useLocation();




	const streetLamp = {
		0: 'green',
		1: 'yellow',
		2: 'red',
		next: (color) => {
			console.log('mi viene passato : ' + color)
			switch (color) {
				case 'green':
					return 'yellow'
				case 'yellow':
					return 'red'
				case 'red':
					return 'green'
				default:
					return undefined
			}
		},
		prev: (color) => {
			switch (color) {
				case 'green':
					return 'red'
				case 'yellow':
					return 'green'
				case 'red':
					return 'yellow'
				default:
					return undefined
			}
		}
	}

	const saveData = () => {
		fetch('http://localhost:5000/api/v1/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: nextId.toString(),
				name: formData,
				record: tempi
			}),
		})
			.then((res) => res.json())
			.then((result) => setData(result.rows))
			.catch((err) => console.log('error'))
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		saveData()
		console.log('ok')
	}

	const handleChange = (event) => {
		setFormData(event.target.value)
	}


	const nextLight = () => {
		console.log('luce ora: ' + light.color)
		setLight({
			color: streetLamp.next(light.color)
		})
		console.log('Qui lo stato della luce dovrebbe essere cambiato: ' + light.color)
	}
	const recordTime = (light_color, time) => {

		setTempi({...tempi, [light_color]:time})

	}

	const displayTimeInForm = () => {
		nextLight()
		console.log('Luce:' + light.color)
		let activationTime = moment().format('h:mm:ss:SSS')
		recordTime(streetLamp.next(light.color), activationTime)
		console.log( tempi )
		// setFormData(activationTime)
	}

	const onKeyDownFirstLight = (event) => {
		let firstLight = event.target.dataset.light
		console.log('La prima luce che si accende è : ' + firstLight)
		setLight({
			color: firstLight,
			// key: lightsMap.get(firstLight),
		})
	}




	function renderSwitch(step) {
		switch(step) {
			case 1 :
				return (
					<>
						<div className="row">
							<div className="col-6">
								<Semaforo
									light={light}
									onLightRelease={ displayTimeInForm }
									onActivation={ onKeyDownFirstLight }
									/>
							</div>
							<div className="col-6">
								<div>Momento in cui scatta il rosso: {tempi.red}</div>
								<div>Momento in cui scatta il giallo: {tempi.yellow}</div>
								<div>Momento in cui scatta il verde: {tempi.green}</div>

								{/*<form onSubmit={handleSubmit}>*/}
								{/*	<input type="text" name="name" value={formData} onChange={handleChange}  />*/}
								{/*	/!*<div className={style.light} onMouseUp={handleSubmit}></div>*!/*/}
								{/*	<button type="submit">Invia le registrazioni</button>*/}
								{/*</form>*/}
							</div>
						</div>
						<button  onClick={ () => setStep(2)}>next</button>
					</>

				);
			case 2 :
				return (
					<div>
						<form onSubmit={handleSubmit}>
							Inserisci nome del semaforo
							<input  type="text" name="name_semaforo" value={formData} onChange={handleChange}  />
							<h5>Titolo del semaforo</h5>
							<h4>Id: { `${nextId}` }</h4>
							<div>{formData}</div>
							<button type="submit">Invia i dati</button>
						</form>
						<button onClick={ () => setStep(1)} > Previous </button>
						<button onClick={ () => setStep(3)} > Next </button>
					</div>
				);
			default:
				return <div>caso oh
					<button onClick={ () => setStep(1)} > Previous </button>
					<button >Invia dati</button></div>;
		}
	}

	return (
		<div className="container">
		{console.log('luce del semaforo nel render '+  light.color)}
			<div className="row">
				<div className="col">
					<h1>Aggiungi un semaforo</h1>



					{ renderSwitch(step)}


				</div>
			</div>

		</div>
	);
}

export default AddSemaforo