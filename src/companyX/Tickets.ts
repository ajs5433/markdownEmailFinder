import { AdditionalTicketProperties, TicketPropertyType } from "./InternalData";

export type Ticket = {
  [index: string]: string | undefined;
  comm_id: string;
  incident_id: string;
  email_subject: string;
  email_content: string;
  stormcrow_services: string;
  sn_ticket: string;
  sn_service: string;
  sn_service_location: string;
  sn_short_description: string;
  sn_description: string;
  notification_date: string;
  notification_time: string;
  organization?: string;
  market?: string;
  status?: string;
  template?: string;
};

export default class Tickets {
  static removeFaultyTickets(
    tickets: Ticket[],
    additionalCheck: boolean
  ): Ticket[] {
    return tickets.filter(t => {
      if (!t || !t.email_subject || !t.sn_ticket || !t.email_content)
        // Removing incomplete tickets
        return false;

      var test3 = t.email_subject.match(/Initial|Final|Update/g);

      if (!/^(CHG|INC)\d{7}$/.test(t.sn_ticket))
        // Removing tickets that start with the old format and tests ------------------ '[INC0000000]', 'DRILL',
        return false;

      if (/(CHG|INC)\d{7}/g.test(t.email_subject))
        // Removing subjects with dual notification  that start with the old format --- 'CHG0000000 & CHG0000001'
        return false;

      if (test3)
        if (test3.length !== 1)
          // Removing tickets with error notification ----------------------------------- 'Initial - Update'
          return false;

      if (/\*\*.*ticket.*\*\*/i.test(t.email_content))
        // Removing tickets that contain Ticket info in the body, old format ---------- **Ticket:** INC0000001
        return false;

      if (additionalCheck)
        if (!/(companyX|Third Party|Carrier)/g.test(t.email_subject))
          // Checks that every notification has either the name of the company or third party
          return false;
      return true;
    });
  }

  static addProperties(tickets: Ticket[]): void {
    AdditionalTicketProperties.forEach(property => {
      Tickets.addPropertyAttribute(tickets, property);
    });
  }
  static addPropertyAttribute(
    tickets: Ticket[],
    ticketProperty: TicketPropertyType
  ): void {
    for (var ticket of tickets) {
      var type = ticketProperty.defaultOption;
      loop1: for (var option of ticketProperty.otherOptions) {
        for (var regex of option.regexTests) {
          if (regex.test(ticket[ticketProperty.referencePropertyName] || "")) {
            type = option.name;
            break loop1;
          }
        }
      }
      ticket[ticketProperty.propertyName] = type;
    }
  }
}
