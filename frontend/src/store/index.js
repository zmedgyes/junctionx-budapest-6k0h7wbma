import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoaderOn:false,
    isFirstHomeLoad: true
  },
  mutations: {
    setIsLoaderOn(state,status){
      state.isLoaderOn = status ? status : false;
    },
    setFirstHomeLoad(state, status){
      state.isFirstHomeLoad = status ? status : false;
    }
  },
  actions: {
    activateLoader(context){
      context.commit('setIsLoaderOn',true)
    },
    deActivateLoader(context){
      context.commit('setIsLoaderOn',false)
    },
    activateFirstHome(context){
      context.commit('setFirstHomeLoad',true)
    },
    deActivateFirstHome(context){
      context.commit('setFirstHomeLoad',false)
    },
  },
  getters: {
  }
})
