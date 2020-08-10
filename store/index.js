import { getPokemonsFromApi } from '@/helper/helper'
import axios from 'axios'

export const state = () => ({
  pokemons: [],
  types: {},
})

export const mutations = {
  SAVE_POKEMONS(state, pokemons) {
    state.pokemons = pokemons
  },

  SAVE_TYPES(state, types) {
    state.types = types
  },
}

export const actions = {
  async fetchPokemons({ commit }, limit) {
    commit('SAVE_POKEMONS', await getPokemonsFromApi(limit))
  },

  async fetchTypes({ commit }) {
    await axios
      .get('https://pokeapi.co/api/v2/type/')
      .then((result) => {
        commit('SAVE_TYPES', result.data.results)
      })
      .catch((error) => {
        throw new Error(`API ${error}`)
      })
  },
}
