<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span slot="bread">Goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
              <div class="filter-nav">
                <span class="sortby">Sort by:</span>
                <a href="javascript:void(0)" class="default cur">Default</a>
                <a href="javascript:void(0)" class="price" @click="sortGoods">Price 
                    <svg class="icon icon-arrow-short" :class="{'sort-up':!sortFlag}">
                        <use xmlns:xlink-"http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-short">
                            <svg id="icon-arrow-short" viewBox="0 0 25 32" width="100%" height="100%"><title>arrow-short</title> <path d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z" class="path1"></path></svg>
                        </use>
                    </svg>
                </a>
                <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
              </div>
              <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter" :class="{'filterby-show':filterShow}">
                  <dl class="filter-price">
                    <dt>Price:</dt>
                    <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" v-bind:class="{'cur':priceRangeChecked=='all'}">All</a></dd>
                    <dd v-for="(pricerange,index) in priceFilter">
                      <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceRangeChecked==index}">{{pricerange.startPrice}} - {{pricerange.endPrice}}</a>
                    </dd>
                  </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                  <div class="accessory-list col-4">
                    <ul>
                      <li v-for="(item,index) in goodslist">
                        <div class="pic">
                          <a href="#"><img v-lazy="'static/'+item.productImage" alt=""></a>
                        </div>
                        <div class="main">
                          <div class="name">{{item.productName}}</div>
                          <div class="price">{{item.salePrice}}</div>
                          <div class="btn-area">
                            <a href="javascript:;" class="btn btn--m" @click="addtoCart(item.productId)">Add to Cart</a>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                        <img src="../../static/loading-svg/loading-bubbles.svg" alt="" v-if="loading">
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="md-overlay" v-show="overlayShow" @click="closePop"></div>
        <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
            <p slot="message">
                Please Login First, or you can NOT add cart!
            </p>
            <div slot="btnGroup">
                <a href="javascrip:;" class="btn btn--m" @click="mdShow=false">Close</a>
            </div>
        </modal>
        <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
            <p slot="message">
                <svg class="icon-status-ok">
                        <use xmlns:xlink-"http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok">
                            <svg id="icon-arrow-short" viewBox="0 0 25 32" width="100%" height="100%"><title>arrow-short</title> <path d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z" class="path1"></path></svg>
                        </use>
                    </svg>
                Product Added! 
            </p>
            <div slot="btnGroup">
                <a href="javascrip:;" class="btn btn--m" @click="mdShowCart=false">Keep Shopping</a>
                <router-link href="javascrip:;" class="btn btn--m" to="/cartlist">View Cart</router-link>
            </div>
        </modal>
        <nav-footer></nav-footer>
    </div>
</template>
<style>
    .container{
        padding: 0 10px;
    }
    .filter-nav{
        height: 55px;
        line-height: 55px;
        background-color: white;
        text-align: right;
        padding-right: 20px;
        margin: 60px 0 30px 0;

    }
    .def{
        color: #ee7a23;
        }
    .filter-nav span{
        margin-right: 10px;
    }
    .filter-nav a{
        margin-left: 10px;
    }
    .filter-nav .sort-up .icon-arrow-short {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
    .icon-arrow-short {
        width: 11px;
        height: 11px;
        transition: all 0.3s ease-out;
    }
    .goods-container{
        display: flex;
    }
    .price-wrap{
        padding: 0 20px;
        margin-right: 50px;
        width: 230px;
    }
    .price-filter dt{
        height: 40px;
        line-height: 40px;
        margin-bottom: 30px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    .price-filter dd{
        height: 26px;
        line-height: 26px;
        margin-bottom: 20px;
    }
    .price-filter dd a{
        transition: all .3s ease-out;
    }
    .cur{
        border-left: 2px solid #ee7a2c;
        color: #ee7a2c;
        transition: all .3s ease-out;
        padding-left: 15px;
    }
    .list-wrap{
        flex: 1;
    }
    .list-wrap ul::after{
        clear: both;
        content: '';
        height: 0;
        display: block;
        visibility: hidden;
    }
    .list-wrap .item{
        width: 23.80952%;
        float: left;
        margin-right: 1.5%;
        margin-bottom: 1.5%;
        border: 2px solid #e9e9e9;
        background-color: white;
        transition: all .5s ease-out;
    }
    .list-wrap .item:hover{
        transform: translateY(-10px);
        transition: all .5s ease-out;
        box-shadow: 0 0 3px #e9e9e9;
        border-color: #ee7a2c;
    }
    .list-wrap .item:nth-child(4n){
        margin-right: 0;
    }
    .list-wrap .info{
        margin-top: 20px;
        margin-bottom: 10px;
        padding: 0 10px;
    }
    .item img{
        width: 100%;
    }
    .info .info-name{
        height: 4em;
        font-weight: bold;
        font-size: 18px;
        color: #d1434a;
    }
    .btn{
        display: inline-block;
        width: 100%;
        padding: 0 10px;
        text-align: center;
        color: #d1434a;
        height: 40px;
        line-height: 40px;
        border: 1px solid #d1434a;
        margin-top: 10px;
    }
    .load-more{
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .sort-up {
        transform: rotate(180deg);
        transition: all 0.3s ease-out;
    }
</style>
<script>
 /* eslint-disable */
    import "../assets/css/base.css"
    import "../assets/css/product.css"
    import "../assets/css/login.css"
    import "../assets/css/checkout.css"

    import axios from 'axios'

    import NavHeader from "@/components/NavHeader"
    import NavFooter from "@/components/NavFooter"
    import NavBread from "@/components/NavBread"
    import Modal from "@/components/Modal_common"
    export default{
        data(){
            return {
                goodslist: [],
                loading: false,
                priceFilter: [
                    {
                        startPrice: '0.00',
                        endPrice: '100.00'
                    },
                    {
                        startPrice: '100.00',
                        endPrice: '500.00'
                    },
                    {
                        startPrice: '500.00',
                        endPrice: '1000.00'
                    },
                    {
                        startPrice: '1000.00',
                        endPrice: '5000.00'
                    }
                ],
                priceRangeChecked: 'all',
                filterShow: false,
                overlayShow: false,
                page: 1,
                pageSize: 8,
                sortFlag: true,
                busy: true,
                mdShow: false,
                mdShowCart: false
            }
        },
        components:{
            NavHeader: NavHeader,
            NavFooter: NavFooter,
            NavBread,
            Modal
        },
        mounted: function (){
            this.getGoodsList();
        },
        methods: {
            getGoodsList(flag){
                let _this = this;
                let query = {
                    page_query: this.page,
                    pageSize_query: this.pageSize,
                    sort_query: this.sortFlag?1:-1,
                    priceLevel: this.priceRangeChecked
                };
                this.loading = true;
                axios.get('/goods/list',{params: query}).then((response)=>{
                    _this.loading = false;
                    let res = response.data;
                    if(res.status == "2"){
                        if(flag){
                            this.goodslist = this.goodslist.concat(res.results.list);   //针对分页插件的累加
                            if(res.results.count == 0){
                                this.busy = true;
                            }
                            else{
                                this.busy = false;
                            }
                        }
                        else{
                            this.goodslist = res.results.list;
                            this.busy = false;
                        }
                    }
                    else{
                        this.goodslist = [];
                    }
                });
            },
            sortGoods(){
                this.sortFlag = !this.sortFlag;
                this.page = 1;  //这里要重置页面，因为排序后需要从第一页显示
                this.getGoodsList();
            },
            //vue-infinite-scroll 插件，滚动鼠标加载分页
            loadMore: function() {
                this.busy = true;   //先禁用这个插件方法，防止发送大量请求
         
                setTimeout(() => {
                    this.page++;
                    this.getGoodsList(true);
                }, 1000);
            },
            showFilterPop(){
                this.filterShow = true;
                this.overlayShow = true;
            },
            setPriceFilter(index){
                this.priceRangeChecked=index;
                this.page = 1;
                this.getGoodsList();
                this.closePop();
            },
            closePop(){
                this.filterShow = false;
                this.overlayShow = false;
            },
            addtoCart(item){
                axios.post('/goods/addCart', {
                    productId_query: item
                }).then((res)=>{
                    if(res.data.status=='10001'){
                        this.mdShow = true;
                    }
                    else{
                        this.mdShowCart = true;
                    }
                });
            },
            closeModal(){
                this.mdShow = false;
            }
        }
    }
</script>
