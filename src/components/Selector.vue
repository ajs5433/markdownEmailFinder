<template>
    <div>
        <div class="notification-section">
            <div id="options">

                <div id="filter">

                    <!-- Prev Next -->
                    <div class="flex-row" id="results">
                        <el-button @click="console.log('hi')" > {{ keywordMatchTicketsCount}} </el-button>
                        <el-button @click="changeIndex" name="prev" icon="el-icon-arrow-left"></el-button>
                        <el-button @click="changeIndex" name="next" icon="el-icon-arrow-right"></el-button>
                    </div>

                    <!-- Additional Filters: Input fields -->
                    <div v-for="input in filteringOptions.inputFields" :key="input.key" class="grid-row">
                        <span> {{input.label}} </span>
                        <!-- <el-input v-model="vmodels.inputFields[input.key]"></el-input> -->
                        <el-autocomplete
                            label="coco"
                            class="inline-input"
                            v-model="vmodels.inputFields[input.key]"
                            :fetch-suggestions="input.query"
                            placeholder="Please Input"
                            :highlight-first-item="true"
                        clearable></el-autocomplete>
                    </div>
                    

                </div>

                <!-- Area of Buttons -->
                <div class="flex-row" v-for="selectButton of filteringOptions.buttons" :id="selectButton.key" :key="selectButton.key">
                    <el-button :name="selectButton.key" :data-string="option.name" @click="filterButtonClicked" size="small" :class="{'row-btn':true, 'active-btn':filters.buttons[selectButton.key]==option.name}" v-for="option of selectButton.options" :key="option.name"> {{ option.name }}</el-button>
                </div>
                
                <!-- Select time -->
                <div class="grid-row" v-for="dateInput of filteringOptions.dateSelections" :key="dateInput.key"> 
                    <div>
                        <el-checkbox v-model="vmodels.checkbox[dateInput.key]"></el-checkbox>
                        <span> {{ dateInput.label }}</span>
                    </div>
                    <div>
                        <el-date-picker
                            v-model="vmodels.dateSelections[dateInput.key]"
                            type="datetime"
                            placeholder="Select date and time">
                        </el-date-picker>
                        <el-button icon="el-icon-time"></el-button>
                    </div>
                </div>

                <!-- Ticket -->
                <div class="grid-row">
                    <div>
                        <span>Ticket No.</span>
                    </div>
                    <div>
                        <el-input placeholder="INC0000000"> </el-input>
                    </div>
                </div>
                
                <el-button @click="notificationMessage()" type='success'>Create new notification</el-button>

            </div>
        </div>
            
    </div>    
</template>

<script>
export default {
    data(){
        return{
            index : 0,
            vmodels:{
                inputFields:{
                    sn_service: '',
                    sn_service_location: ''
                },
                dateSelections:{
                    start_time: '' ,
                    end_time: ''
                },
                checkbox:{
                    start_time: false ,
                    end_time: false
                },
            },
            filters:{
                buttons:{
                    organization : '',
                    plan_status : '',
                    status: ''
                }
            }, 
            ticketInfo: this.$store.state.ticketInfo,
            state1 : ''
        }
    },
    computed:{
        totalTickets(){
            // return this.$store.state.tickets.length
        },
        activeTickets(){
            var tickets = this.$store.state.tickets
            var regex   = new RegExp(this.keyword,'i') 
            return tickets.filter(t=>{
                if (regex.test(t.email_subject)|regex.test(t.email_content))
                    return true
                if (regex.test(t.sn_short_description)|regex.test(t.sn_description))
                    return true
                return false
            })
        },

        // working on this
        filteredTickets(){
            var regex1 = new RegExp(this.vmodels.sn_service)
            var regex2 = new RegExp(this.vmodels.sn_service_location)
            return this.activeTickets.filter(t=>{
                if(!regex1.test(t.sn_service) | !regex1.test(t.sn_service_location))
                    return false
                
                for (var filter of Object.entries(this.filters.buttons)){
                    console.log(filter)
                }
            })  
        },
        filteredTicketsLength(){
            return this.filteredTickets.length;
        },
        keywordMatchTicketsCount(){
            return this.$store.state.tickets.length
        },
        filteringOptions(){
            return{
                inputFields:{
                    sn_service:{
                        key     : this.ticketInfo.sn_service.name,
                        label   : this.ticketInfo.sn_service.label,
                        query   : this.queryService
                    },
                    sn_service_location:{
                        key     :  this.ticketInfo.sn_service_location.name,
                        label   :  this.ticketInfo.sn_service_location.label,
                        query   : this.queryServiceLocation
                    }
                },
                buttons:{
                    organization:{
                        key     : this.ticketInfo.organization.name, 
                        options : this.ticketInfo.organization.options
                    },
                    plan_status:{
                        key     : this.ticketInfo.plan_status.name, 
                        options : this.ticketInfo.plan_status.options
                    },
                    status:{
                        key     : this.ticketInfo.status.name, 
                        options : this.ticketInfo.status.options
                    }
                },
                dateSelections:{
                    startTime:{
                        key     : 'start_time',
                        label   : 'Start Time',
                    },
                    endTime:{
                        key     : 'end_time',
                        label   : 'End Time',
                    }
                }
            }
        },
        services(){ 
            return this.ticketInfo.sn_service.options.map(opt=>opt.name)
        },
        serviceLocations(){ 
            return this.ticketInfo.sn_service_location.options.map(opt=>opt.name)
        },
    },
    methods:{
    // handleSelect(item) {
    //     console.log(item);
    //   },
    queryService(queryString, callback){
            var results = queryString ? this.services.filter(service=>{
                var regex = new RegExp(queryString, 'i');
                return regex.test(service)
            }) : this.services;

            var formattedResults = results.map((s) => {
                return {value:s}
            })
            callback(formattedResults)
      },
      
      queryServiceLocation(queryString, callback){
        var results = queryString ? this.serviceLocations.filter(servLocation=>{
            var regex = new RegExp(queryString, 'i');
            return regex.test(servLocation)
        }) : this.serviceLocations;

        var formattedResults = results.map((s) => {
            return {value:s}
        })
        callback(formattedResults)
      },
        handleSelect(item) {
        console.log(item);
      },
      notificationMessage(){
          this.$message({
        //   title: 'Error',
          message: 'This is an info message',
          type: 'error'
        });
      },
      filterButtonClicked(event){
        var element = event.target
        if(!element.name)
            element = element.parentElement

        var property = element.name
        var value    = element.dataset.string

        // console.log(this.filters)
        this.filters.buttons[property] = value

        // console.log()
      },
      changeIndex(event){
        if(event.target.name === 'prev')
            this.index = (this.index==0)? this.filteredTicketsLength-1 : this.index - 1;
        else if(event.target.name==='next')
            this.index = (this.index==this.filteredTicketsLength-1)? 0 : this.index + 1;
        console.log(this.index)
      }

    }
}
</script>

<style scoped>



.notification-section{
    display:flex;
    justify-content: center;
    align-items: stretch;
    /* flex-wrap:wrap; */
}

.flex-row{
    display:flex;
}

.grid-row{
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 30% 70%;
}

.row-btn{
    flex: 1 1 auto;
    /* max-width: 50px; */
    overflow: hidden;
}

.notification-section>*{
    min-width: 200px;
    min-height: 200px;
}

#ticket-info{
    border: 1px solid red;
}

#template{
    border: 1px solid green;
}

#options{
    flex: 0 0 420px;
    border: 1px solid blue;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
}

.active-btn{
    color: red !important;
}
</style>