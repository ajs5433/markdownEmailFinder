import Vue from "vue";
import Vuex from "vuex";
import {
  basicInfo,
  TicketFields,
  incidents,
  maintenances
} from "@/companyX/InternalData";
import { Ticket } from "@/companyX/Tickets";

Vue.use(Vuex);

interface MyState {
  editedNotificationTitle: string;
  editedNotificationText: string;
  editing: boolean;
  activeTicket: Ticket;
  allCommId: string[];
  lastCommId: number | string;
  keyword: string;
  ticketInfo: Object;
  tickets: Ticket[];
  filteredTickets: Ticket[];
  ticketURL: { incident: string; change: string };
  ticketNumber: string;
  index: number;
  startTime: string;
  endTime: string;
  phase: string;
  startTimeStr: string;
  endTimeStr: string;
  phaseStr: string;
  startTimeDisplay: string;
  endTimeDisplay: string;
  startTimeRegex: RegExp;
  endTimeRegex: RegExp;
  phaseRegex: RegExp;
  templates: { incidents: Object[]; maintenances: Object[] };
}

export default new Vuex.Store<MyState>({
  state: {
    editedNotificationTitle: "",
    editedNotificationText: "",
    editing: false,
    activeTicket: {
      comm_id: "0",
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
    },
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

    notificationText(state) {
      var startTime = state.startTime;
      var endTime = state.endTime;
      var phase = state.phase;
      var startTimeRegex = state.startTimeRegex;
      var endTimeRegex = state.endTimeRegex;
      var phaseRegex = state.phaseRegex;
      var notificationText = state.editedNotificationText;

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
          textWithCorrectTime = textWithCorrectTime
            .replace(startTimeStr, "")
            .replace(endTimeStr, "");

      return textWithCorrectTime;
    },
    notificationTitle(state) {
      var currentText = "";

      if (state.activeTicket)
        currentText = state.activeTicket.email_subject || " ";

      return state.editedNotificationTitle || currentText;
    }
  },
  mutations: {
    addTickets(state, tickets) {
      if (!tickets) return;

      tickets.forEach((t: Ticket) => {
        if (!state.allCommId.includes(t.comm_id)) {
          state.allCommId.push(t.comm_id);
          state.tickets.push(t);
        }
      });
    },
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

    setCommId(state, id) {
      state.lastCommId = id;
    },
    setNotificationText(state, value) {
      state.editedNotificationText = value;
    },
    setNotificationTitle(state, value) {
      state.editedNotificationTitle = value;
    },

    setActiveTicket(state, ticket) {
      // new active ticket implies that notification text and title have changed
      // previous edits in both need to be set to zero
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
