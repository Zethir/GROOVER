import axios from 'axios'

export async function getPokemonsFromApi(limit) {
  return await axios
    .get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
    .then(async (result) => {
      const poke = []
      const data = result.data.results

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          await axios
            .get(data[key].url)
            .then((pokemon) => {
              poke.push(pokemon.data)
            })
            .catch((error) => {
              throw new Error(`API ${error}`)
            })
        }
      }
      return poke
    })
    .catch((error) => {
      throw new Error(`API ${error}`)
    })
}
