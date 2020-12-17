import React from 'react'
import PokemonType from "../PokemonType/PokemonType";
import {Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap'
import style from './PokemonCard.module.css'
import {zeroPad} from "../../utility/utility";

function PokemonCard(props) {
	const {name, number, image, types} = props
	const typeList = types.map( type => <PokemonType key={`${number}`-`${type}`} typeName={type}/>)

	return (
		<Card className={style.card}>
			<CardImg className={style.image} top width="100%" src={image} alt={name}/>
			<CardBody className="text-center">
				<CardTitle tag="h5" className={`h3 ${style.title}`}>{name}</CardTitle>
				<CardText>
					#{zeroPad(number, 3)}
				</CardText>
				<div className={style.types}>
					{typeList}
				</div>
			</CardBody>
		</Card>
	)
}

export default PokemonCard