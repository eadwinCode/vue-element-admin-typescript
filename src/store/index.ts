import Vue from 'vue';
import Vuex from 'vuex';
import IRootState from './interfaces';

Vue.use(Vuex);
const store = new Vuex.Store<IRootState>({});
// Declare empty store first, dynamically register all modules later.
export default store
