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
        activeBoard: {},
        lists: [],
        boardList: [],
        tasks: {}
    },
    mutations: {
        updateUser(state, payload) {
            state.user = payload
        },
        setLists(state, payload){
            state.lists.push(payload)
        },
        setTasks(state, payload){
            state.tasks.push(payload)
        },
        setBoardLists(state, payload){
            state.boardList = payload
        },
        setBoard(state, payload){
            state.boards.push(payload)
        }
    },
    actions: {
        //list actions
        createList({commit, dispatch}, payload){
            api.post('lists', payload).then(res =>{
                commit('setLists', res.data)
            })
        },
        getLists({commit, dispatch}, payload){
            debugger
            api.get('boards/'+ payload + '/lists').then(res =>{
                commit('setBoardLists', res.data)
            })
        },
        //task actions
        createTask({commit, dispatch}, payload){
            api.post('tasks', payload).then(res =>{
                commit('setTasks', res.data)
            })
        },
        //board actions
        createBoard({commit, dispatch}, payload){
            api.post('boards', payload).then(res =>{
                commit('setBoards', res.data)
            })
        },
        //user/login actions
        createUser({ commit, dispatch }, payload) {
            auth.post("register", payload).then(res => {
                commit('updateUser', res.data.user)
                router.push({ name: 'Home' })
            })
        },
        login({ commit, dispatch }, payload) {
            auth.post('login', payload).then(res => {
                commit('updateUser', res.data.user)
                router.push({ name: 'Home' })
            })
                .catch(err => {
                    console.log('Invalid Username or Password')
                })

        },
        authenticate({ commit, dispatch }, payload) {
            auth.get('authenticate', payload).then(res => {
                commit('updateUser', res.data)
            })
                .catch(err => {
                    console.log(err);
                    router.push({ name: 'Login'})
                })
        },
        logout({ commit, dispatch }, payload) {
            auth.delete('logout')
                .then(res => {
                    commit('updateUser', {})
                    dispatch('authenticate', payload)
                })
        }
    }
})