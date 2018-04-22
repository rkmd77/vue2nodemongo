// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency'

Vue.config.productionTip = false;

Vue.filter("currencyFormat", currency);		//全局过滤器-调用货币格式化方法

Vue.use(infiniteScroll);
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