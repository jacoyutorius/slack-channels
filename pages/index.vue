<template>
  <div>
    <section class="_container">
      <b-navbar toggleable="md" type="dark" variant="dark">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand v-bind:to="'/'">Slack Channels</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav v-if="dataExist">
            <b-nav-item v-bind:to="'chart'">Chart</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="Channel" right>
              <b-dropdown-item v-bind:href="'#' + channel.id" v-for="channel in channels" v-bind:key="channel.id">{{ channel.name }}</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </section>

    <section v-if="dataExist" class="container">
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
    <section v-else class="container">
      <b-form class="form" @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          label="Slack API Token:"
          label-for="apiToken"
          description="We'll never share your token with anyone else.">
          <b-form-input id="apiToken"
            type="text"
            v-model="form.slackApiToken"
            required
            placeholder="Enter Slack API Token">
          </b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="default">Reset</b-button>
      </b-form>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import BootstrapVue from 'bootstrap-vue'
import UserCard from "~/components/UserCard"

export default {
  name: "index",
  data: function(){
    return {
      form: {
        slackApiToken: "",
      },
      show: true
    }
  },
  components: {
    UserCard
  },
  computed: {
    dataExist: function(){
      return (this.channels.length && this.users.length) > 0;
    },
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
    },
    onSubmit (evt){
      evt.preventDefault();
      // alert(JSON.stringify(this.form));

      this.$store.dispatch("getSlackData", {
        slackApiToken: this.form.slackApiToken
      })
    },
    onReset (evt) {
      evt.preventDefault();
      this.form.slackApiToken = ""
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
}

.channel-area {
  margin-top: 20px;
}

.form {
  min-width: 600px;
}

.b-form-group {
  color: #fff !important;
}

button {
  margin-right: 10px;
}
</style>
