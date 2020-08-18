import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [],
    errors: []
  },
  mutations: {
    loaded (state, data) {
      state.contacts = data
    },
    addContact (state, data) {
      state.contacts.data.push(data)
    }
  },
  actions: {
    loadContacts (context) {
      axios.get('https://reqres.in/api/users').then((response) => {
        context.commit('loaded', response.data)
      }).catch((error) => {
        this.errors = this.errors.push(error)
      })
    },
    addContact (context, contact) {
      axios.post('https://reqres.in/api/users', contact).then((response) => {
        context.commit('addContact', response.data)
      }).catch((error) => {
        this.errors = this.errors.push(error)
      })
    }
  },
  modules: {
  }
})
