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

fb.likesCollection.onSnapshot(snapshot => {
  let likesArray = []

  snapshot.forEach(doc => {
    let like = doc.data()
    likesArray.push(like)
  })

  store.commit('setLikes', likesArray)
  store.commit('setUserLikes')
})

fb.dislikesCollection.onSnapshot(snapshot => {
  let dislikesArray = []

  snapshot.forEach(doc => {
    let dislike = doc.data()
    dislikesArray.push(dislike)
  })

  store.commit('setDislikes', dislikesArray)
  store.commit('setUserDislikes')
})

const store = new Vuex.Store({
  state: {
    userProfile: {},
    likes: [],
    dislikes: [],
    userLikes: [],
    userDislikes: [],
    comments: [],
    loggedIn: false,
    signupErrorMessage: '',
    loginErrorMessage: ''
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
      if (state.userProfile && fb.auth.currentUser) {
        state.userProfile.uid = fb.auth.currentUser.uid
        state.loggedIn = true
      } else {
        state.userLikes = []
        state.userDislikes = []
        state.loggedIn = false
      }
    },
    setComments(state, val) {
      state.comments = val
    },
    setLikes(state, val) {
      state.likes = val
    },
    setDislikes(state, val) {
      state.dislikes = val
    },
    setUserLikes(state) {
      let userLikes = []
      if (state.likes && fb.auth.currentUser) {
        for (let i = 0; i < state.likes.length; i++) {
          if (state.likes[i].userId === fb.auth.currentUser.uid) {
            userLikes.push(state.likes[i].commentId)
          }
        }
      }
      state.userLikes = userLikes
    },
    setUserDislikes(state) {
      let userDislikes = []
      if (state.dislikes && fb.auth.currentUser) {
        for (let i = 0; i < state.dislikes.length; i++) {
          if (state.dislikes[i].userId === fb.auth.currentUser.uid) {
            userDislikes.push(state.dislikes[i].commentId)
          }
        }
      }
      state.userDislikes = userDislikes
    }
  },
  actions: {
    async login({ dispatch, commit, state }, form) {
      // sign user in
      state.loginErrorMessage = ''
      state.signupErrorMessage = ''
      await fb.auth
        .signInWithEmailAndPassword(form.email, form.password)
        .then(({ user }) => {
          // fetch user profile and set in state
          dispatch('fetchUserProfile', user)
          commit('setUserLikes')
          commit('setUserDislikes')
          router.push('/', () => {})
        })
        .catch(e => {
          state.loginErrorMessage = e.message
        })
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())
    },
    async signup({ dispatch, state }, form) {
      // sign user up
      state.loginErrorMessage = ''
      state.signupErrorMessage = ''
      await fb.auth
        .createUserWithEmailAndPassword(form.email, form.password)
        .then(({ user }) => {
          // create user profile object in userCollections
          fb.usersCollection.doc(user.uid).set({
            username: form.username,
            email: form.email,
            image: form.image
          })

          // fetch user profile and set in state
          dispatch('fetchUserProfile', user)

          // change route to profile
          router.push('/profile', () => {})
        })
        .catch(e => {
          state.signupErrorMessage = e.message
        })
    },
    async logout({ commit }) {
      await fb.auth.signOut()

      // clear userProfile and redirect to /login
      commit('setUserProfile', {})
      router.push('/', () => {})
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
        reply: comment.reply,
        parentId: comment.parentId
      })
    },
    async deleteComment({ commit }, comment) {
      await fb.commentsCollection.doc(comment.id).delete()
      await fb.likesCollection
        .where('commentId', '==', comment.id)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete()
          })
        })
      await fb.dislikesCollection
        .where('commentId', '==', comment.id)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete()
          })
        })
      commit('setUserLikes'), commit('setUserDislikes')
    },
    async addLike({ state }, comment) {
      await fb.likesCollection.add({
        commentId: comment.id,
        userId: state.userProfile.uid
      })
      fb.commentsCollection.doc(comment.id).update({
        likes: comment.count + 1
      })
    },
    async addDislike({ state }, comment) {
      await fb.dislikesCollection.add({
        commentId: comment.id,
        userId: state.userProfile.uid
      })
      fb.commentsCollection.doc(comment.id).update({
        dislikes: comment.count + 1
      })
    },
    async removeLike({ state }, comment) {
      await fb.likesCollection
        .where('commentId', '==', comment.id)
        .where('userId', '==', state.userProfile.uid)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete()
          })
        })
      fb.commentsCollection.doc(comment.id).update({
        likes: comment.count - 1
      })
    },
    async removeDislike({ state }, comment) {
      await fb.dislikesCollection
        .where('commentId', '==', comment.id)
        .where('userId', '==', state.userProfile.uid)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete()
          })
        })
      fb.commentsCollection.doc(comment.id).update({
        dislikes: comment.count - 1
      })
    }
  }
})

export default store
