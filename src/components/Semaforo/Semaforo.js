// import React, {useState, useEffect} from 'react'
import clsx from "clsx";
import style from "../../views/Info/Info.module.css";

const Semaforo = (props) => {
	const {light, onLightRelease, onActivation} = props

	const handleChange = () => {
		onLightRelease()
	}

	const handleKeyDown = (event) => {
		// console.log('prova'+ event.target.dataset.light)
		onActivation(event)
	}


	return (
		<div>
			<div
				data-light='red'
				className={clsx(style.redLight, style.light, {[style.active]: light.color === 'red'})}
				onMouseDown={handleKeyDown}
				onClick={handleChange}>
			</div>
			<div
				data-light='yellow'
				className={clsx(style.yellowLight, style.light, {[style.active]: light.color === 'yellow'})}
				onMouseDown={handleKeyDown}
				onClick={handleChange}>

			</div>

			<div
				data-light='green'
				className={clsx(style.greenLight, style.light,  {[style.active]: light.color === 'green'})}
				onMouseDown={handleKeyDown}
				onMouseUp={handleChange}
				>
			</div>
		</div>
	)


}

export default Semaforo