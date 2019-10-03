import Vue from "vue";
import Vuex from "vuex";
import { TicketFields } from '@/company/InternalData'
import { Ticket } from '@/company/Tickets'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeTicket: [],
    lastCommId: 0,
    keyword: '',
    ticketInfo: TicketFields,
    tickets : [],
    filteredTickets: [],
    index: 0,
    startTime: '',
    endTime: '',
  },
  getters:{
    activeTickets(state){
        var tickets : Ticket[] = state.tickets
        var regex   = new RegExp(state.keyword,'i') 
        return tickets.filter(t=>{
            if (regex.test(t.email_subject)||regex.test(t.email_content))
                return true
            if (regex.test(t.sn_short_description)||regex.test(t.sn_description))
                return true
            return false
        })
      },
    // activeTicket(state, getter){
    //   var ticket:Ticket = getter.activeTickets[state.index]
    //   return ticket
    // },
    notificationText(state, getter){
      var startTime = state.startTime 
      var endTime = state.endTime 

      var startTimeRegex = /(\*\*Start.*Date.*Time.*)/
      var endTimeRegex = /(\*\*End.*Date.*Time.*)/
      var currentText = ''

      if(state.activeTicket)
        currentText = state.activeTicket.email_content || ' '

      if (endTimeRegex.test(currentText) && startTimeRegex.test(currentText))
        currentText = currentText.replace(startTimeRegex,startTime).replace(endTimeRegex,endTime )
      else if(endTimeRegex.test(currentText))
        currentText = currentText.replace(endTimeRegex,startTime + '\n\n'+ endTime )
      else if(startTimeRegex.test(currentText))
        currentText = currentText.replace(startTimeRegex,startTime + '\n\n'+ endTime )
      else
        currentText = currentText + '\n\n' + startTime + '\n\n'+ endTime 

      return currentText;
    }
  },
  mutations: {
    addTickets(state, tickets){
      state.tickets = state.tickets.concat(tickets)
    }, 
    // setIndex(state, index){
    //   state.index = index;
    // },
    setFilteredTickets(state, tickets){
      state.filteredTickets = tickets;
    },
    setKeyword(state, keyword){
      state.keyword = keyword;
    },
    changeStartTime(state, time){
      state.startTime = time
    },
    changeEndTime(state, time){
      state.endTime = time
    },
    setCommId(state, id){
      state.lastCommId = id
    },
    modifyNotificationText(state, modification){
      // console.log('requesting to save:')
      // console.log(modification)
    },
    setActiveTicket(state,ticket){
      console.log(ticket)
      state.activeTicket = ticket
    }
  },
  actions: {}
});
