import { getPokemonsFromApi } from '@/helper/helper'

export default async function ({ store }) {
  store.commit('SAVE_POKEMONS', await getPokemonsFromApi(25))
}
