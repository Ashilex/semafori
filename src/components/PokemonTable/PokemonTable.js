import React from 'react'
import getPokemonImage, {pokemonDefaultImage} from '../../utility/utility.js'
import style from './PokemonTable.module.css'
import PokemonType from "../PokemonType/PokemonType";
import {Link} from "react-router-dom";
import {NavLink} from "react-router-dom";

function PokemonTable(props) {
	const {pokemonList} = props

	const pokemonTr = pokemonList.map( pokemon => {
		const types = pokemon.type.map( type => {
			return <PokemonType key={`${pokemon.id}-${type}`} typeName={type}/>
		});

		return (
			<tr key={pokemon.id}>
				<td>
					<img src={getPokemonImage(pokemon.id)}
						 onError={event => pokemonDefaultImage(event)}
						 alt=""/>
				</td>
				<td>
					{pokemon.name.english}
				</td>
				<td>
					{types}
				</td>
				<td>
					<NavLink to={`/pokedex/${pokemon.id}`}>
						vedi ➡
					</NavLink>
				</td>
			</tr>
		)
	})
	return(
		<table className="table">
			<tbody>
			{pokemonTr}
			</tbody>
		</table>
	)
}

export default PokemonTable