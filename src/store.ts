import Vue from "vue";
import Vuex from "vuex";
import { TicketFields } from '@/company/InternalData'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ticketInfo: TicketFields,
    tickets : [],
    coco: 'si funciona mi bi, tu eres el k esta mal'
  },
  mutations: {
    addTickets(state, tickets){
      state.tickets = state.tickets.concat(tickets)
    }
  },
  actions: {}
});
