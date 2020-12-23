import React, {useState, useEffect} from 'react'
import style from './Pokedex.module.css'
import PokemonTable from '../../components/PokemonTable/PokemonTable'
import PokemonCardsGrid from '../../components/PokemonCardsGrid/PokemonCardsGrid'
import clsx from 'clsx'
import PokemonListData from '../../assets/data/pokedex'
import {Link, useLocation } from "react-router-dom";

function Pokedex() {
	const [displayGrid, setDisplayGrid] = useState("true")
	const [data, setData] = useState([])


	useEffect( () => {
		fetch('http://localhost:5000/api/v1/semafori_list')
			.then( res => res.json())
			.then( res => JSON.parse(res))
			.then( res => setData(res))
	}, [])

	console.log('parent' + data)
	console.log('la res è una stringa ? ' + (typeof data))
	console.log('la res è un array' + Array.isArray(data))



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
						<Link to={{ pathname: '/add_semaforo',
									state: {
										nextId: data.length
									}
						}}>
							Aggiungi un nuovo semaforo
						</Link>
					</button>
				</butto>
			</div>

			<div className="row justify-content-center">
				<div className="col">
					{
						(data.length > 0) && <PokemonTable trafficLightList={data}/>
					}

				</div>
			</div>
		</div>
	)
}

export default Pokedex
