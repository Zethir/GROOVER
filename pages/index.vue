<template>
  <div>
    <b-navbar variant="light" type="light">
      <b-navbar-brand href="#">
        <img src="~/assets/pokeball.png" alt="Pokeball" class="nav-img-size" />
      </b-navbar-brand>
    </b-navbar>
    <div class="container">
      <div class="row">
        <div
          v-for="pokemon in pokemons"
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
            </div>
          </b-card>
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
    return {}
  },

  computed: {
    ...mapState(['pokemons']),
  },

  mounted() {
    this.fetchPokemons(150)
  },

  methods: {
    ...mapActions(['fetchPokemons']),
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
</style>
