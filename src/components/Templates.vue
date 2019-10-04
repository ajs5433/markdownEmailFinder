<template>
    <div id="main">
        <div class="template" v-for="incident in incidents" :key="'inc-'+incident.title">
            <div class="title incident">{{incident.title}}</div>
            <div class="body" > 
                <pre>
                {{incident.body}}
                </pre>
            </div>
        </div>

        <div class="template" v-for="maintenance in maintenances" :key="'maint-'+maintenance.title">
            <div class="title maintenance">{{maintenance.title}}</div>
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
                    if(!regex.test(inc.body) && !regex.test(inc.title)){
                        passed = false;
                        break
                    }
                }
                return passed;
            })

            return incidents
        },

        maintenances(){
            var regex = new RegExp(this.keyword,'i')
            var maintenances = this.$store.state.templates.maintenances.filter(maint =>{
                return regex.test(maint.title) || regex.test(maint.body)
            })
            return maintenances
        }
    },
    methods:{}
}
</script>

<style scoped>
#main{
    display: flex;
    align-items: center;
    flex-direction: column;
 
}

.template{
    border: 1px gray solid;
    border-radius: 5px;
    margin: 7px;
    max-width: 800px;
}

.incident{
    color: red;
}

.maintenance{
    color: green;
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

</style>