<template>
    <div>
        <div class="notification-section">
            <div id="options">

                <el-button @click="startOver()" type='warning'>Start Over</el-button>
                
                <div id="filter">

                    <!-- Prev Next -->
                    <div class="flex-row" id="results">
                        <el-button @click="printTickets" > {{filteredTicketsLength>0? this.index +1:0}} of {{ filteredTicketsLength }} </el-button>
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
                        <el-checkbox @change="dateInput.method" v-model="vmodels.checkbox[dateInput.key]"></el-checkbox>
                        <span> {{ dateInput.label }}</span>
                    </div>
                    <div>
                        <el-date-picker
                            :id="'dateinput-' + dateInput.key"
                            @change="dateInput.method"
                            v-model="vmodels.dateSelections[dateInput.key]"
                            type="datetime"
                            :picker-options="{
                                step: '00:10'
                            }"
                            :disabled="filters.buttons.market===''"
                            format="yyyy-MM-dd HH:mm:SS"
                            :value-format="datetimeFormat[filters.buttons.market]"
                            placeholder="Select date and time">
                        </el-date-picker>
                        <el-button :name="dateInput.key" @click="timeNow" icon="el-icon-time"></el-button>
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
                
                <el-button @click="notificationMessage()" type='success'>Proceed to Stormcrow</el-button>

            </div>
        </div>
            
    </div>    
</template>

<script>
export default {
    data(){
        return{
            index:0,
            // activeTicket: [], 
            lastCommId: 0,
            startTimeStr: '**Start Date Time:** ',
            endTimeStr: '**End Date Time:** ',
            delete:'',
            datetimeFormat:{
                US: "MM-dd-yyyy hh:mm A",
                UK: 'dd-MM-yyyy hh:mm A'
            },
            timezone:{
                US: "ET",
                UK: 'BST'
            },
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
                    status: '',
                    market: ''
                }
            }, 
            ticketInfo: this.$store.state.ticketInfo
        }
    },
    computed:{
        // index : {
        //         set(number){
        //             this.$store.commit('setIndex', number)
        //         },
        //         get(){
        //             return this.$store.state.index;
        //         }
        //     } ,
        // totalTickets(){
        //     return this.$store.state.tickets.length
        // },
        activeTicket:{
            set(ticket){
                this.$store.commit('setActiveTicket', ticket)
            },
            get(){
                return this.$store.getters.activeTicket
            }
        },
        activeTickets(){
            return this.$store.getters.activeTickets
        },
        filteredTickets(){
            var regex1 = new RegExp(this.vmodels.inputFields.sn_service);
            var regex2 = new RegExp(this.vmodels.inputFields.sn_service_location);
            var index = 0;
            var lastCommId = this.lastCommId;
            this.updateIndex()
            var filteredT = this.activeTickets.filter(t=>{
                if(!regex1.test(t.sn_service) || !regex2.test(t.sn_service_location))
                    return false
                
                for (var filter of Object.entries(this.filters.buttons)){
                    var [prop, val] = filter
                    if(val && t[prop] != val)
                        return false
                }
                return true;
            })  

            // keeping the index in the last selected comm/ticket
            if(filteredT.length){
                filteredT.forEach((t, i)=>{
                    // console.log(, t.comm_id)
                    if(t.comm_id==lastCommId)
                        index = i;
                })
    
                this.updateIndex(index, filteredT[index], filteredT[index].comm_id)
            }
            
            // this.index = index
            // this.$store.commit('setIndex',index)
            // this.$store.commit('setCommId', this.activeTickets[index].comm_id)

            return filteredT;
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
                        key     : this.ticketInfo.sn_service_location.name,
                        label   : this.ticketInfo.sn_service_location.label,
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
                    },
                    market:{
                        key     : this.ticketInfo.market.name, 
                        options : this.ticketInfo.market.options
                    }
                },
                dateSelections:{
                    startTime:{
                        key     : 'start_time',
                        label   : 'Start Time',
                        method  : this.modifyStartTime
                    },
                    endTime:{
                        key     : 'end_time',
                        label   : 'End Time',
                        method  : this.modifyEndTime
                    }
                }
            }
        },
        services(){ 
            return this.ticketInfo.sn_service.options.map(opt=>opt.name)
        },
        serviceLocations(){ 
            return this.ticketInfo.sn_service_location.options.map(opt=>opt.name)
        }
    },
    methods:{
    // handleSelect(item) {
    //     console.log(item);
    //   },+
    modifyStartTime(event){
        var startT = ''
        if(this.vmodels.dateSelections.start_time && this.vmodels.checkbox.start_time)
            startT = `${this.startTimeStr} ${this.vmodels.dateSelections.start_time} ${this.timezone[this.filters.buttons.market]}`
        this.$store.commit('changeStartTime', startT)  
        // console.log(startT)
    },
    modifyEndTime(event){
        var endT = ''
        if(this.vmodels.dateSelections.end_time && this.vmodels.checkbox.end_time)
            endT = `${this.endTimeStr} ${this.vmodels.dateSelections.end_time} ${this.timezone[this.filters.buttons.market]}`

        this.$store.commit('changeEndTime', endT)  
        // console.log(endT)
    },
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
        // console.log(item);
      },
      notificationMessage(){
          this.$message({
        //   title: 'Error',
          message: 'This is an info message adpiha dphpiuhfpis hfpiahs fipahs oigf[hadsfp[ hsfhpa f[ahs f]asj oi[hsgoi[hagfhas]oihgfas[odhf a[oshf [aosdha[os dhf]as g[a oiug[has haoiu[gh aoi[jgfaois[ jfo[ais jf',
          type: 'error'
        });
      },
      startOver(){
            console.log(this.$store.state.templates)
            
            this.index = 0;
            this.lastCommId = 0;
            this.timezone = 0;

            // vmodels contain all data where the user can manually edit info
            for (var types in this.vmodels){
                for (var property in types){
                    if (typeof this.vmodels[types][property]=='boolean')
                        this.vmodels[types][property] = false
                    else
                        this.vmodels[types][property] = ''
                }
            }

            // filters are selection of fields, filterType is only a set of buttons that work as radiobuttons
            for (var selectionType in this.filters){
                for (var property in selectionType){
                    this.filters[selectionType][property] = ''
                }
            }

            this.$store.commit('setKeyword', '')
            // this.$recompute('filteredTickets')

            // this.$store.commit('setActiveTicket', ticket)
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

      // check this, numbers repeat sometimes
      changeIndex(event){
        //   console.log(this.index)
        if (this.filteredTicketsLength==0)
            return
        if(event.target.name === 'prev')
            this.index = (this.index==0)? this.filteredTicketsLength-1 : this.index - 1;
        else if(event.target.name==='next')
            this.index = (this.index==this.filteredTicketsLength-1)? 0 : this.index + 1;
        // console.log(this.index)
        
        if(this.filteredTicketsLength)
            this.updateIndex(this.index, this.filteredTickets[this.index], this.filteredTickets[this.index].comm_id)
      },
      printTickets(){
          console.log(this.activeTickets)
      },
      updateIndex(index, active, commId){
          this.index = index;
          this.activeTicket = active;
          this.lastCommId = commId;
      },

      // https://element.eleme.io/#/en-US/component/date-picker#date-formats
      timeNow(event){
        var element = event.target
        if(!element.name)
        element = element.parentElement

        // document.getElementById('dateinput-'+element).value = Date()
          console.log(element.name)
        //   console.dir(document.getElementById('dateinput-start_time'))
        //   vmodels.dateSelections[dateInput.key] = '10-10-2019 12:00 AM'
      }

    }
}
</script>

<style scoped>

/* *{box-sizing:border-box} */

#notification-section{
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

/* remove comment */
#options{
    flex: 0 0 420px;
    /* border: 1px solid blue; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
}

.active-btn{
    color: red !important;
}
</style>