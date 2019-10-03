<template>
    <div id="template">
        <!-- <textarea type="textarea" id="text" v-model="test" rows="20" cols="30">     </textarea> -->
        <el-input id="title" type="text" v-model="title" :rows="1" :cols="10">   </el-input>
        <el-input resize="none" type="textarea" v-model="notificationText" :rows="20" :cols="50">     </el-input>
        <VueShowdown style="text-align:left" :markdown="notificationText"/>
    </div>
</template>

<script>
export default {
    data(){
        return{
            notif: '',
        }
    },
    computed:{
        notificationText:{
            get(){
                return this.notif || this.$store.getters.notificationText
            },
            set(modification){
                // this.notif = modification
                // this.notificationText = modification;
                this.$store.commit('modifyNotificationText',modification)
            }
        },
        title(){
            return this.$store.state.activeTicket?this.$store.state.activeTicket.email_subject:''
        },
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

#title{
    font-weight: 900;
    font-size: 13px;
}
</style>