import React from 'react'
import PokemonCard from "../PokemonCard/PokemonCard";
import getPokemonImage from "../../utility/utility";
import {NavLink} from "react-router-dom";

function PokemonCardsGrid(props) {
	const {pokemonList, col} = props
	const pokemonCardsCol = pokemonList.map( pokemon => {
		return (
			<div key={pokemon.id} className="col">
				<NavLink to={`/pokedex/${pokemon.id}`}>
					<PokemonCard
						name={pokemon.name.english}
						number={pokemon.id}
						image={getPokemonImage(pokemon.id)}
						types={pokemon.type}
					/>
				</NavLink>
			</div>
		)
	});

	return (
		<div className={`row
			mt-5
			row-cols-${col.xs}
			row-cols-sm-${col.sm}
			row-cols-md-${col.md}
			row-cols-lg-${col.lg}
			row-cols-xl-${col.xl}
			
		`}>
			{pokemonCardsCol}
		</div>
	)
}

export default PokemonCardsGrid