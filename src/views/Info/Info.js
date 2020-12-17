import React, {useState, useEffect} from 'react'
import clsx from "clsx";
import style from './Info.module.css';

// import React, { useState, useEffect } from 'react';

const Info = () => {
	const [seconds, setSeconds] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const [signal, setSignal] = useState('green')

	function toggle() {
		setIsActive(!isActive);
	}
	
	function nextLight() {
		console.log('siamo nella nextlight' + signal)
		switch (signal) {
			case 'green':
				return {
					color:'yellow',
					duration: 4500
				}
			case 'yellow':
				return {
					color:'red',
					duration: 500
				}
			default:
				return {
					color:'green',
					duration: 2500
				}
		}
	}
	
	function reset() {
		setSeconds(0);
		setIsActive(false);
	}

	useEffect(() => {
		let interval = null;
		let next = nextLight()

		if (isActive) {
			interval = setTimeout(() => {
				// setSeconds(seconds => seconds + 1);
				setSignal(next.color)
			}, next.duration);
		} else if (!isActive && seconds !== 0) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isActive, seconds, signal]);

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<h1>Semaforo di Via Circonvallazione</h1>
					<div className={clsx(style.redLight, style.light, {[style.active]: signal === 'red'})}> </div>
					<div className={clsx(style.yellowLight, style.light, {[style.active]: signal === 'yellow'})}> </div>
					<div className={clsx(style.greenLight, style.light,  {[style.active]: signal === 'green'})}> </div>

					<div className={style.app}>
						<div className={style.time}>
							{seconds}s
						</div>
						<div className="row">
							<button className={`style.button style.button-primary style.button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
								{isActive ? 'Pause' : 'Start'}
							</button>
							<button className={style.button} onClick={reset}>
								Ferma semaforo
							</button>
						</div>
					</div>
				</div>
			</div>



		</div>
	);
};

export default Info

// function Info() {
//
// 	const [signal, setSignal] = useState('green')
// 	useEffect( () => {
//
//
// 		setTimeout( setSignal('red'), 5000);
//
//
// 	})
//
// 	return(
// 		<div className="container">
// 			<div className="row">
// 				<div className="col">
// 					<h1>Semaforo di Via Circonvallazione</h1>
// 					<div className={clsx(style.redLight, style.light, {[style.active]: signal === 'red'})}></div>
// 					<div className={clsx(style.yellowLight, style.light, {[style.active]: signal === 'yellow'})}></div>
// 					<div className={clsx(style.greenLight, style.light,  {[style.active]: signal === 'green'})}></div>
// 				</div>
// 			</div>
//
//
//
// 		</div>
// 	)
// }


