import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const SLACK_TOKEN="xoxp-2517657486-2520528132-104643891280-f7818324c31a33f8445367ada29d2507"

const store = () => new Vuex.Store({
  state: {
    channels: [],
    users: []
  },
  getters: {
    channels: state => state.channels,
    users: state => state.users
  },
  mutations: {
    SET_CHANNELS(state, {channels}){
      state.channels = channels
    },
    SET_USERS(state, {members}){
      state.users = members
    }
  },
  actions: {
    async nuxtServerInit ({ commit }, { app }) {
      const channels = await this.$axios.$get("https://slack.com/api/channels.list?token=" + SLACK_TOKEN +"&pretty=1")
      commit('SET_CHANNELS', channels)
      
      const users = await this.$axios.$get("https://slack.com/api/users.list?token=" + SLACK_TOKEN +"&pretty=1")
      commit('SET_USERS', users)
    }
  }
})

export default store