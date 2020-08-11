<template>
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
          <p><strong>Base Experience: </strong>{{ pokemon.base_experience }}</p>
          <p><strong>Type: </strong>{{ mapTypes(pokemon.types) }}</p>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonCards',

  props: {
    filteredPokemons: {
      type: Array,
      required: true,
    },
  },

  methods: {
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

<style>
.font-size-card {
  font-size: 1.2rem;
}
</style>
