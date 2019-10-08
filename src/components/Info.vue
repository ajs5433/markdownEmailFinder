<template>
<div id="info-section">
    <div id="empty-space">
        <span id="empty-space-text">Additional Information:</span>
    </div>
    <div id="ticket-info">
            <div v-for="(ticketProperty,index ) in propertyToShow" :key="'1-'+index" class="heading" :style="'grid-row:' + (index+1) + ' / span 1; gird-col: 1 / span 1'"> {{ticketProperty.label}}</div>
            <!-- <div v-for="(ticketProperty,index ) in propertyToShow" :key="'2-'+index" :style="'grid-row:'+ (index+1) +'/ span 1; gird-col: 2 / span 1'">  {{ticketProperty.value}} </div> -->
            
            <div v-for="(ticketProperty,index ) in propertyToShow" :key="'2-'+index" :style="'grid-row:'+ (index+1) +'/ span 1; gird-col: 2 / span 1'"> 
                <el-tooltip v-if="ticketProperty.value.length > 30" class="item" effect="light" :content="ticketProperty.value" placement="top" size="small">
                    <div> {{ticketProperty.value.slice(0,24)+'...'}} </div>
                </el-tooltip>
                <div v-else>{{ticketProperty.value}} </div>
            </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            ticketInfo : this.$store.state.ticketInfo
        }
    },
    computed:{
        ticket(){
            return this.$store.state.activeTicket
        },
        propertyToShow(){
            // each array element represent a column in the grid:
            var list = []
            // only properties to be shown in the info section
            var infoProperties = [this.ticketInfo.comm_id, this.ticketInfo.incident_id ,this.ticketInfo.sn_ticket,'empty_row',this.ticketInfo.sn_service,this.ticketInfo.sn_service_location,'empty_row',this.ticketInfo.stormcrow_services,'empty_row',this.ticketInfo.notification_date,this.ticketInfo.notification_time]
            

            for (var property of infoProperties){

                if(!property){
                    list.push({label:'', value: ''})
                    continue
                }

                if(!this.ticket || !this.ticket[property.name]){
                    list.push({label:property.label, value: ''})
                    continue;
                }
                
                if(property === this.ticketInfo.stormcrow_services){
                    var splitChar = ' | '
                    // var splitChar = ' ,'
                    var rows = 3

                    var services = this.ticket[property.name]?this.ticket[property.name].split(splitChar+','): [' - ','','','','']
                    services[services.length-1] = services[services.length-1].slice(0,services[services.length-1].length - splitChar.length)

                    // Keeping the stormcrow_services to a constant number or rows, wether it has n services or not
                    if(services.length!=rows)
                        services= services.length>rows? services.slice(0,rows-1).concat('MORE SERVICES...') : services.concat(Array(rows-services.length).join('.').split('.'))
                    
                    // Only the first service will have label
                    list.push({label: property.label, value: services[0]})
                    for (var i=1; i<services.length;i++){
                        list.push({label: '', value: services[i]})
                        }

                    continue;
                }

                list.push({label:property.label, value: this.ticket[property.name]})

            }
            return list;
        }
    }
}
</script>

<style scoped>

#info-section{
    background: rgb(250,250,250)
}

#ticket-info{
    font-size: 12px;

    font-family: 'Libre Franklin', sans-serif;
    font-size: 11px;

    padding: 20px 16px;
    /* border: 1px solid gray; */
    background-color: rgb(250,250,250);
    background-color: transparent;
    /* background-color: lightskyblue; */

    display: grid;

    grid-template-rows: repeat(15, 20px);
    grid-template-columns: 150px 150px;
    grid-template-columns: 118px 180px;
    justify-items: start;
}

#ticket-info>*{
    overflow: hidden;
    text-align: left;
    line-height: 100%;
    height: 100%;
    width: 100%;
    align-self: center;
}

.heading{
    font-weight: 700;
}

#empty-space{
    /* margin-top: 10px; */
    height: 55px;
    background:white;
    border-bottom: 1px solid lightgray;
}

#empty-space-text{
    font-family: 'Libre Franklin', sans-serif;
    font-size: 14px;
    /* padding-top: 10px; */
    line-height: 55px;
}

@media (max-width:1100px){
    #info-section{
        display:none;
    }
}

</style>