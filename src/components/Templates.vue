<template>
    <div id="main-template">
        <div class="template" v-for="incident in incidents" :key="'inc-'+incident.title">
            <div class="title incident">{{incident.title}}</div>
            <div class="body" > 
                <pre>
                {{incident.body}}
                </pre>
            </div>
        </div>

        <div class="template" v-for="maintenance in maintenances" :key="'maint-'+maintenance.title">
            <div :class="'title '+ maintenance.type">{{maintenance.title}}</div>
            <div class="body">
                <pre>
                    {{maintenance.body}}
                </pre>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    data(){
        return{
        }
    },
    computed:{
        keyword(){
            return this.$store.state.keyword
        },
        incidents(){
            var keywordList = this.keyword.split(' ')

            var incidents = this.$store.state.templates.incidents.filter(inc =>{
                var passed = true;
                for (var keyword of keywordList){
                    if (!keyword)
                        continue
                    
                    var regex = new RegExp(keyword, 'i')    
                    if(!regex.test(inc.title)){
                    // if(!regex.test(inc.body) && !regex.test(inc.title)){
                        passed = false;
                        break
                    }
                }
                return passed;
            })

            return incidents
        },

        maintenances(){
            var keywordList = this.keyword.split(' ')

            var maintenances = this.$store.state.templates.maintenances.filter(maint =>{
                var passed = true;
                for (var keyword of keywordList){
                    if (!keyword)
                        continue
                    
                    var regex = new RegExp(keyword, 'i')    
                    if(!regex.test(maint.title)){
                    // if(!regex.test(maint.body) && !regex.test(maint.title)){
                        passed = false;
                        break
                    }
                }
                return passed;
            })

            return maintenances
        },

        // maintenances(){
        //     var regex = new RegExp(this.keyword,'i')
        //     var maintenances = this.$store.state.templates.maintenances.filter(maint =>{
        //         return regex.test(maint.title) || regex.test(maint.body)
        //     })
        //     return maintenances
        // }
    },
    methods:{}
}
</script>

<style scoped>
#main-template{
    display: flex;
    align-items: center;
    flex-direction: column;
 
}

.template{
    border: 1px solid lightgray;
    border-radius: 5px;
    margin: 7px;
    width: 50%;
    text-align: center;
    /* min-width: 500px; */
    /* width: 800px; */
    /* min-width: 50% */
}

.template:hover{
    border: 1px solid gray
}

.incident{
    color: red;
}

.planned{
    color: green;
}

.emergency{
    color: orange;
}

.body{
    text-align: left;
    padding-left: 10px;
}

pre{
    white-space: pre-wrap;       /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */    
}

@media (max-width:1100px){
    .template{
        width: 80%;
    }
}

@media (max-width:700px){
    .template{
        font-size:12px;
    }
}

@media (max-width:500px){
    .template{
      width: 90%;
    }
}

</style>