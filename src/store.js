import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    number: 0
  },
  getters: {
    number: state => {
      return state.number
    }
  },
  mutations: {
    increment(state) {
      state.number++
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  }
})


export default store;
