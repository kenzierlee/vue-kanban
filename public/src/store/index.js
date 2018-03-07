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
        boardLists:[],
        tasks: {},
        comments: {}
    },
    mutations: {
        updateUser(state, payload) {
            state.user = payload
        },
        setLists(state, payload){
            state.lists.push(payload)
        },
        setTasks(state, payload){
            vue.set(state.tasks, payload.id, payload.task)
        },
        setBoardLists(state, payload){
            console.log(payload)
            state.boardLists = payload
        },
        setBoards(state, payload){
            state.boards.push(payload)
        },
        displayBoards(state, payload){
            state.boards = payload
        },
        setComments(state,payload){
            vue.set(state.comments, payload.id, payload.comment)
        }
    },
    actions: {
        //comment actions
        createComment({commit, dispatch}, payload){
            api.post('comments', payload).then(res =>{
                dispatch('getComments', payload.taskId)
            })
        },
        getComments({commit, dispatch}, payload){
            api.get('tasks/'+ payload +'/comments').then(res =>{
                commit('setComments', {id: payload, comment: res.data})
            })
        },
        editComment({commit, dispatch}, payload){
            api.put('comments/'+ payload._id, payload).then(res =>{
                dispatch('getComments', payload.taskId)
            })
        },
        deleteComment({commit, dispatch}, payload){
            api.delete('comments/'+ payload._id).then(res =>{
                dispatch('getComments', payload.taskId)
            })
        },
        //list actions
        createList({commit, dispatch}, payload){
            api.post('lists', payload).then(res =>{
                commit('setLists', res.data)
                dispatch('getLists', payload.boardId)
            })
        },
        getLists({commit, dispatch}, payload){
            api.get('boards/'+ payload + '/lists').then(res =>{
                commit('setBoardLists', res.data)
            })
        },
        editList({commit, dispatch}, payload){
            api.put('lists/' + payload._id, payload).then(res =>{
                dispatch('getLists', payload.boardId)
            })
        },
        deleteList({commit, dispatch}, payload){
            api.delete('lists/' + payload._id).then(res =>{
                dispatch('getLists', payload.boardId)
            })
        },
        //task actions
        createTask({commit, dispatch}, payload){
            api.post('tasks', payload).then(res =>{
                dispatch('getTasks', payload.listId)
            })
        },
        getTasks({commit, dispatch}, payload){
            api.get('lists/'+payload+'/tasks').then(res =>{
                commit('setTasks', {id: payload, task: res.data})
            })
        },
        editTask({commit, dispatch}, payload){
            api.put('/tasks/'+ payload._id, payload).then(res =>{
                dispatch('getTasks', payload.listId)
            })
        },
        deleteTask({commit, dispatch}, payload){
            api.delete('tasks/'+ payload._id).then(res =>{
                dispatch('getTasks', payload.listId)
            })
        },
        changeList({commit, dispatch}, payload){
            api.put('/tasks/'+ payload.task, {listId: payload.list._id}).then(res =>{
                dispatch('getTasks', payload.list._id)
                dispatch('getTasks', payload.oldList)
            })
        },
        //board actions
        createBoard({commit, dispatch}, payload){
            api.post('boards', payload).then(res =>{
                commit('setBoards', res.data)
            })
        },
        editBoard({commit, dispatch}, payload){
            api.put(payload.userId +'/boards/'+ payload._id, payload).then(res =>{
                dispatch('getBoards', payload.userId)
            })
        },
        deleteBoard({commit, dispatch}, payload){
            api.delete(payload.userId + '/boards/' + payload._id).then(res =>{
                dispatch('getBoards', payload.userId)
            })
        },
        //get user boards
        getBoards({commit, dispatch}, payload){
            api.get(payload + '/boards')
            .then(res =>{
                commit('displayBoards', res.data)
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
                dispatch('getBoards', res.data._id)
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