<template>
  <div>
    <section class="_container">
      <b-navbar toggleable="md" type="dark" variant="dark">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="/">Slack Channels</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item href="/chart">Chart</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="Channel" right>
              <b-dropdown-item v-bind:href="'#' + channel.id" v-for="channel in channels" v-bind:key="channel.id">{{ channel.name }}</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </section>

    <section class="container">
      <div>
        <div v-bind:id="channel.id" class="channel-area" v-for="channel in channels" v-bind:key="channel.id">
          <b-jumbotron v-bind:header="channel.name" v-bind:lead="channel.purpose.value" >
            <p>{{ channel.topic.value }}</p>
            <b-button @click="goToChannel(channel.id)">Join this channel</b-button>
          </b-jumbotron>

          <b-row>
            <b-col v-for="userid in channel.members" v-bind:key="userid">
              <user-card v-bind:user_id="userid"></user-card>
            </b-col>
          </b-row>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import BootstrapVue from 'bootstrap-vue'
import UserCard from "~/components/UserCard"

export default {
  name: "index",
  components: {
    UserCard
  },
  computed: {
    ...mapGetters(["channels", "users"])
  },
  methods: {
    getUser: function(id){
      return this.users.find(function(row){
        if (row.id === id){ return true }
      })
    },
    goToChannel: function(channel_id){
      window.open("https://fourier.slack.com/messages/" + channel_id)
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
}

.channel-area {
  margin-top: 20px;
}
</style>
