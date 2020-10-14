import Vue from 'vue';
import Vuex from 'vuex';
import swApi from './api';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    swApi
  }
});
