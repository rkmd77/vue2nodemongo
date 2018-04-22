<template>
    <div>
        <div class="md-modal modal-msg md-modal-transition" :class="{'md-show': mdShow}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <div class="md-title"></div>
                    <button class="md-close" @click="closeChileModal">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <slot name="message"></slot>
                    </div>
                    <div class="btn-wrap">
                        <slot name="btnGroup"></slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-if="mdShow" @click="closeChileModal"></div>
    </div>
</template>
<script>
    export default{
        props:["mdShow"],
        data(){
            return {

            }
        },
        methods:{
            closeChileModal(){
                this.$emit("close");    //当前子组件调用父组件里自定义的“close”属性，这里直接指向GoodsList里的closeModal()方法
            }
        }
    }
</script>