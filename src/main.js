// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(VueLazyLoad,{
	error: '../static/error.png',
  	loading: '../static/loading-svg/loading-bars.svg'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


//或者下列写法也可以
// new Vue({
//   //el: '#app',
//   router,
//   // components: { App },
//   // template: '<App/>'
//   render:h=>h(App)
// }).$mount("#app");