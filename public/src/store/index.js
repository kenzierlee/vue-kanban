import vue from 'vue';
import vuex from 'vuex';
import axios from 'axios';
import router from '../router';

var api = axios.create({
    baseURL: '//localhost:3000/api/',
    withCredentials: true,
    timeout: 3000
});

var auth = axios.create({
    baseURL: '//localhost:3000/auth/',
    withCredentials: true,
    timeout: 3000
});

vue.use(vuex);

export default new vuex.Store({
    state: {
        user: {},
        boards: [],
        lists: [],
        tasks: {}
    },
    mutations: {
        updateUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        
        
        //user/login actions
        createUser({ commit, dispatch }, payload) {
            auth.post("register", payload)
                .then(result => {
                    console.log("created user")
                })
        },
        login({ commit, dispatch }, payload) {
            auth.post('login', payload).then(res => {
                commit('updateUser', res.data.user)
                router.push({ name: 'HelloWorld' })
            })
                .catch(err => {
                    console.log('Invalid Username or Password')
                })

        },
        authenticate({ commit, dispatch }) {
            auth.get('authenticate').then(res => {
                commit('updateUser', res.data)
            })
                .catch(err => {
                    console.log(err);
                })
        },
        logout({ commit, dispatch }, payload) {
            auth.delete('logout')
                .then(res => {
                    commit('updateUser', {})
                })
        }
    }
})