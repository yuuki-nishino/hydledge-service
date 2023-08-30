<template>
  <v-sheet color="grey lighten-2" class="mt-2">
    <v-row justify="center">
      <v-col cols="12" md="11">
        <ul class="breadcrumb">
          <li v-for="breadcrumb in breadcrumbs" :key="breadcrumb.name">
            <a v-if="breadcrumb.path" :href="breadcrumb.path">
              <b>{{ breadcrumb.name }}</b>
            </a>
            <span v-else>{{ breadcrumb.name }}</span>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script scoped>
export default {
  props: {
    breadcrumbs: { type: Array, default: () => [] },
  },
}
</script>

<style scoped>
.breadcrumb {
  margin: 0;
  padding: 1em;
  list-style: none;
}

.breadcrumb li {
  display: inline;
  list-style: none;
  font-weight: bold;
}

.breadcrumb li::after {
  content: '>';
  padding: 0 0.5em;
  color: #555;
}

.breadcrumb li:last-child::after {
  content: '';
}

.breadcrumb li a {
  text-decoration: none;
  color: #0e2997;
}

.breadcrumb li a:hover {
  text-decoration: underline;
}
</style>
