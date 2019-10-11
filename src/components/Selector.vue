<template>
  <div>
    <div class="notification-section">
      <div id="options">
        <div class="button-area">
          <!-- <el-button id="start-btn" class="main-btn" @click="startOver()" type='warning'>Start Over <i class="el-icon-refresh-right main-btn-icon"></i> </el-button> -->
          <el-button
            icon="el-icon-refresh-right"
            id="start-btn"
            class="main-btn"
            @click="startOver()"
            type="warning"
            >Start Over
          </el-button>
        </div>

        <!-- <el-button id="count" @click="printTickets" > {{filteredTicketsLength>0? this.index +1:0}} of {{ filteredTicketsLength }} </el-button> -->

        <!-- Caleb
                Following line does not work, having a computed filteredTicketslength calls the filteredTickets computed property when filter has not changeEndTime
                call chain: filteredTicketsLength >  filteredTickets > updateIndex > activeTicket > activeTicket calls a method modifyStartTime that modifies the expected behavior 

                fixed by forcing an extra verification lastCommId != ticket.comm_id
                -->
        <div id="count">
          <span
            >{{ filteredTicketsLength > 0 ? this.index + 1 : 0 }} of
            {{ filteredTicketsLength }}
          </span>
        </div>

        <div class="flex-row" id="results">
          <el-button
            class="nav-btn"
            @click="changeIndex"
            name="prev"
            icon="el-icon-arrow-left"
          ></el-button>
          <el-button
            class="nav-btn"
            @click="changeIndex"
            name="next"
            icon="el-icon-arrow-right"
          ></el-button>
        </div>

        <!-- Area of Buttons -->
        <div id="filter-div">
          <div
            class="flex-row"
            v-for="selectButton of filteringOptions.buttons"
            :id="selectButton.key"
            :key="selectButton.key"
          >
            <el-button
              class="filter-btn"
              :name="selectButton.key"
              :data-string="option.name"
              @click="filterButtonClicked"
              size="small"
              :class="{
                'row-btn': true,
                'active-btn': filters.buttons[selectButton.key] == option.name
              }"
              v-for="option of selectButton.options"
              :key="option.name"
            >
              {{ option.name }}</el-button
            >
          </div>
        </div>

        <!-- Additional Filters: Input fields -->
        <div
          v-for="input in filteringOptions.inputFields"
          :key="input.key"
          class="grid-row-container"
        >
          <span class="label"> {{ input.label }} </span>
          <!-- <el-input v-model="vmodels.inputFields[input.key]"></el-input> -->
          <el-autocomplete
            label="coco"
            class="inline-input"
            v-model="vmodels.inputFields[input.key]"
            :fetch-suggestions="input.query"
            placeholder="Optional field"
            :highlight-first-item="true"
            clearable
          ></el-autocomplete>
        </div>

        <!-- Select time -->
        <!-- <div class="grid-row-container" v-for="dateInput of filteringOptions.dateSelections" :key="dateInput.key"> 
                    <div>
                        <span class="label"> {{ dateInput.label }}</span>
                        <el-checkbox class="time-checkbox" @change="dateInput.method" v-model="vmodels.checkbox[dateInput.key]"></el-checkbox>
                    </div>
                    <div>
                        <el-date-picker
                            class="date-input"
                            :id="'dateinput-' + dateInput.key"
                            @change="dateInput.method"
                            v-model="vmodels.dateSelections[dateInput.key]"
                            type="datetime"
                            :picker-options="{
                                step: '00:10'
                            }"
                            :disabled="false && filters.buttons.market===''"
                            format="yyyy-MM-dd HH:mm:SS"
                            :value-format="datetimeFormat[filters.buttons.market]"
                            placeholder="Select date and time">
                        </el-date-picker>
                    </div>
                </div> -->

        <div
          class="grid-row-container"
          v-for="dateInput of filteringOptions.dateSelections"
          :key="dateInput.key"
        >
          <div>
            <el-tooltip
              class="item"
              effect="light"
              content="click to include"
              placement="left"
              size="small"
            >
              <el-button
                :name="dateInput.key"
                :class="{ 'active-date-btn': vmodels.checkbox[dateInput.key] }"
                @click="dateInput.method"
                class="label"
              >
                {{ dateInput.label }}</el-button
              >
            </el-tooltip>
          </div>
          <div>
            <!-- <el-tooltip v-if="filters.buttons.market===''" content="Select timezone" placement="right">
                            <el-date-picker :disabled="true">
                            </el-date-picker>
                        </el-tooltip> -->
            <el-date-picker
              class="date-input"
              :id="'dateinput-' + dateInput.key"
              @change="dateInput.method"
              v-model="vmodels.dateSelections[dateInput.key]"
              type="datetime"
              :picker-options="{
                step: '00:10'
              }"
              :disabled="false && filters.buttons.market === ''"
              format="yyyy-MM-dd hh:mm A"
              value-format="yyyy-MM-dd hh:mm A"
              placeholder="Select date and time"
            >
            </el-date-picker>
          </div>
        </div>

        <div class="grid-row-container">
          <span class="label"> Ticket No. </span>
          <el-input v-model="ticketNumber"></el-input>
        </div>

        <!-- </div> -->

        <div
          style="width: 100%; height: 20px;background-color: rgb(250,250,250)"
        ></div>

        <div class="button-area">
          <!-- <el-button id="submit-btn" class="main-btn" @click="notificationMessage()" type='success'>Proceed to Stormcrow <i class="el-icon-top-right"></i></el-button> -->
          <el-tooltip
            v-if="disableStormcrow"
            effect="light"
            content="BUTTON DISABLED. Click 'Start Over' to enable"
            placement="top"
            size="large"
          >
            <el-button
              icon="el-icon-top-right"
              id="submit-btn"
              class="main-btn disabled"
              type="info"
              >Proceed to Stormcrow
            </el-button>
          </el-tooltip>
          <el-button
            v-else
            icon="el-icon-top-right"
            id="submit-btn"
            class="main-btn"
            @click="notificationMessage()"
            type="success"
            >Proceed to Stormcrow
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { basicInfo } from "@/company/InternalData";

export default {
  data() {
    return {
      index: 0,
      // activeTicket: [],
      lastCommId: 0,
      emailLink: basicInfo.sendEmailURL,
      disableStormcrow: false,
      time: {
        startTimeStr: this.$store.state.startTimeStr, //'**Start Date Time:** '
        endTimeStr: this.$store.state.endTimeStr, //'**End Date Time:** '
        startTimeRegex: this.$store.state.startTimeRegex,
        endTimeRegex: this.$store.state.endTimeRegex
      },
      datetimeFormat: {
        US: "MM-dd-yyyy hh:mm A",
        UK: "dd-MM-yyyy hh:mm A"
      },
      timezone: {
        US: "ET",
        UK: "BST"
      },
      vmodels: {
        inputFields: {
          sn_service: "",
          sn_service_location: ""
        },
        dateSelections: {
          start_time: false,
          end_time: false
        },
        checkbox: {
          start_time: false,
          end_time: false
        },
        ticket: {
          number: ""
        }
      },
      filters: {
        buttons: {
          organization: "",
          plan_status: "",
          status: "",
          market: ""
        }
      },
      ticketInfo: this.$store.state.ticketInfo,
      emptyTicket: {
        comm_id: 0,
        incident_id: "",
        email_subject: "",
        email_content: "",
        stormcrow_services: "",
        sn_ticket: "",
        sn_service: "",
        sn_service_location: "",
        sn_short_description: "",
        sn_description: "",
        notification_date: "",
        notification_time: "",
        organization: "",
        market: "",
        status: "",
        template: ""
      }
    };
  },
  computed: {
    ticketNumber: {
      set(ticket) {
        this.$store.commit("setTicketNumber", ticket);
      },
      get() {
        return this.$store.state.ticketNumber;
      }
    },
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
    activeTicket: {
      set(ticket) {
        // console.log('active',ticket)
        if (ticket && ticket.comm_id != this.lastCommId) {
          this.vmodels.checkbox.start_time = this.time.startTimeRegex.test(
            ticket.email_content
          )
            ? true
            : false;
          this.vmodels.checkbox.end_time = this.time.endTimeRegex.test(
            ticket.email_content
          )
            ? true
            : false;
        }
        // console.log('NOW!!')
        this.modifyEndTime({});
        this.modifyStartTime({});
        this.$store.commit("setActiveTicket", ticket);
      },
      get() {
        return this.$store.state.activeTicket;
      }
    },
    activeTickets() {
      return this.$store.getters.activeTickets;
    },
    filteredTickets() {
      var regex1 = new RegExp(this.vmodels.inputFields.sn_service);
      var regex2 = new RegExp(this.vmodels.inputFields.sn_service_location);
      var index = 0;
      var lastCommId = this.lastCommId;
      // this.updateIndex()
      var filteredT = this.activeTickets.filter(t => {
        if (!regex1.test(t.sn_service) || !regex2.test(t.sn_service_location))
          return false;

        for (var filter of Object.entries(this.filters.buttons)) {
          var [prop, val] = filter;
          if (val && t[prop] != val) return false;
        }
        return true;
      });

      // keeping the index in the last selected comm/ticket
      if (filteredT.length) {
        filteredT.forEach((t, i) => {
          // console.log(, t.comm_id)
          if (t.comm_id == lastCommId) index = i;
        });

        this.updateIndex(index, filteredT[index], filteredT[index].comm_id);
      } else this.updateIndex(0, this.emptyTicket, 0);

      // this.index = index
      // this.$store.commit('setIndex',index)
      // this.$store.commit('setCommId', this.activeTickets[index].comm_id)
      // this.filteredTickesSize  = filteredT.length
      return filteredT;
    },
    filteredTicketsLength() {
      return this.filteredTickets.length;
    },
    keywordMatchTicketsCount() {
      return this.$store.state.tickets.length;
    },
    filteringOptions() {
      return {
        inputFields: {
          sn_service: {
            key: this.ticketInfo.sn_service.name,
            label: this.ticketInfo.sn_service.label,
            query: this.queryService
          },
          sn_service_location: {
            key: this.ticketInfo.sn_service_location.name,
            label: this.ticketInfo.sn_service_location.label,
            query: this.queryServiceLocation
          }
        },
        buttons: {
          organization: {
            key: this.ticketInfo.organization.name,
            options: this.ticketInfo.organization.options
          },
          plan_status: {
            key: this.ticketInfo.plan_status.name,
            options: this.ticketInfo.plan_status.options
          },
          status: {
            key: this.ticketInfo.status.name,
            options: this.ticketInfo.status.options
          },
          market: {
            key: this.ticketInfo.market.name,
            options: this.ticketInfo.market.options
          }
        },
        dateSelections: {
          startTime: {
            key: "start_time",
            label: "Start Time",
            method: this.modifyStartTime
          },
          endTime: {
            key: "end_time",
            label: "End Time",
            method: this.modifyEndTime
          }
        }
      };
    },
    services() {
      return this.ticketInfo.sn_service.options.map(opt => opt.name);
    },
    serviceLocations() {
      return this.ticketInfo.sn_service_location.options.map(opt => opt.name);
    }
  },
  methods: {
    // handleSelect(item) {
    //     console.log(item);
    //   },+
    // modifyStartTime(event){
    //     var startT = ''
    //     if(this.vmodels.dateSelections.start_time && this.vmodels.checkbox.start_time)
    //         startT = `${this.startTimeStr} ${this.vmodels.dateSelections.start_time} ${this.timezone[this.filters.buttons.market]}`
    //     this.$store.commit('changeStartTime', startT)
    // },
    // modifyEndTime(event){
    //     var endT = ''
    //     if(this.vmodels.dateSelections.end_time && this.vmodels.checkbox.end_time)
    //         endT = `${this.endTimeStr} ${this.vmodels.dateSelections.end_time} ${this.timezone[this.filters.buttons.market]}`

    //     this.$store.commit('changeEndTime', endT)
    // },
    modifyStartTime(event) {
      // console.log(this.vmodels.checkbox.start_time)
      // console.log(event.target)
      if (event)
        if (event.target)
          // date events(changing date/datetime) do not have target
          this.vmodels.checkbox.start_time = !this.vmodels.checkbox.start_time;

      // console.log(this.vmodels.checkbox.start_time)
      var startTime = "";
      var startTimeDisplay = "";
      if (this.vmodels.dateSelections.start_time) {
        var [date, ...time] = this.vmodels.dateSelections.start_time.split(" ");
        var [year, month, day] = date.split("-");
        var dateFormatted =
          this.filters.buttons.market == "US"
            ? `${month}-${day}-${year}`
            : `${day}-${month}-${year}`;
        dateFormatted = [dateFormatted].concat(time).join(" ");
        var timezone = this.timezone[this.filters.buttons.market] || "";
        startTime = `${this.time.startTimeStr} ${dateFormatted} ${timezone}`;
        // for the display time will only be added if checkbox is true
        if (this.vmodels.checkbox.start_time) startTimeDisplay = startTime;
      }
      this.$store.commit("changeStartTime", {
        current: startTime,
        display: startTimeDisplay
      });
    },
    modifyEndTime(event) {
      if (event.target)
        // date events(changing date/datetime) do not have target
        this.vmodels.checkbox.end_time = !this.vmodels.checkbox.end_time;

      var endTime = "";
      var endTimeDisplay = "";
      if (this.vmodels.dateSelections.end_time) {
        var [date, ...time] = this.vmodels.dateSelections.end_time.split(" ");
        var [year, month, day] = date.split("-");
        var dateFormatted =
          this.filters.buttons.market == "US"
            ? `${month}-${day}-${year}`
            : `${day}-${month}-${year}`;
        dateFormatted = [dateFormatted].concat(time).join(" ");
        var timezone = this.timezone[this.filters.buttons.market] || "";
        endTime = `${this.time.endTimeStr} ${dateFormatted} ${timezone}`;

        // for the display time will only be added if checkbox is true
        if (this.vmodels.checkbox.end_time) endTimeDisplay = endTime;
      }
      this.$store.commit("changeEndTime", {
        current: endTime,
        display: endTimeDisplay
      });
    },

    // most recent
    //     modifyEndTime(event){
    //     if(event.target)                                                                // date events(changing date/datetime) do not have target
    //         this.vmodels.checkbox.end_time = !this.vmodels.checkbox.end_time;
    //     var endT = ''
    //     if(this.vmodels.dateSelections.end_time && this.vmodels.checkbox.end_time){
    //         var [date, ...time] = this.vmodels.dateSelections.end_time.split(' ')
    //         var [year, month, day]  = date.split('-')
    //         var dateFormatted = this.filters.buttons.market == 'US'? `${month}-${day}-${year}` : `${day}-${month}-${year}`
    //         dateFormatted = [ dateFormatted ].concat(time).join(' ')
    //         var timezone = this.timezone[this.filters.buttons.market] || ''
    //         endT = `${this.endTimeStr} ${dateFormatted} ${timezone}`
    //     }
    //     this.$store.commit('changeEndTime', endT)
    // },

    // modifyEndTime(event){

    //     if(event.target)                                                                // date events(changing date/datetime) do not have target
    //         this.vmodels.checkbox.end_time = !this.vmodels.checkbox.end_time;
    //     var endT = ''
    //     if(this.vmodels.dateSelections.end_time && this.vmodels.checkbox.end_time)
    //         endT = `${this.endTimeStr} ${this.vmodels.dateSelections.end_time} ${this.timezone[this.filters.buttons.market]}`

    //     this.$store.commit('changeEndTime', endT)
    // },
    queryService(queryString, callback) {
      var results = queryString
        ? this.services.filter(service => {
            var regex = new RegExp(queryString, "i");
            return regex.test(service);
          })
        : this.services;

      var formattedResults = results.map(s => {
        return { value: s };
      });
      callback(formattedResults);
    },

    queryServiceLocation(queryString, callback) {
      var results = queryString
        ? this.serviceLocations.filter(servLocation => {
            var regex = new RegExp(queryString, "i");
            return regex.test(servLocation);
          })
        : this.serviceLocations;

      var formattedResults = results.map(s => {
        return { value: s };
      });
      callback(formattedResults);
    },
    handleSelect(item) {
      // console.log(item);
    },
    notificationMessage() {
      var message = "";

      for (var filter of Object.keys(this.filters.buttons)) {
        if (!this.filters.buttons[filter]) {
          var options = this.filteringOptions.buttons[filter].options
            .map(opt => opt.name)
            .join(", ");
          message = `Error! missing field '${filter}'. Please choose one of these options:   ${options}`;
        }
      }

      if (message) {
        this.$message({
          title: "Error",
          duration: 7000,
          offset: 180,
          message,
          type: "error"
        });
        return;
      }

      if (
        this.vmodels.checkbox.start_time &&
        !this.vmodels.dateSelections.start_time
      ) {
        message = "Start Time is selected but no date has been specified";
        this.$message({
          title: "Error",
          duration: 7000,
          offset: 180,
          message,
          type: "error"
        });
        return;
      }

      if (
        this.vmodels.checkbox.end_time &&
        !this.vmodels.dateSelections.end_time
      ) {
        message = "End Time is selected but no date has been specified";
        this.$message({
          title: "Error",
          duration: 7000,
          offset: 180,
          message,
          type: "error"
        });
        return;
      }

      if (this.$store.state.editing) {
        message = "In order to continue please exit EDIT mode";
        this.$message({
          title: "Error",
          duration: 7000,
          offset: 180,
          message,
          type: "error",
          showClose: true
        });
        return;
      }

      if (!this.ticketNumber) {
        message = "You need to include ticket number";
        this.$message({
          title: "Error",
          duration: 7000,
          offset: 180,
          message,
          type: "error",
          showClose: true
        });
        return;
      } else if (!/(INC|CHG)\d{7}/.test(this.ticketNumber)) {
        message = "Warning: Message not in format INC0000000";
        this.$message({
          duration: 200000,
          offset: 180,
          message,
          type: "warning",
          showClose: true
        });
      }

      this.$clipboard(
        this.$store.getters.timeUpdatedNotificationText.replace(
          /\n{3,}/,
          "\n\n"
        )
      );

      window.open(this.emailLink, "_blank");
      this.disableStormcrow = true;
    },
    startOver() {
      // console.log('active is ', this.activeTicket.comm_id)
      this.disableStormcrow = false;
      this.index = 0;
      this.lastCommId = 0;
      this.timezone = 0;

      // vmodels contain all data where the user can manually edit info
      for (var types of Object.keys(this.vmodels)) {
        for (var property of Object.keys(this.vmodels[types])) {
          // console.log(property, types)3
          if (typeof this.vmodels[types][property] == "boolean")
            this.vmodels[types][property] = false;
          else this.vmodels[types][property] = "";
        }
      }

      // filters are selection of fields, filterType is only a set of buttons that work as radiobuttons
      for (var selectionType of Object.keys(this.filters)) {
        for (var prop of Object.keys(this.filters[selectionType])) {
          this.filters[selectionType][prop] = "";
        }
      }

      this.$store.commit("setKeyword", "");
      // this.$recompute('filteredTickets')

      // this.$store.commit('setActiveTicket', ticket)
    },
    filterButtonClicked(event) {
      var element = event.target;
      if (!element.name) element = element.parentElement;

      var property = element.name;
      var value = element.dataset.string;
      this.filters.buttons[property] = value;

      // update time format if market is updated
      if (property == "market") {
        this.modifyStartTime("");
        this.modifyEndTime("");
      }
    },

    // check this, numbers repeat sometimes
    changeIndex(event) {
      if (!this.filteredTicketsLength) {
        this.updateIndex(0, this.emptyTicket, 0);
        return;
      }

      var element = event.target;

      if (!element.name) element = element.parentElement;

      if (element.name === "prev")
        this.index =
          this.index == 0 ? this.filteredTicketsLength - 1 : this.index - 1;
      else if (element.name === "next")
        this.index =
          this.index == this.filteredTicketsLength - 1 ? 0 : this.index + 1;

      // if(this.filteredTicketsLength)
      this.updateIndex(
        this.index,
        this.filteredTickets[this.index],
        this.filteredTickets[this.index].comm_id
      );

      // console.log(this.filteredTicketsLength, this.activeTicket.comm_id)
    },
    printTickets() {
      //   console.log(this.activeTickets)
    },
    updateIndex(index, active, commId) {
      this.index = index;
      this.activeTicket = active;
      this.lastCommId = commId;
    },
    mouseDown(e) {
      //   console.log('mousedown',e)
      e.preventDefault();
    },
    // https://element.eleme.io/#/en-US/component/date-picker#date-formats
    timeNow(event) {
      var element = event.target;
      if (!element.name) element = element.parentElement;

      // document.getElementById('dateinput-'+element).value = Date()
      //   console.log(element.name)
      //   console.dir(document.getElementById('dateinput-start_time'))
      //   vmodels.dateSelections[dateInput.key] = '10-10-2019 12:00 AM'
    }
  }
};
</script>

<style scoped>
/* -------------------------------- */

.main-btn {
  box-sizing: border-box;
  width: 100%;
  font-size: 800;
  background-color: white;
  /* font-family: 'Libre Franklin', sans-serif; */
}

.button-area {
  width: 100%;
  padding: 8px 10px 8px 10px;
  margin: 0;
  border: 1px solid lightgray;
  border-left: none;
  border-right: none;
}

.button-area:first-child {
  border-top: none;
}

.button-area:last-child {
  border-bottom: none;
}

.grid-row-container {
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 35% 65%;
}

#start-btn {
  color: rgba(234, 75, 60, 1);
  color: #e4324c;
  border-color: #e4324c;
}

#start-btn:hover {
  color: white;
  border-color: red;
  background-color: #e4324c;
}

#submit-btn {
  color: #3b4483;
  border-color: #3b4483;
}

#submit-btn:hover {
  border-color: blue;
  color: white;
  background-color: #3b4483;
}

#count {
  /* border: 1px solid red; */
  width: 100%;
  margin: 0;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-family: "Libre Franklin", sans-serif;
  font-size: 15px;
  background-color: rgb(250, 250, 250);
  /* text-justify: center; */
}

.flex-row {
  display: flex;
}

/* Orange/Red Theme */
.el-button,
.el-button:focus {
  margin: 0 !important;
  background-color: white;
  border-color: darkred;
}

.el-button:hover {
  color: darkred;
  background-color: orange;
  background-color: #f2dda4;
  background-color: #d9b8c4;
  background-color: pink;
}

.filter-btn:focus,
.active-btn {
  color: white;
  background-color: darkorange;
  color: darkred;
}

/* Blue Theme */
.el-button,
.el-button:focus {
  margin: 0 !important;
  background-color: white;
  border-color: white;
  border: none;
}

.el-button:hover {
  color: white;
  background-color: #1da1f2;
}

.filter-btn:focus,
.active-btn {
  color: white;
  background-color: #1da1f2;
  background-color: #185ec7;
  background-color: #186ac7;
}

.flex-row > * {
  width: 100%;
  flex: 50% 1 1;
  font-size: 20px;
  margin: 0;

  padding: 10px 5px;
  font-size: 13px;
}

.nav-btn {
  padding: 4;
}

#filter-div {
  padding: 20px 10px;
  background-color: rgb(250, 250, 250);
}

.label {
  font-family: "Libre Franklin", sans-serif;
  font-size: 13px;
}

span.label {
  line-height: 40px;
}

.el-date-editor.el-input {
  box-sizing: border-box;
  width: 100%;
}

.disabled:hover {
  background-color: #909399 !important ;
  /* color: rgb(59, 68, 131) !important; */
  cursor: not-allowed !important;
}

.active-date-btn {
  border: 1px solid #186ac7 !important;
  width: 90% !important;
  color: black !important;
}

button:focus {
  outline: none;
}
</style>
