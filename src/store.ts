import Vue from "vue";
import Vuex from "vuex";
import { TicketFields } from '@/company/InternalData'
import { Ticket } from '@/company/Tickets'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    keyword: '',
    ticketInfo: TicketFields,
    tickets : [],
    filteredTickets: [],
    index: 0
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
      }
  },
  mutations: {
    addTickets(state, tickets){
      state.tickets = state.tickets.concat(tickets)
    }, 
    setIndex(state, index){
      state.index = index;
    },
    setFilteredTickets(state, tickets){
      state.filteredTickets = tickets;
    },
    setKeyword(state, keyword){
      state.keyword = keyword;
    }
  },
  actions: {}
});
