import React from 'react'
import getPokemonImage, {pokemonDefaultImage} from '../../utility/utility.js'
import style from './PokemonTable.module.css'
import PokemonType from "../PokemonType/PokemonType";
import {Link} from "react-router-dom";
import {NavLink} from "react-router-dom";

function PokemonTable(props) {
	const {trafficLightList} = props

	console.log('ciao' + trafficLightList)

	const TL_tr = trafficLightList.map( (trafficLightEntry, index) => {
		// const types = pokemon.type.map( type => {
		// 	return <PokemonType key={`${pokemon.id}-${type}`} typeName={type}/>
		// });

		console.log(index)

		return (
			<tr key={index}
			className={style.no_border}>
				{/*<td>*/}
				{/*	<img src={getPokemonImage(pokemon.id)}*/}
				{/*		 onError={event => pokemonDefaultImage(event)}*/}
				{/*		 alt=""/>*/}
				{/*</td>*/}
				<td>
					{trafficLightEntry.name}
				</td>
				<td>
					<NavLink to={`/play/${trafficLightEntry.id}`}>Esegui il semaforo</NavLink>
				</td>
				{/*<td>*/}
				{/*	<NavLink to={`/pokedex/${pokemon.id}`}>*/}
				{/*		vedi ➡*/}
				{/*	</NavLink>*/}
				{/*</td>*/}
			</tr>
		)
	});

	return(
		<table className="table">
			<tbody>
			{ TL_tr }
			</tbody>
		</table>
	)
}

export default PokemonTable