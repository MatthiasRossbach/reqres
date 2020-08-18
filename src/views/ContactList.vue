<template>
  <v-container class="fill-height" fluid>
    <v-row class="is-column">
      <v-col cols="auto">
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="contacts"
          class="elevation-1"
        >
          <template v-slot:item.avatar="{ item }">
            <v-img :src="item.avatar"></v-img>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row class="is-column">
      <v-form ref="form" v-model="valid" lazy-validation="true">
        <v-col cols="auto">
          <v-row class="is-column">
            <v-text-field
                v-model="firstname"
                :rules="nameRules"
                label="First name"
                required
              ></v-text-field>
          </v-row>
          <v-row>
              <v-text-field
                v-model="lastname"
                :rules="nameRules"
                label="Last name"
                required
              ></v-text-field>
          </v-row>
          <v-row>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
          </v-row>
          <v-row>
            <v-btn
              :disabled="!valid"
              color="success"
              @click="submit"
            >
              Add Contact
              <v-progress-circular
                v-if="saving"
                :size="10"
                :width="2"
                color="white"
                indeterminate
              ></v-progress-circular>
            </v-btn>
          </v-row>
        </v-col>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'ContactList',
  data () {
    return {
      valid: false,
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      loading: true,
      saving: false
    }
  },
  created () {
    this.$store.dispatch('loadContacts').then((response) => {
      this.loading = false
    })
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.saving = true
        this.$store.dispatch('addContact', { first_name: this.firstname, last_name: this.lastname, email: this.email }).then((response) => {
          this.$refs.form.reset()
          this.saving = false
        })
      }
    }
  },
  computed: {
    headers () {
      const headers = []
      if (this.$store.state.contacts.data) {
        Object.keys(this.$store.state.contacts.data[0]).forEach((key) => {
          headers.push({ text: key.toUpperCase(), value: key })
        })
      }
      return headers
    },
    contacts () {
      return this.$store.state.contacts.data
    }
  }
}
</script>

<style scoped>
.is-column {
  flex-direction: column;
  align-items: center;
}
</style>
