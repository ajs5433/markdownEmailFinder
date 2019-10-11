import Vue from "vue";
import Vuex from "vuex";
import {
  basicInfo,
  TicketFields,
  incidents,
  maintenances
} from "@/company/InternalData";
import { Ticket } from "@/company/Tickets";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    editedNotificationTitle: "",
    editedNotificationText: "",
    editing: false,
    activeTicket: [],
    allCommId: [],
    lastCommId: 0,
    keyword: "",
    ticketInfo: TicketFields,
    tickets: [],
    filteredTickets: [],
    ticketURL: basicInfo.ticketBaseURL,
    ticketNumber: "",
    index: 0,
    startTime: basicInfo.timeString.startTime, // start/end time is the value set with the date input
    endTime: basicInfo.timeString.endTime,
    phase: basicInfo.timeString.phase,
    // same as above but immutable, value is never changed
    startTimeStr: basicInfo.timeString.startTime, // start/end time is the value set with the date input
    endTimeStr: basicInfo.timeString.endTime,
    phaseStr: basicInfo.timeString.phase,
    startTimeDisplay: "", // start/end timedisplay depends on wether the checkbox is marked or not. Time that is going to be displayed
    endTimeDisplay: "",
    startTimeRegex: basicInfo.timeRegex.startTime,
    endTimeRegex: basicInfo.timeRegex.endTime,
    phaseRegex: basicInfo.timeRegex.phase,
    templates: {
      incidents,
      maintenances
    }
  },
  getters: {
    activeTickets(state) {
      var tickets: Ticket[] = state.tickets;
      var regex = new RegExp(state.keyword, "i");
      return tickets
        .filter(t => {
          if (regex.test(t.email_subject) || regex.test(t.email_content))
            return true;
          if (
            regex.test(t.sn_short_description) ||
            regex.test(t.sn_description)
          )
            return true;
          return false;
        })
        .reverse();
    },
    // activeTicket(state, getter){
    //   var ticket:Ticket = getter.activeTickets[state.index]
    //   return ticket
    // },
    // notificationText(state){
    //   var currentText = ''

    //   if(state.activeTicket)
    //     // currentText = state.activeTicket.email_content || ' '
    //     currentText = state.editedNotificationText || (state.activeTicket.email_content || ' ')

    //   return currentText
    // },
    notificationText(state) {
      var startTime = state.startTime;
      var endTime = state.endTime;
      var phase = state.phase;
      var startTimeRegex = state.startTimeRegex;
      var endTimeRegex = state.endTimeRegex;
      var phaseRegex = state.phaseRegex;
      var notificationText = state.editedNotificationText;

      // console.log("before", notificationText)

      if (phaseRegex.test(notificationText)) {
        var dummyText = "aosdijadsoijasdoijafohfohisdfohfsosijgfs!asd3";
        var globalPhaseRegex = new RegExp(phaseRegex, "ig");
        notificationText = notificationText
          .replace(phaseRegex, dummyText)
          .replace(globalPhaseRegex, "")
          .replace(dummyText, `${phase} ${startTime} ${endTime}`)
          .replace(/\n{3,}/, "\n\n");
      } else if (
        endTimeRegex.test(notificationText) &&
        startTimeRegex.test(notificationText)
      )
        notificationText = notificationText
          .replace(startTimeRegex, startTime)
          .replace(endTimeRegex, endTime);
      else if (endTimeRegex.test(notificationText))
        notificationText = notificationText.replace(
          endTimeRegex,
          startTime + "\n\n" + endTime
        );
      else if (startTimeRegex.test(notificationText))
        notificationText = notificationText.replace(
          startTimeRegex,
          startTime + "\n\n" + endTime
        );
      else
        notificationText =
          notificationText + "\n\n" + startTime + "\n\n" + endTime;

      // console.log("after", notificationText)

      return notificationText || "";
    },
    timeUpdatedNotificationText(state, getters) {
      var startTimeStr = state.startTimeStr;
      var endTimeStr = state.endTimeStr;
      var phaseRegex = state.phaseRegex;

      var notificationText = getters.notificationText;
      var textWithCorrectTime = notificationText;

      if (state.startTimeDisplay)
        textWithCorrectTime = textWithCorrectTime.replace(
          state.startTime,
          state.startTimeDisplay
        );

      if (state.endTimeDisplay)
        if (phaseRegex.test(textWithCorrectTime))
          // var textWithCorrectTime = notificationText.replace(state.startTime, state.startTimeDisplay)
          //                                           .replace(state.endTime, state.endTimeDisplay)

          textWithCorrectTime = textWithCorrectTime
            .replace(startTimeStr, "")
            .replace(endTimeStr, "");

      return textWithCorrectTime;
      // var startTime = state.startTime
      // var endTime = state.endTime
      // var startTimeRegex = /(\*\*Start.*Date.*Time.*)/
      // var endTimeRegex = /(\*\*End.*Date.*Time.*)/
      // var currentText = getters.notificationText

      // console.log(currentText)

      // if (endTimeRegex.test(currentText) && startTimeRegex.test(currentText))
      //     currentText = currentText.replace(startTimeRegex,startTime).replace(endTimeRegex,endTime )
      // else if(endTimeRegex.test(currentText))
      //     currentText = currentText.replace(endTimeRegex,startTime + '\n\n'+ endTime )
      // else if(startTimeRegex.test(currentText))
      //     currentText = currentText.replace(startTimeRegex,startTime + '\n\n'+ endTime )
      // else
      //     currentText = currentText + '\n\n' + startTime + '\n\n'+ endTime

      // return currentText;
    },
    notificationTitle(state) {
      var currentText = "";

      if (state.activeTicket)
        currentText = state.activeTicket.email_subject || " ";

      return state.editedNotificationTitle || currentText;
    }
  },
  mutations: {
    // addTickets(state, tickets){
    //   state.tickets = state.tickets.concat(tickets)
    // },
    addTickets(state, tickets) {
      if (!tickets) return;

      tickets.forEach((t: Ticket) => {
        if (!state.allCommId.includes(t.comm_id)) {
          state.allCommId.push(t.comm_id);
          state.tickets.push(t);
        }
      });
      // state.tickets = state.tickets.concat(tickets)
    },
    // setIndex(state, index){
    //   state.index = index;
    // },
    // setFilteredTickets(state, tickets){
    //   state.filteredTickets = tickets;
    // },
    setKeyword(state, keyword) {
      state.keyword = keyword;
    },
    changeStartTime(state, time) {
      state.startTime = time.current;
      state.startTimeDisplay = time.display;
    },
    changeEndTime(state, time) {
      state.endTime = time.current;
      state.endTimeDisplay = time.display;
    },
    // changeTime(state, time){
    //   state.startTime = time.startTime
    //   state.endTime   = time.endTime
    // },
    setCommId(state, id) {
      state.lastCommId = id;
    },
    setNotificationText(state, value) {
      state.editedNotificationText = value;
    },
    setNotificationTitle(state, value) {
      state.editedNotificationTitle = value;
    },
    // setActiveTicket(state,ticket){
    //   // new active ticket implies that notification text and title have changed
    //   // previous edits in both need to be set to zero Caleb
    //   state.editedNotificationText = ''
    //   state.editedNotificationTitle = ''

    //   // console.log(ticket)
    //   state.activeTicket = ticket
    // }
    setActiveTicket(state, ticket) {
      // console.log(ticket)
      // new active ticket implies that notification text and title have changed
      // previous edits in both need to be set to zero Caleb
      if (ticket) {
        state.editedNotificationText = ticket.email_content;
        state.editedNotificationTitle = ticket.email_subject;
      }
      state.activeTicket = ticket;
    },
    resetNotificationText(state, ticket) {
      if (state.activeTicket) {
        state.editedNotificationText = state.activeTicket.email_content;
        state.editedNotificationTitle = state.activeTicket.email_subject;
      }
    },
    setEditing(state, bool) {
      state.editing = bool;
    },
    setTicketNumber(state, ticket) {
      state.ticketNumber = ticket;
    }
  },
  actions: {}
});
