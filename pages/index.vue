<template>
  <div>
    <b-navbar variant="light" type="light">
      <b-navbar-brand href="#">
        <img src="~/assets/pokeball.png" alt="Pokeball" class="nav-img-size" />
      </b-navbar-brand>
    </b-navbar>
    <div class="container">
      <div class="row mt-3">
        <b-col sm="4">
          <SearchInput
            search-label="Search Pokemons:"
            search-id="input-search"
            search-placeholder="Search your pokemons"
            @search="setPokemonSearch"
          >
          </SearchInput>
        </b-col>
        <b-col sm="4">
          <b-form-group
            label-cols-sm="5"
            label="Select Type:"
            label-for="select-type"
          >
            <b-form-select id="select-type" v-model="selectedType">
              <b-form-select-option :value="null">All</b-form-select-option>
              <b-form-select-option
                v-for="type in types"
                :key="type.name"
                :value="type.name"
              >
                {{ type.name }}
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <SearchInput
            search-label="Min Base Experience:"
            search-id="input-experience"
            search-placeholder="Enter min base experience"
            @search="setMinExperience"
          >
          </SearchInput>
        </b-col>
      </div>
      <PokemonCards :filtered-pokemons="filteredPokemons"></PokemonCards>
      <div
        v-if="pokemons.length < 26"
        class="row mb-5 d-flex justify-content-center"
      >
        <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchInput from '@/components/SearchInput'
import PokemonCards from '@/pages/PokemonCards'

export default {
  name: 'Index',

  middleware: 'preFetchPokemons',

  components: {
    SearchInput,
    PokemonCards,
  },

  data() {
    return {
      search: '',
      minExperience: '',
      selectedType: '',
    }
  },

  computed: {
    ...mapState(['pokemons', 'types']),
    filteredPokemons() {
      let pokes = this.pokemons
      let searchString = this.search
      let selectedType = this.selectedType
      let minExperience = this.minExperience

      if (searchString) {
        searchString = searchString.trim().toLowerCase()

        pokes = pokes.filter((pokemon) => {
          if (pokemon.name.toLowerCase().includes(searchString)) {
            return pokemon
          }
        })
      }
      if (selectedType) {
        selectedType = selectedType.trim().toLowerCase()

        pokes = pokes.filter((pokemon) => {
          if (
            pokemon.types.find((poke) =>
              poke.type.name.toLowerCase().includes(selectedType)
            )
          ) {
            return pokemon
          }
        })
      }
      if (minExperience) {
        minExperience = Number(minExperience)

        pokes = pokes.filter((pokemon) => {
          if (pokemon.base_experience >= minExperience) {
            return pokemon
          }
        })

        pokes.sort(
          (a, b) =>
            parseFloat(a.base_experience) - parseFloat(b.base_experience)
        )
      }
      return pokes
    },
  },

  mounted() {
    this.fetchPokemons(150)
    this.fetchTypes()
  },

  methods: {
    ...mapActions(['fetchPokemons', 'fetchTypes']),
    setPokemonSearch(event) {
      this.search = event
    },
    setMinExperience(event) {
      this.minExperience = event
    },
  },
}
</script>

<style scoped>
.card-width {
  max-width: 30rem;
}

.nav-img-size {
  max-height: 3rem;
}

.bg-light {
  background-color: #2a75bb !important;
}

.text-primary {
  color: #2a75bb !important;
}
</style>
