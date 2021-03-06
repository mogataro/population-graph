import { cloneDeep } from 'lodash'

const initialState = {
  prefectures: [],
  prefCodes: []
}

export const state = () => cloneDeep(initialState)

export const getters = {
  // 都道府県データ全て返す
  getPrefectures(state) {
    return state.prefectures
  },
  // postCodeを引数にすると、該当の都道府県名を返す
  getPrefectureId: state => id => {
    const prefecture = state.prefectures.find(
      prefecture => prefecture.prefCode === id
    )
    return !!prefecture ? prefecture.prefName : ''
  },
  // チェックボックスでチェックのついている都道府県コードを返す
  getPrefCodes(state) {
    return state.prefCodes
  }
}

export const mutations = {
  initPrefectures(state, payload) {
    if (payload === null) {
      state = Object.assign(state, initialState)
    } else {
      state.prefectures = payload
    }
  },
  mutationUpdatePrefCodes(state, payload) {
    if (payload === null) {
      state = Object.assign(state, initialState)
    } else {
      state.prefCodes = payload
    }
  }
}

export const actions = {
  async fetchPrefectures({ commit }) {
    const { data } = await this.$axios.get('v1/prefectures', {
      headers: {
        'X-API-KEY': process.env.API_KEY
      }
    })
    commit('initPrefectures', data.result)
  },
  actionUpdatePrefCodes({ commit }, newPrefCodes) {
    commit('mutationUpdatePrefCodes', newPrefCodes)
  }
}
