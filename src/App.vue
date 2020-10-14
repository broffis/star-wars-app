<template>
  <div id="app">
    <backdrop v-if="showModal" @close="toggleModal"/>

    <template v-if="users.length > 0">
      <table class="user-table"  :class="{ 'modal-is-open': showModal }">
        <thead class="user-table__header">
          <tr class="user-table__row">
            <th
              v-for="(item, index) in display_info"
              :key="`${item.value}-${index}`"
              class="user-table__header-cell">{{ item.label }}</th>
          </tr>
        </thead>
        <tbody class="user-table__body">
          <tr
            v-for="(user, index) in users"
            :key="`user-data--${index + 1}`"
            class="user-table__row">
            <td
              v-for="(item, i) in display_info"
              :key="`${item.value}-${i}--user-data-${index}`"
              @click="item.value === 'planet' ? toggleModal() : null"
              :class="[
                'user-table__user-cell',
                { 'planet-value': item.value === 'planet'}
              ]"
            >
              {{ user[item.value] }}
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      Data loading...
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Backdrop from './components/Backdrop.vue';

export default {
  name: 'App',

  components: {
    Backdrop,
  },

  data() {
    return {
      display_info: [
        {
          label: "Name",
          value: "name",
        },
        {
          label: "Height",
          value: "height",
        },
        {
          label: "Mass (kg)",
          value: "mass",
        },
        {
          label: "Created",
          value: "created",
        },
        {
          label: "Edited",
          value: "edited",
        },
        {
          label: "Planet",
          value: "planet",
        },
      ],

      showModal: false
    };
  },

  computed: {
    ...mapGetters({
      users: "users",
      planets: "planets"
    })
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    ...mapActions(["fetchData"]),

    toggleModal() {
      this.showModal = !this.showModal;
    }
  }
}
</script>

<style lang="scss" scoped>
// Screen Sizes
$tablet: "450px";
$desktop: "768px";

// Colors

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;

  &.modal-is-open {
    position: fixed;
    height: 100vh;
    width: 100vh;
    overflow-y: hidden;
  }
}



.planet-value {
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
}

.user-table {
  border: 2px solid black;
  border-collapse: collapse;
  border-radius: 5px;
  margin: 0 auto;

  &__header {
    font-size: 1.75rem;
  }

  &__header-cell {
    padding: 0 10px;
  }

  &__user-cell {
    font-size: 1.25rem;
    padding: 5px 10px;
    border-top: 1px solid black;
  }
}
</style>
