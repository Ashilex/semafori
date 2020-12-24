import React, {useState, useEffect} from 'react'
import getPokemonImage, {pokemonDefaultImage} from '../../utility/utility.js'
import style from './PokemonTable.module.css'
import PokemonType from "../PokemonType/PokemonType";
import {Link} from "react-router-dom";
import {NavLink} from "react-router-dom";
import {Accordion, Card} from 'react-bootstrap'
import Styled from 'styled-components'
import clsx from 'clsx'




function PokemonTable(props) {
	const {trafficLightList} = props
	const [attivo, setAttivo] = useState(0)

	const toggle = (id) => {

		if (attivo === id) {
			setAttivo(null);
		} else {
			setAttivo(id);
		}

	}

	console.log('ciao' + trafficLightList)

	const TL_rowCard_item = ['ale', 'miki', 'emmanuel', 'persefone'].map( (e, index) => {
		return (
			<Card>
				<div className="d-flex justify-content-center">
					<div className={`d-flex flex-column align-items-center ${style.perc100}`}>

						<Accordion.Toggle className={(attivo === index) ? `${style.active}` : `${style.default_line}` } style={{ backgroundImage: `url("https://www.nicesnippets.com/image/imgpsh_fullsize.png")`}} eventKey={`${index}`} onClick={ () => toggle(index) }>
							{`${e}`}
						</Accordion.Toggle>
						<Accordion.Collapse eventKey={`${index}`}>
							<Card.Body >Hello! I'm the body</Card.Body>
						</Accordion.Collapse>
					</div>
				</div>
			</Card>
		)
	})



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
					<Link to={{ pathname: '/add_semaforo',
						state: {
							nextId: trafficLightEntry.id
						}
					}}>Monitora</Link>
				</td>
				<td>
					<NavLink to={`/play/${trafficLightEntry.id}`}>Play</NavLink>
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
		<div>

			<Accordion className={style.accordion} defaultActiveKey="0">

				{TL_rowCard_item}

			</Accordion>

			<table className="table">
				<tbody>
				{ TL_tr }
				</tbody>
			</table>

		</div>
	)
}

export default PokemonTable