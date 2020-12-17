import React, {useState} from 'react'
import style from './Pokedex.module.css'
import PokemonTable from '../../components/PokemonTable/PokemonTable'
import PokemonCardsGrid from '../../components/PokemonCardsGrid/PokemonCardsGrid'
import clsx from 'clsx'
import PokemonListData from '../../assets/data/pokedex'
import {Link} from "react-router-dom";

function Pokedex() {
	const [displayGrid, setDisplayGrid] = useState("true")

	return(
		<div className="container">
			<div className="row justify-content-center">
				<div className="offset-3 col">
					 <div className={style.switch}>
						 <div 	className={clsx(style.option, {[style.active]: displayGrid})}
							 	onClick={ () => setDisplayGrid(true)}>
							 Grid
						 </div>
						 <div	className={clsx(style.option, {[style.active]: !displayGrid})}
							 	onClick={ () => setDisplayGrid(false)}>
							 Table
						 </div>
					 </div>
				</div>
				<butto className="col-3">
					<button className="button btn-secondary">
						<Link to={`/add_semaforo`}>Aggiungi un nuovo semaforo</Link>
					</button>
				</butto>
			</div>

			<div className="row justify-content-center">
				<div className="col">
					{displayGrid ?
						<PokemonCardsGrid pokemonList={PokemonListData}
											col={{xs:1, sm:2, md:3, lg:4, xl:5}}/> :
						<PokemonTable pokemonList={PokemonListData}/>}
				</div>
			</div>
		</div>
	)
}

export default Pokedex
