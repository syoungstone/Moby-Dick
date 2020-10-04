<template>
  <div>
    <h1>Create Account</h1>
    <div id="login">
      <section>
        <form>
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
            <div id="image-container">
              <img id="image-preview" ref="imagePreview" :src="profile.image" />
            </div>
            <button @click="removeImage" id="remove-image">
              Remove Picture
            </button>
          </div>
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
          >
            Create Account
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: {
        image: '',
        username: '',
        email: '',
        password: ''
      },
      passwordConfirm: ''
    }
  },
  computed: {
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
      this.createImage(files[0])
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
      //TODO
    }
  }
}
</script>

<style>
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
#image-container {
  width: 115px;
  height: 115px;
  clip-path: circle(50% at 50% 50%);
}
#image-preview {
  width: 100%;
  height: 100%;
}
.error-message {
  color: rgb(216, 0, 0);
}
</style>
