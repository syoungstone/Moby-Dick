<template>
  <div>
    <h1 v-if="accountCreated">Success!</h1>
    <div v-else id="login">
      <h1>Create Account</h1>
      <p class="error-message" v-if="this.signupErrorMessage">
        {{ signupErrorMessage }}
      </p>
      <section>
        <form @submit.prevent>
          <div v-if="!profile.image">
            <p>Choose a profile picture (optional)</p>
            <input
              type="file"
              @change="onFileChange"
              accept="image/*"
              id="upload-image"
            />
          </div>
          <div v-else>
            <BaseProfilePicture :imgSrc="profile.image" dimensions="115px" />
            <button @click="removeImage" id="remove-image">
              Remove Picture
            </button>
          </div>
          <p class="error-message" v-if="fileTooBig">
            Image may not exceed 1 Megabyte!<br />Please choose a smaller one.
          </p>
          <div>
            <input
              v-model.trim="profile.username"
              type="text"
              placeholder="Username"
              id="username1"
            />
          </div>
          <div>
            <input
              v-model.trim="profile.email"
              type="text"
              placeholder="Email"
              id="email1"
            />
          </div>
          <div>
            <input
              v-model.trim="profile.password"
              type="password"
              placeholder="Password"
              id="password1"
            />
          </div>
          <div>
            <input
              v-model.trim="passwordConfirm"
              type="password"
              placeholder="Confirm Password"
              id="password2"
            />
          </div>
          <p class="error-message" v-if="!validEmail && this.profile.email">
            Invalid email!
          </p>
          <p class="error-message" v-if="!matchingPasswords">
            Passwords don't match!
          </p>
          <p
            class="error-message"
            v-if="!validPassword && matchingPasswords && this.profile.password"
          >
            Password must have at least 8 characters!
          </p>
          <button
            :disabled="
              !validEmail ||
                !matchingPasswords ||
                !validPassword ||
                !this.profile.username
            "
            @click="createAccount()"
            id="create-account"
            class="button"
            type="button"
          >
            Create Account
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      profile: {
        image: '',
        username: '',
        email: '',
        password: ''
      },
      passwordConfirm: '',
      accountCreated: false,
      fileTooBig: false
    }
  },
  computed: {
    ...mapState(['signupErrorMessage']),
    matchingPasswords() {
      return this.profile.password === this.passwordConfirm
    },
    validEmail() {
      let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      return regex.test(this.profile.email)
    },
    validPassword() {
      return this.profile.password.length >= 8
    }
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.fileTooBig = files[0].size > 1000000
      if (!this.fileTooBig) {
        this.createImage(files[0])
      }
    },
    createImage(file) {
      var reader = new FileReader()
      reader.onload = e => {
        this.profile.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage() {
      this.profile.image = ''
    },
    createAccount() {
      this.$store.dispatch('signup', {
        username: this.profile.username,
        email: this.profile.email,
        password: this.profile.password,
        image: this.profile.image
      })
      setTimeout(() => {
        if (!this.signupErrorMessage) {
          this.accountCreated = true
        }
      }, 2000)
    }
  }
}
</script>

<style scoped>
input,
#create-account {
  padding: 10px;
}
input,
button {
  margin: 10px 0px;
}
#remove-image {
  margin: 10px 0px;
  padding: 0px 10px;
}
#upload-image {
  padding: 0px;
  margin: 0px;
  margin-bottom: 10px;
}
.error-message {
  color: rgb(216, 0, 0);
}
</style>
