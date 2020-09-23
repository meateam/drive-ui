import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';

import store from '@/store'

Vue.use(new VueSocketIO({
    connection: 'http://localhost:3003',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
}));
