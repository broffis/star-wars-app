<template>
  <div id="app">
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
              @click="item.value === 'planet' ? selectPlanet(user[item.value]) : null"
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

    <backdrop v-if="showModal || showSidebar" @close="closeAll"/>
    <!-- Planet Info Modal -->
    <modal
      v-if="showModal"
      @close="closeModal"
      :headerText="selectedPlanet.name"
    >
      <template v-slot:modal-body>
      <div class="planet-info">
        <p class="planet-info__cell">
          <span class="planet-info__label">Name:</span>
          <span class="planet-info__data">{{ selectedPlanet.name }}</span>
        </p>
        <p class="planet-info__cell">
          <span class="planet-info__label">Diameter:</span>
          <span class="planet-info__data">{{ formatNumber(selectedPlanet.diameter) }}</span>
        </p>
        <p class="planet-info__cell">
          <span class="planet-info__label">Climate:</span>
          <span class="planet-info__data">{{ selectedPlanet.climate }}</span>
        </p>
        <p class="planet-info__cell">
          <span class="planet-info__label">Population:</span>
          <span class="planet-info__data">{{ formatNumber(selectedPlanet.population) }}</span>
        </p>
      </div>
        
      </template>
    </modal>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Backdrop from './components/Backdrop.vue';
import Modal from './components/Modal.vue';

export default {
  name: 'App',

  components: {
    Backdrop,
    Modal
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

      selectedPlanet: {},
      showModal: false,
      showSidebar: false
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

    formatNumber(num) {
      return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },

    selectPlanet(name) {
      let [chosenPlanet] = this.planets.filter(planet => planet.name === name);

      this.selectedPlanet = chosenPlanet;
      this.showModal = true;
    },

    closeAll() {
      this.showModal = false;
      this.showSidebar = false;
    },

    closeModal() {
      this.showModal = false;
    },

    closeSidebar() {
      this.showSidebar = false;
    }
  }
}
</script>
