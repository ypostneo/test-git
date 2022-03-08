export const state = () => ({
  me: null,
  followerList: [],
  followingList: [],
  hasMoreFollower: true,
  hasMoreFollowing: true
})

const totalFollowers = 8
const totalFollowings = 6
const limit = 3

// 동기적 작업
export const mutations = {
  setMe(state, payload) {
    state.me = payload
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname
  },
  removeFollowing(state, payload) {
    const index = state.followingList.findIndex((v) => v.id === payload.id)
    state.followingList.splice(index, 1)
  },
  removeFollower(state, payload) {
    const index = state.followerList.findIndex((v) => v.id === payload.id)
    state.followerList.splice(index, 1)
  },
  loadFollowings(state) {
    const diff = totalFollowings - state.followingList.length
    const fakeUsers = Array(diff > limit ? limit : diff)
      .fill()
      .map((v) => ({
        id: Math.random().toString(),
        nickname: Math.floor(Math.random() * 1000) //숫자 세글자
      }))
    state.followingList = state.followingList.concat(fakeUsers)
    state.hasMoreFollowing = fakeUsers.length === limit
  },
  loadFollowers(state) {
    const diff = totalFollowers - state.followerList.length
    const fakeUsers = Array(diff > limit ? limit : diff)
      .fill()
      .map((v) => ({
        id: Math.random().toString(),
        nickname: Math.floor(Math.random() * 1000) //숫자 세글자
      }))
    state.followerList = state.followerList.concat(fakeUsers)
    state.hasMoreFollower = fakeUsers.length === limit
  }
}
// 비동기적 작업
export const actions = {
  signUp({ commit, state }, payload) {
    // 서버에 회원가입 요청을 보내는 부분
    //REST 비스므리한 API, HTTP API
    this.$axios
      .post(
        "http://localhost:3085/user",
        {
          email: payload.email,
          nickname: payload.nickname,
          password: payload.password
        },
        {
          withCredentials: true
        }
      )
      .then((data) => {
        console.log(data)
        commit("setMe", payload)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  logIn({ commit }, payload) {
    this.$axios
      .post(
        "http://localhost:3085/user/login",
        {
          email: payload.email,
          password: payload.password
        },
        {
          withCredentials: true
        }
      )
      .then((res) => {
        commit("setMe", res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  logOut({ commit }) {
    this.$axios
      .post(
        "http://localhost:3085/user/logout",
        {}, //데이터자리: 빈데이터라도 넣어줘야함
        {
          withCredentials: true
        }
      )
      .then((data) => {
        commit("setMe", null)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  changeNickname({ commit }, payload) {
    commit("changeNickname", payload)
  },
  removeFollowing({ commit }, payload) {
    commit("removeFollowing", payload)
  },
  removeFollower({ commit }, payload) {
    commit("removeFollower", payload)
  },
  loadFollwers({ commit, state }, payload) {
    if (state.hasMoreFollower) {
      commit("loadFollowers")
    }
  },
  loadFollwings({ commit, state }, payload) {
    if (state.hasMoreFollowing) {
      commit("loadFollowings")
    }
  }
}
