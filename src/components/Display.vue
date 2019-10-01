<template>
    <div id="template">
        <!-- <textarea type="textarea" id="text" v-model="test" rows="20" cols="30">     </textarea> -->
        <el-input type="textarea" v-model="notificationText" :rows="20" :cols="50">     </el-input>
    </div>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    computed:{
        notificationText:{
            get(){
                return this.$store.getters.notificationText
            },
            set(modification){
                // this.notificationText = modification;
                this.$store.commit('modifyNotificationText',modification)
            }
        }
    }
}
</script>

<style scoped>
#template{
    border: 1px solid green;
    width: 450px;
}
</style>