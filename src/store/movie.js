import axios from 'axios'

export default {
  // module화 하여 사용한다는 점을 명시
  namespaced: true,
  // data를 의미함
  state:  () => ({ 
    movies: [],
    message: '',
    loading: false 
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
      const { title, type, number ,year} = payload
      const OMDB_API_KEY = '8648bbdc'

      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      const { Search, totalResults } = res.data
      context.commit('updateState', {
        movies: Search
      })
      const total = parseInt(totalResults, 10)
      const pageLength = Math.ceil(total / 10)
      // 추가 요청
      if (pageLength > 1){
        for(let page = 2; page <= pageLength; page += 1){
          if(page > (number / 10)) break
          const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
          const { Search } = res.data
          context.commit('updateState', {
            movies: [...context.state.movies, ...Search]
          })
        }
      }
    }
  }
}
