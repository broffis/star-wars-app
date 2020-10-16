<template>
  <div id="app">
    <nav class="nav-bar">
      <ul class="nav-bar__links">
        <li class="nav-bar__link"><a href="https://github.com/broffis/star-wars-app"><i class="fab fa-github"></i></a></li>
      </ul>
    </nav>
    <template v-if="users.length > 0">
      <table class="user-table"  :class="{ 'modal-is-open': showPlanetModal }">
        <thead class="user-table__header">
          <tr class="user-table__row">
            <th
              v-for="(item, index) in display_info"
              :key="`${item.value}-${index}`"
              :class="[
                'user-table__header-cell',
                { 'hide-mobile' : !showOnMobile(item.value) && isMobile}
              ]">
              {{ item.label }}
            </th>
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
              @click="item.value === 'planet' ? selectPlanet(user[item.value]) : 
                item.value === 'name' && isMobile ? selectUser(user[item.value]) : null"
              :class="[
                'user-table__user-cell',
                { 'planet-value': item.value === 'planet'},
                { 'hide-mobile' : !showOnMobile(item.value) && isMobile}

              ]"
            >
              {{ user[item.value] }}
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <p class="loading-text">
      Data loading...
      </p>
    </template>

    <backdrop v-if="showPlanetModal || showSidebar || showUserModal" @close="closeAll"/>
    <!-- Planet Info Modal -->
    <modal
      v-if="showPlanetModal"
      @close="closeModal"
      :headerText="selectedPlanet.name"
    >
      <template v-slot:modal-body>
      <div class="modal-info">
        <p class="modal-info__cell">
          <span class="modal-info__label">Name:</span>
          <span class="modal-info__data">{{ selectedPlanet.name }}</span>
        </p>
        <p class="modal-info__cell">
          <span class="modal-info__label">Diameter:</span>
          <span class="modal-info__data">{{ formatNumber(selectedPlanet.diameter) }}</span>
        </p>
        <p class="modal-info__cell">
          <span class="modal-info__label">Climate:</span>
          <span class="modal-info__data">{{ selectedPlanet.climate }}</span>
        </p>
        <p class="modal-info__cell">
          <span class="modal-info__label">Population:</span>
          <span class="modal-info__data">{{ formatNumber(selectedPlanet.population) }}</span>
        </p>
      </div>
        
      </template>
    </modal>

    <!-- User Info Modal -->
    <modal
      v-if="showUserModal"
      @close="closeModal"
      :headerText="selectedUser.name"
    >
      <template v-slot:modal-body>
      <div class="modal-info">
        <p class="modal-info__cell">
          <span class="modal-info__label">Height (cm):</span>
          <span class="modal-info__data">{{ selectedUser.height }}</span>
        </p>
        <p class="modal-info__cell">
          <span class="modal-info__label">Mass (kg):</span>
          <span class="modal-info__data">{{ formatNumber(selectedUser.mass) }}</span>
        </p>
        <p class="modal-info__cell">
          <span class="modal-info__label">Created:</span>
          <span class="modal-info__data">{{ selectedUser.created }}</span>
        </p>
        <p class="modal-info__cell">
          <span class="modal-info__label">Edited:</span>
          <span class="modal-info__data">{{ selectedUser.edited }}</span>
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

      isMobile: false,

      selectedPlanet: {},
      showPlanetModal: false,

      selectedUser: {},
      showUserModal: false,

      showSidebar: false,
    };
  },

  computed: {
    ...mapGetters({
      users: "users",
      planets: "planets"
    }),
  },

  mounted() {
    this.isMobile = screen.width < 768;
    this.fetchData();
  },

  methods: {
    ...mapActions(["fetchData"]),

    closeAll() {
      this.showPlanetModal = false;
      this.showUserModal = false;
      this.showSidebar = false;
    },

    closeModal() {
      this.showPlanetModal = false;
      this.showUserModal = false;
    },

    closeSidebar() {
      this.showSidebar = false;
    },

    formatNumber(num) {
      return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },

    selectPlanet(name) {
      let [chosenPlanet] = this.planets.filter(planet => planet.name === name);

      this.selectedPlanet = chosenPlanet;
      this.showPlanetModal = true;
    },

    selectUser(name) {
      console.log('select user')
      let [chosenUser] = this.users.filter(user => user.name === name);

      console.log(chosenUser)

      this.selectedUser = chosenUser;
      this.showUserModal = true;
    },
    
    showOnMobile(val) {
      if (val === "planet" || val === "name") return true;
      return false;
    }
  }
}
</script>
