import React from 'react'
import clsx from "clsx";
import style from "./PokemonType.module.css"

function PokemonType(props) {
	const {typeName} = props

	return(
		<div className={clsx(style.type, style[typeName.toLowerCase()])} data-type={typeName}/>
	)
}

export default PokemonType