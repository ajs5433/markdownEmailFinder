import Vue from "vue";
import Vuex from "vuex";
import { TicketFields, incidents, maintenances } from '@/company/InternalData'
import { Ticket } from '@/company/Tickets'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    editedNotificationTitle: '',
    editedNotificationText: '',
    activeTicket: [],
    lastCommId: 0,
    keyword: '',
    ticketInfo: TicketFields,
    tickets : [],
    filteredTickets: [],
    index: 0,
    startTime: '',
    endTime: '',
    templates:{
      incidents,
      maintenances
    }
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
        }).reverse()
      },
    // activeTicket(state, getter){
    //   var ticket:Ticket = getter.activeTickets[state.index]
    //   return ticket
    // },
    notificationText(state){
      var startTime = state.startTime 
      var endTime = state.endTime 

      var startTimeRegex = /(\*\*Start.*Date.*Time.*)/
      var endTimeRegex = /(\*\*End.*Date.*Time.*)/
      var currentText = ''

      if(state.activeTicket)
        currentText = state.activeTicket.email_content || ' '
        // currentText = state.editedNotificationText || (state.activeTicket.email_content || ' ')

      if (endTimeRegex.test(currentText) && startTimeRegex.test(currentText))
        currentText = currentText.replace(startTimeRegex,startTime).replace(endTimeRegex,endTime )
      else if(endTimeRegex.test(currentText))
        currentText = currentText.replace(endTimeRegex,startTime + '\n\n'+ endTime )
      else if(startTimeRegex.test(currentText))
        currentText = currentText.replace(startTimeRegex,startTime + '\n\n'+ endTime )
      else
        currentText = currentText + '\n\n' + startTime + '\n\n'+ endTime 

      // return state.editedNotificationText || currentText;
      return currentText;
    },
    notificationTitle(state){
      var currentText = ''

      if(state.activeTicket)
        currentText = state.activeTicket.email_subject || ' '

      return currentText
      // return state.editedNotificationTitle || currentText;
    }
  },
  mutations: {
    addTickets(state, tickets){
      state.tickets = state.tickets.concat(tickets)
    }, 
    // setIndex(state, index){
    //   state.index = index;
    // },
    // setFilteredTickets(state, tickets){
    //   state.filteredTickets = tickets;
    // },
    setKeyword(state, keyword){
      state.keyword = keyword;
    },
    changeStartTime(state, time){
      state.startTime = time
    },
    changeEndTime(state, time){
      state.endTime = time
    },
    changeTime(state, time){
      state.startTime = time.startTime
      state.endTime   = time.endTime
    },
    setCommId(state, id){
      state.lastCommId = id
    },
    setNotificationText(state, value){
      state.editedNotificationText = value
    },
    setNotificationTitle(state, value){
      state.editedNotificationTitle = value
    },
    setActiveTicket(state,ticket){
      // new active ticket implies that notification text and title have changed
      // previous edits in both need to be set to zero Caleb
      state.editedNotificationText = ''
      state.editedNotificationTitle = ''

      // console.log(ticket)
      state.activeTicket = ticket
    }
  },
  actions: {}
});
