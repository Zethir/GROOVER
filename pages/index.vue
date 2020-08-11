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
          <b-form-group
            label-cols-sm="5"
            label="Search Pokemons:"
            label-for="input-search"
          >
            <b-form-input
              id="input-search"
              v-model="search"
              placeholder="Enter your search"
            >
            </b-form-input>
          </b-form-group>
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
      </div>
      <div class="row mb-3">
        <div
          v-for="pokemon in filteredPokemons"
          :key="pokemon.id"
          class="col-md-3 mt-3"
        >
          <b-card
            :header="pokemon.name.toUpperCase()"
            header-bg-variant="warning"
            align="center"
            header-text-variant="white"
            class="rounded border card-width h4"
          >
            <div class="font-size-card" align="left">
              <p><strong>Height: </strong>{{ pokemon.height }}</p>
              <p><strong>Weight: </strong>{{ pokemon.weight }}</p>
              <p>
                <strong>Base Experience: </strong>{{ pokemon.base_experience }}
              </p>
              <p><strong>Type: </strong>{{ mapTypes(pokemon.types) }}</p>
            </div>
          </b-card>
        </div>
      </div>
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

export default {
  name: 'Main',

  middleware: 'preFetchPokemons',

  data() {
    return {
      search: '',
      selectedType: '',
    }
  },

  computed: {
    ...mapState(['pokemons', 'types']),
    filteredPokemons() {
      let pokes = this.pokemons
      let searchString = this.search
      let selectedType = this.selectedType

      if (searchString) {
        searchString = searchString.trim().toLowerCase()

        pokes = pokes.filter((pokemon) => {
          if (pokemon.name.toLowerCase().includes(searchString)) {
            return pokemon
          }
        })
      } else if (selectedType) {
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
      return pokes
    },
  },

  mounted() {
    this.fetchPokemons(150)
    this.fetchTypes()
  },

  methods: {
    ...mapActions(['fetchPokemons', 'fetchTypes']),
    mapTypes(types) {
      return types
        .map((elem) => {
          return elem.type.name
        })
        .join(',')
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

.font-size-card {
  font-size: 1.2rem;
}

.text-primary {
  color: #2a75bb !important;
}
</style>
