import React, {useState, useEffect} from 'react'
import PokemonListData from '../../assets/data/pokedex'
import getPokemonImage, {pokemonDefaultImage, zeroPad} from "../../utility/utility";
import PokemonType from "../../components/PokemonType/PokemonType";
import {NavLink} from "react-router-dom";
import style from './PokemonDetail.module.css'

function PokemonDetail(props) {
	const {match} = props
	const id = parseInt(match.params.number)
	const currentPokemon = PokemonListData.filter(pokemon => pokemon.id === id)[0]
	const typeList = currentPokemon.type.map(type => <PokemonType key={type} typeName={type}/>)

	const [pokemonData, setPokemonData] = useState([])
	const [pokemonSpeciesData, setPokemonSpeciesData] = useState([])

	useEffect(() => {
		let isMounted = true
		fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
			.then(res => res.json())
			.then(res => {
				if (isMounted) {
					setPokemonData(res)
				}

			})
			.catch(error => console.log('Error' + error));

		fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
			.then(res => res.json())
			.then(res => {
				if (isMounted) {
					setPokemonSpeciesData(res)
				}
			})
			.catch(error => console.log('Error' + error));

		return () => {
			isMounted = false
		}

	}, [id]);

	let sprites = [];
	if (pokemonData && pokemonData.sprites) {
		Object.keys(pokemonData.sprites).map(key => {
			if (typeof pokemonData.sprites[key] === 'string')
				return sprites.push({src: pokemonData.sprites[key], name: key})
		});
	}

	return (
		<div className="container my-4">
			<div>
				{(id - 1 !== 0) &&
				<NavLink className="btn btn-secondary col-3" to={`/pokedex/${id - 1}`}>Pokemon precedente</NavLink>}
				{(id < PokemonListData.length) &&
				<NavLink className="btn btn-secondary col-3 offset-6" to={`/pokedex/${id + 1}`}>Pokemon
					successivo</NavLink>}
			</div>
			<div className="row justify-content-center">
				<div className="col-10">
					<h1>{currentPokemon.name.english}</h1>
					<div className={`row shadow my-5 d-flex`}>
						<div className={`${style.imageContainer} col-4`}>
							<img className={`${style.image}`}
								 src={getPokemonImage(currentPokemon.id)}
								 onError={event => pokemonDefaultImage(event)}
								 alt={currentPokemon.name.english}/>
						</div>
						<div className="col-8">
							{pokemonData.weight &&
							<div>Weight: {pokemonData.weight}</div>}
							{pokemonData.height &&
							<div>Weight: {pokemonData.height}</div>}
							{pokemonData.abilities &&
							<div>
								Abilities:
								<ul>
									{pokemonData.abilities.map(ability => {
										return <li key={ability.ability.name}>{ability.ability.name}</li>
									})}
								</ul>
							</div>}
							{pokemonData.stats &&
							<div>
								stats:
								<ul>
									{pokemonData.stats.map((statsItem) => {
											return <li
												key={statsItem.stat.name}>{statsItem.stat.name}: {statsItem.base_stat}</li>
										}
									)}
								</ul>
							</div>
							}

							{sprites &&
							<div>
								sprites:
								{sprites.map((spriteItem) => {
									return <img key={spriteItem.name}
												src={spriteItem.src}
												alt={spriteItem.name}/>
								})}
							</div>
							}
							{pokemonSpeciesData.generation &&
							<div> {pokemonSpeciesData.generation.name}</div>
							}
							{pokemonSpeciesData.flavor_text_entries &&
							<div>
								{pokemonSpeciesData.flavor_text_entries.filter((textItem) => textItem.language.name === "en")[0]?.flavor_text}
							</div>
							}
							{pokemonSpeciesData.genera &&
							<div>
								Genera:
								{pokemonSpeciesData.genera.filter((generaItem) => generaItem.language.name === "en")[0]?.genus}
							</div>
							}

						</div>
					</div>
					<div>#{zeroPad(id, 3)}</div>
					<div>{typeList}</div>
				</div>
			</div>

		</div>
	)

}

export default PokemonDetail
