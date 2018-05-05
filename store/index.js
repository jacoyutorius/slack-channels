import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    channels: [],
    users: [],
    slack_token: ""
  },
  getters: {
    channels: state => state.channels,
    users: state => state.users,
    slack_token: state => state.slack_token
  },
  mutations: {
    SET_CHANNELS(state, {channels}){
      if (channels != undefined){
        state.channels = channels
        state.channels.sort(function(a, b){
          return b.members.length - a.members.length;
        })
      }
    },
    SET_USERS(state, {members}){
      if (members != undefined){
        state.users = members
      }
    },
    SET_SLACK_TOKEN(state, token){
      if (token != undefined){
        state.slack_token = token
      }
    }
  },
  actions: {
    async nuxtServerInit ({ commit }, { app }) {
      const channels = await this.$axios.$get("https://slack.com/api/channels.list?token=" + this.state.slack_token +"&pretty=1")
      commit('SET_CHANNELS', channels)
      
      const users = await this.$axios.$get("https://slack.com/api/users.list?token=" + this.state.slack_token +"&pretty=1")
      commit('SET_USERS', users)
    },
    async getSlackData({commit}, {slackApiToken}){
      commit("SET_SLACK_TOKEN", slackApiToken);

      const channels = await this.$axios.$get("https://slack.com/api/channels.list?token=" + slackApiToken +"&pretty=1")
      commit('SET_CHANNELS', channels)
      
      const users = await this.$axios.$get("https://slack.com/api/users.list?token=" + slackApiToken +"&pretty=1")
      commit('SET_USERS', users)
    }
  }
})

export default store