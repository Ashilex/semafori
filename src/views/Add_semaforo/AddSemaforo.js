import React, {useState, useEffect} from 'react'
// import semafori_list from '../../assets/data/semafori.json'
import clsx from "clsx";
import style from './AddSemaforo.module.css';
import Semaforo from '../../components/Semaforo/Semaforo'
import moment from 'moment'



const AddSemaforo = () => {
	const [step, setStep] = useState(1)
	const [data, setData] = useState([])
	const [tempi, setTempi]	= useState({ green: '55', yellow: 'cxv', red: 'vxv' })
	const [formData, setFormData] = useState('')
	const [light, setLight] = useState({color:'green', key: 0})




	const saveData = () => {
		fetch('http://localhost:5000/api/v1/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: '11',
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
		const sequence = ['green', 'yellow', 'red']
		setLight({
			color: sequence[light.key +1 % 3],
			key: light.key +1 % 3
		})
	}
	const recordTime = (light_color, time) => {

		setTempi({...tempi, [light_color]:time})

	}

	const displayTimeInForm = () => {
		nextLight()
		console.log('luce:' + light)
		let activationTime = moment().format('h:mm:ss:SSS')
		recordTime(light.color, activationTime)
		console.log( tempi )
		// setFormData(activationTime)
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
									onLightRelease={ displayTimeInForm } />
							</div>
							<div className="col-6">
								<div>Momento in cui è stato scatta il rosso: {tempi.red}</div>
								<div>Momento in cui è stato scatta il giallo: {tempi.yellow}</div>
								<div>Momento in cui è stato scatta il verde: {tempi.green}</div>

								{/*<form onSubmit={handleSubmit}>*/}
								{/*	<input type="text" name="name" value={formData} onChange={handleChange}  />*/}
								{/*	/!*<div className={style.light} onMouseUp={handleSubmit}></div>*!/*/}
								{/*	<button type="submit">Invia le registrazioni</button>*/}
								{/*</form>*/}
							</div>
						</div>
						<button onClick={ () => setStep(2)}>next</button>
					</>

				);
			case 2 :
				return (
					<div>
						<form onSubmit={handleSubmit}>
							Inserisci nome del semaforo
							<input  type="text" name="name_semaforo" value={formData} onChange={handleChange}  />
							<h5>Titolo del semaforo</h5>
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