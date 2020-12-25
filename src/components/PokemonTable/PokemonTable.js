import React, {useState, useEffect} from 'react'
import style from './PokemonTable.module.css'
import PokemonType from "../PokemonType/PokemonType";
import {Link} from "react-router-dom";
import {NavLink} from "react-router-dom";
import {Accordion, Card} from 'react-bootstrap'
import getImage, {pokemonDefaultImage, zeroPad} from "../../utility/utility";
import Styled from 'styled-components'
import clsx from 'clsx'
import * as Icon from 'react-bootstrap-icons';




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

	const TL_rowCard_item = trafficLightList.map( (trafficLightEntry, index) => {
		return (
			<Card className={style.cardTL}>
				<div className="d-flex justify-content-center">
					<div className={`d-flex flex-column align-items-center ${style.perc100}`}>

						<Accordion.Toggle className={ (attivo === index) ? `${style.active}` : `${style.default_line}` }
										  style={ (attivo === index) ? { backgroundImage: `url(${getImage(trafficLightEntry.id)})`} : {} }
										  eventKey={`${index}`}
										  onClick={ () => toggle(index) }>
							<div className="textButton">
								{`${trafficLightEntry.name}`}
							</div>
						</Accordion.Toggle>
						<Accordion.Collapse className={`rounded-bottom ${style.collapse}`} eventKey={`${index}`}>
							<Card.Body >
								<div className="d-flex align-items-center">
									<Icon.Geo color="red" size={19} className="mr-2"/> Rosate (MI)
								</div>
								<div className="d-flex align-items-center mt-2">
									<Icon.RecordCircle color="red" size={19} className="mr-2"/> <Link to={{ pathname: '/add_semaforo',
									state: {
										nextId: trafficLightEntry.id
									}
								}}>Aggiungi registrazione</Link>
								</div>
								<div className="d-flex align-items-center mt-2">
									<Icon.Flag color="green" size={19} className="mr-2"/> <NavLink to={`/play/${trafficLightEntry.id}`}>Play</NavLink>
								</div>
							</Card.Body>
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