import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  // module화 하여 사용한다는 점을 명시
  namespaced: true,
  // data를 의미함
  state:  () => ({ 
    movies: [],
    message: 'Search for the movei title!',
    loading: false,
    theMovie: {} 
  }),
  // computed를 의미함
  getters: {
    movieIds(state) {
      return state.movies.map(m => m.imdbID)
    }
  },
  // methods를 의미함
  // 변이: state에 있는 데이터를 수정가능함 
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state){
      state.movies = []
    }
  },
  // 비동기로 처리 됨
  actions: {
    async searchMovies(context, payload) {
      if (context.state.loading) return // 중복 입력 방지
      context.commit('updateState', {
        message: '',
        loading: true
      })
     try{
      const res = await _fetchMovie({
        ...payload,
        page: 1
      })
      const { Search, totalResults } = res.data
      context.commit('updateState', {
        movies: _uniqBy(Search, 'imdbID')
      })
      const total = parseInt(totalResults, 10)
      const pageLength = Math.ceil(total / 10)
      // 추가 요청
      if (pageLength > 1){
        for(let page = 2; page <= pageLength; page += 1){
          if(page > (payload.number / 10)) break
          const res = await _fetchMovie({
            ...payload,
            page
          })
          const { Search } = res.data
          context.commit('updateState', {
            movies: [...context.state.movies, ..._uniqBy(Search, 'imdbID')]
          })
        }
      }
     }
     catch (message) {
       context.commit('updateState', {
         movies: [],
         message
       })
     }
     finally {
      context.commit('updateState', {
        theMovie: {},
        loading: false
      })
     }
    },
    async searchMovieWithId(context, payload) {
      if (context.state.loading) return // 중복 입력 방지
      context.commit('updateState', {
        loading: true
      })
      try {
        const res = await _fetchMovie(payload)
        context.commit('updateState', {
          theMovie: res.data
        })
      } catch(error){
        context.commit('updateState', {
          theMovie: {}
        })
      } finally {
        context.commit('updateState',{
          loading: false
        })
      }
    }
  }
}

function _fetchMovie(payload) {
  const { title, type, year, page, id} = payload
  const OMDB_API_KEY = '8648bbdc'
  const url = id 
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        if(res.data.Error) {
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}
