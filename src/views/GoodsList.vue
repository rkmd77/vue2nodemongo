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
                <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
              </div>
              <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter" :class="{'filterby-show':filterShow}">
                  <dl class="filter-price">
                    <dt>Price:</dt>
                    <dd><a href="javascript:void(0)" @click="priceRangeChecked='all'" v-bind:class="{'cur':priceRangeChecked=='all'}">All</a></dd>
                    <dd v-for="(pricerange,index) in priceFilter">
                      <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceRangeChecked==index}">{{pricerange.startPrice}} - {{pricerange.endPrice}}</a>
                    </dd>
                    <!-- <dd>
                      <a href="javascript:void(0)">100 - 500</a>
                    </dd>
                    <dd>
                      <a href="javascript:void(0)">500 - 1000</a>
                    </dd>
                    <dd>
                      <a href="javascript:void(0)">1000 - 2000</a>
                    </dd> -->
                  </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                  <div class="accessory-list col-4">
                    <ul>
                      <li v-for="(item,index) in goodslist">
                        <div class="pic">
                          <a href="#"><img v-lazy="'static/'+item.prodcutImg" alt=""></a>
                        </div>
                        <div class="main">
                          <div class="name">{{item.productName}}</div>
                          <div class="price">{{item.prodcutPrice}}</div>
                          <div class="btn-area">
                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                          </div>
                        </div>
                      </li>
                      <!-- <li>
                        <div class="pic">
                          <a href="#"><img src="static/2.jpg" alt=""></a>
                        </div>
                        <div class="main">
                          <div class="name">XX</div>
                          <div class="price">1000</div>
                          <div class="btn-area">
                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="pic">
                          <a href="#"><img src="static/3.jpg" alt=""></a>
                        </div>
                        <div class="main">
                          <div class="name">XX</div>
                          <div class="price">500</div>
                          <div class="btn-area">
                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="pic">
                          <a href="#"><img src="static/4.jpg" alt=""></a>
                        </div>
                        <div class="main">
                          <div class="name">XX</div>
                          <div class="price">2499</div>
                          <div class="btn-area">
                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                          </div>
                        </div>
                      </li> -->
                    </ul>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="md-overlay" v-show="overlayShow" @click="closePop"></div>
        <nav-footer></nav-footer>
    </div>
</template>
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
    export default{
        data(){
            return {
                goodslist: [],
                priceFilter: [
                    {
                        startPrice: '0.00',
                        endPrice: '500.00'
                    },
                    {
                        startPrice: '500.00',
                        endPrice: '1000.00'
                    },
                    {
                        startPrice: '1000.00',
                        endPrice: '3000.00'
                    }
                ],
                priceRangeChecked: 'all',
                filterShow: false,
                overlayShow: false
            }
        },
        components:{
            NavHeader: NavHeader,
            NavFooter: NavFooter,
            NavBread  
        },
        mounted: function (){
            this.getGoodsList();
        },
        methods: {
            getGoodsList(){
                axios.get('/apiurl').then((results)=>{
                    this.goodslist = results.data.result;
                });
            },
            showFilterPop(){
                this.filterShow = true;
                this.overlayShow = true;
            },
            setPriceFilter(index){
                this.priceRangeChecked=index;
                this.closePop();
            },
            closePop(){
                this.filterShow = false;
                this.overlayShow = false;
            }
        }
    }
</script>
