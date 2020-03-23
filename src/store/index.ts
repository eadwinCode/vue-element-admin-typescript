import Vue from 'vue';
import Vuex from 'vuex';
import IRootState from './interfaces';
import getters from './getters'

Vue.use(Vuex);

const modulesFiles = require.context('./modules', true, /\.ts$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules: any, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store<IRootState>({
  state: {
    // define global state here and also it to the IRootState interface
  },
  mutations: {
  },
  actions: {
  },
  modules,
  getters
});
