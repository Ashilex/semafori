// import React, {useState, useEffect} from 'react'
import clsx from "clsx";
import style from "../../views/Info/Info.module.css";

const Semaforo = (props) => {
	const {light, onLightRelease} = props

	const handleChange = () => {
		onLightRelease()
	}


	return (
		<div>
			<div
				className={clsx(style.redLight, style.light, {[style.active]: light.color === 'red'})}
				onClick={handleChange}> </div>
			<div
				className={clsx(style.yellowLight, style.light, {[style.active]: light.color === 'yellow'})}
				onClick={handleChange}>
			</div>
			<div
				className={clsx(style.greenLight, style.light,  {[style.active]: light.color === 'green'})}
				onMouseUp={handleChange}>

			</div>
		</div>
	)


}

export default Semaforo