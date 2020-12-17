import React from 'react'
import PokemonListData from "../../assets/data/pokedex.json";
import PokemonCardsGrid from "../../components/PokemonCardsGrid/PokemonCardsGrid";
import {Link} from 'react-router-dom'

const starterPokemon = PokemonListData.filter( starter => [1, 4, 7].includes(starter.id))

function Home() {
	return(
		<div className="container">
			<div className="row justify-content-center">
				<div className="col">
					<p>
						<PokemonCardsGrid pokemonList={starterPokemon}
										  col={{xs:1, sm:2, md:3, lg:3, xl:3}}/>
					</p>
				</div>
				<div className="col">
					<Link to="/pokedex"> Torna al Pokedex </Link>
				</div>
			</div>
		</div>
	)
}

export default Home