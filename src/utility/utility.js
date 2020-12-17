import ball from '../assets/images/pokeball.png'
export const zeroPad = (num, places) => String(num).padStart(places, '0')

export const pokemonDefaultImage = (onErrorEvent) => onErrorEvent.target.src = ball

export const removeDashesAndUnderscores  = (text) => text.replace(/[\-_]/g, ' ');

export const cleanText = (text) => text.replace(/[^ -~]+/g, " ");

const getPokemonImage = (id) =>
	`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${zeroPad(id, 3)}.png`;

export default getPokemonImage