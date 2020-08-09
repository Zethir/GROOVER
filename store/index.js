import { getPokemonsFromApi } from '@/helper/helper'

export const state = () => ({
  pokemons: [],
})

export const mutations = {
  SAVE_POKEMONS(state, pokemons) {
    state.pokemons = pokemons
  },
}

export const actions = {
  async fetchPokemons({ commit }, limit) {
    commit('SAVE_POKEMONS', await getPokemonsFromApi(limit))
  },
}
