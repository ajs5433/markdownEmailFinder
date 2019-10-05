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
}

#notif-area>*{
    margin: 5px;
    border-radius: 5px;
    border: 1px solid gray;

    height: 600px;
}
</style>