import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import BuyModalComponent from './components/Shared/BuyModal'
import * as fb from 'firebase'
import './stylus/main.styl'

Vue.use(VueRouter);
Vue.component('app-buy-modal', BuyModalComponent);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
    store,
    created() {
        fb.initializeApp({
            apiKey: "AIzaSyCTyfQIUgMQgAmEPkNl9HEHYUY_cQHnOlc",
            authDomain: "itc-ads-15962.firebaseapp.com",
            databaseURL: "https://itc-ads-15962.firebaseio.com",
            projectId: "itc-ads-15962",
            storageBucket: "itc-ads-15962.appspot.com",
            messagingSenderId: "808713492279"
        });
        fb.auth().onAuthStateChanged(user => {
            if (user) {
                this.$store.dispatch('autoLoginUser', user)
            }
        });
        this.$store.dispatch('fetchAds')
    }
}).$mount('#app');
