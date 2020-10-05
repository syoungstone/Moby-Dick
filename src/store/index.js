import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

// realtime firebase connection
fb.commentsCollection.orderBy('timestamp', 'desc').onSnapshot(snapshot => {
  let commentsArray = []

  snapshot.forEach(doc => {
    let comment = doc.data()
    comment.id = doc.id

    commentsArray.push(comment)
  })

  store.commit('setComments', commentsArray)
})

const store = new Vuex.Store({
  state: {
    userProfile: {},
    comments: []
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setComments(state, val) {
      state.comments = val
    }
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      )
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
      router.push('/')
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      )

      // create user profile object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        username: form.username,
        email: form.email,
        image: form.image
      })

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)

      // change route to profile
      router.push('/profile')
    },
    async logout({ commit }) {
      await fb.auth.signOut()

      // clear userProfile and redirect to /login
      commit('setUserProfile', {})
      router.push('/')
    },
    async submitComment({ state }, comment) {
      await fb.commentsCollection.add({
        uid: fb.auth.currentUser.uid,
        image: state.userProfile.image,
        username: state.userProfile.username,
        timestamp: new Date(),
        text: comment.text,
        likes: 0,
        dislikes: 0,
        replies: 0
      })
    }
  }
})

export default store
