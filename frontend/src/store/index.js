import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoaderOn:false,
  },
  mutations: {
    setIsLoaderOn(state,status){
      state.isLoaderOn = status ? status : false;
    },
  },
  actions: {
    activateLoader(context){
      context.commit('setIsLoaderOn',true)
    },
    deActivateLoader(context){
      context.commit('setIsLoaderOn',false)
    },
  },
  getters: {
  }
})
