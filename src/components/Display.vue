<template>
    <div id="template">
        <el-input class="edit title" v-show="edit" :spellcheck="true" id="title-edit" type="text" v-model="notificationTitle" :rows="1" :cols="10">   </el-input>
        <el-input class="display title" v-show="!edit" :spellcheck="true" id="title-display" type="text" v-model="notificationTitle" :rows="1" :cols="10" :readonly="true">   </el-input>
        
        <el-input class="edit body" v-show="edit" :spellcheck="true" resize="none" type="textarea" v-model="notificationText" :rows="23" :cols="50">     </el-input>
        <VueShowdown id="body-display" class="display body" v-show="!edit" style="text-align:left" :markdown="notificationText"/>
        <el-button @click="edit = !edit"> Edit </el-button>

    </div>
</template>

<script>
export default {
    data(){
        return{
            notif: '',
            edit : false
        }
    },
    computed:{
        notificationText:{
            get(){
                return this.$store.getters.notificationText
            },
            set(modification){
                this.$store.commit('setNotificationText',modification)
            }
        },
        notificationTitle:{
            get(){
                return this.$store.getters.notificationTitle
            },
            set(modification){
                this.$store.commit('setNotificationTitle',modification)
            }
        },
        // title(){
        //     return this.$store.state.activeTicket?this.$store.state.activeTicket.email_subject:''
        // },
        markdown(){
            // return marked(this.notificationText, { sanitize: true })
        }
    }
}
</script>

<style scoped>

#template{
    border: 1px solid green;
    width: 450px;
}

#body-display{
    padding: 4px 10px;
}

.body{
    height: 500px;
    font-size: 14px;
}

.title{
    font-size: 13px;
    font-weight:800;
}

</style>