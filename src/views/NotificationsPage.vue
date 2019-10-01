<template>
    <div class="notifications">
        <div id="search-bar" >
        <!-- <el-row id="search-bar"> -->
            <el-input v-model="keyword" placeholder="Keyword"></el-input>
            <el-button icon="el-icon-refresh-left" size="small"> </el-button>
            <!-- <el-badge :value="filteredTicketsLength" class="item"> -->
            <!-- <el-button size="small">results</el-button> -->
            <!-- </el-badge> -->
        <!-- </el-row> -->
        </div>

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
    computed:{
        keyword:{
            get(){
                return this.$store.state.keyword;
            },
            set(keyword){
                this.$store.commit('setKeyword',keyword)
            }
        }
    }
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
</style>