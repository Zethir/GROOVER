<template>
  <b-form-group label-cols-sm="5" :label="searchLabel" :label-for="searchId">
    <b-form-input
      :id="searchId"
      v-model="search"
      :placeholder="searchPlaceholder"
      @input="emitSearch"
    >
    </b-form-input>
  </b-form-group>
</template>

<script>
export default {
  name: 'SearchInput',

  props: {
    searchLabel: {
      type: String,
      default: 'Search:',
    },
    searchId: {
      type: String,
      required: true,
    },
    searchPlaceholder: {
      type: String,
      default: 'Enter your search',
    },
  },

  data() {
    return {
      search: '',
    }
  },

  methods: {
    emitSearch() {
      this.$emit('search', this.search)
    },
  },
}
</script>

<style></style>
