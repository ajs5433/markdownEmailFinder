<template>
    <div class="notifications">


        <div id="notif-area">
            <Info/>
            <Display/>
            <Selector/>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Selector from '@/components/Selector.vue'
import Display from '@/components/Display.vue'
import Info from '@/components/Info.vue'

export default Vue.extend({
    name:"notifications",
    components: {
        Selector, Info, Display
    },
    data(){ return{

        }
    },
})
</script>

<style scoped>
#search-bar{
    display:flex;
}

#notif-area{
    display:flex;
    justify-content: center;
    /* padding-top: 20px; */
}

#notif-area>*{
    margin: 5px;
    border-radius: 5px;
    border: 1px solid #1DA1F2;
    border: 1px solid rgb(64,158,255);
    border: 1px solid #70163C ;
    border: 1px solid orange ;
    height: 600px;
}
</style>