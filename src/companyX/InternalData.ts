interface TicketOption {
  name: string;
  regexTests: RegExp[];
}

export const basicInfo = {
  timeString: {
    phase: "**Phase Start/End Date/Time:**",
    startTime: "**Start Date Time:** ", // start/end time is the value set with the date input
    endTime: "**End Date Time:** "
  },
  timeRegex: {
    phase: /(\*\*.*(Phase|event).*Start.*Date.*Time.*)/i,
    startTime: /(\*\*.*Start.*Date.*Time.*)/,
    endTime: /(\*\*.*End.*Date.*Time.*)/
  },
  sendEmailURL: "https://www.google.com/search?biw=1920&tbm=isch&sa=1&ei=RkeiXeDtHrWy0PEPuKC2wAg&q=congratulations&oq=congratulations#",
  ticketBaseURL: {
    incident:
      "https://www.google.com/search?biw=1920&tbm=isch&sa=1&ei=RkeiXeDtHrWy0PEPuKC2wAg&q=incident&oq=incident#",
    change:
      "https://www.google.com/search?biw=1920&tbm=isch&sa=1&ei=RkeiXeDtHrWy0PEPuKC2wAg&q=maintenance&oq=maintenance#"
  }
};

export interface TicketPropertyType {
  propertyName: string; // name that will be used to access this property in the ticket.        Ticket[propertyName]
  referencePropertyName: string; // Ticket property that will be used as a reference to run test with regular expression
  defaultOption: string; // default option
  otherOptions: TicketOption[];
}

export const TicketFields = {
  comm_id: {
    name: "comm_id",
    label: "Comm ID",
    options: []
  },

  incident_id: {
    name: "incident_id",
    label: "Incident ID",
    options: []
  },

  email_subject: {
    name: "email_subject",
    label: "Email Subject",
    options: []
  },

  stormcrow_services: {
    name: "stormcrow_services",
    label: "Client Services",
    options: []
  },

  sn_ticket: {
    name: "sn_ticket",
    label: "SN Ticket",
    options: []
  },

  notification_date: {
    name: "notification_date",
    label: "Notif. Date",
    options: []
  },

  notification_time: {
    name: "notification_time",
    label: "Notif. Time (AST)",
    options: []
  },

  sn_service: {
    name: "sn_service",
    label: "SN Service",
    options: [
      { name: "Service 1" },
      { name: "Service 2" },
      { name: "Service 3" },
      { name: "Service 4" },
      { name: "Service 5" },
      { name: "MMS" },
      { name: "SMS" },
      { name: "Data" },
      { name: "Cable" },
      { name: "TV" },
      { name: "Water" },
      { name: "Electricity" },
    ]
  },

  sn_service_location: {
    name: "sn_service_location",
    label: "SN Service Loc.",
    options: [
      { name: "Atlanta" },
      { name: "Miami" },
      { name: "Michigan" },
      { name: "London" },
      { name: "UK" },
      { name: "Brazil" },
      { name: "Chicago" },
      { name: "Dominican Republic" },
    ]
  },

  sn_short_description: {
    name: "sn_short_description",
    label: "SN Short Description",
    options: []
  },

  sn_description: {
    name: "sn_description",
    label: "SN Description",
    options: []
  },

  // Additional Fields: added inside this JS
  market: {
    name: "market",
    label: "Market Format",
    options: [
      { name: "UK", regexTests: [/UK/, /United Kingdom/, /London/] },
      { name: "US", regexTests: [/./] }
    ]
  },

  status: {
    name: "status",
    label: "Status",
    options: [
      { name: "Initial", regexTests: [/ Initial/] },
      { name: "Update", regexTests: [/ Update/] },
      { name: "Final", regexTests: [/ Final/] },
      { name: "Plain", regexTests: [/./] }
    ]
  },

  plan_status: {
    name: "plan_status",
    label: "Plan/Emergency",
    options: [
      { name: "Incident Notif.", regexTests: [/Incident/] },
      { name: "Emergency Maint.", regexTests: [/Emergency Maintenance/] },
      { name: "Planned Maint.", regexTests: [/Planned Maintenance/] }
    ]
  },

  organization: {
    name: "organization",
    label: "Organization",
    options: [
      { name: "Third Party", regexTests: [/Third Party/] },
      { name: "Carrier", regexTests: [/Carrier/] },
      { name: "companyX", regexTests: [/companyX/] }
    ]
  }
};

export const AdditionalTicketProperties: TicketPropertyType[] = [
  {
    propertyName: TicketFields.market.name,
    referencePropertyName: TicketFields.stormcrow_services.name,
    defaultOption: "unknown",
    otherOptions: TicketFields.market.options
  },
  {
    propertyName: TicketFields.status.name,
    referencePropertyName: TicketFields.email_subject.name,
    defaultOption: "unknown",
    otherOptions: TicketFields.status.options
  },
  {
    propertyName: TicketFields.plan_status.name,
    referencePropertyName: TicketFields.email_subject.name,
    defaultOption: "unknown",
    otherOptions: TicketFields.plan_status.options
  },
  {
    propertyName: TicketFields.organization.name,
    referencePropertyName: TicketFields.email_subject.name,
    defaultOption: "unknown",
    otherOptions: TicketFields.organization.options
  }
];

// both IncidentList and MaintenanceList were obtained with the linux command 'tail -n +1 *' in the templates folder
const IncidentList = `==> Template 1 <==
[INC00XXXXX] CompanyX Incident Notification - Final


**Final:** The issue impacting CompanyX services has been resolved.


**End Date/Time:** 07/14/2018 06:45 PM ET


**Affected service(s):** ------------------------------


**Impact:** -------------------------------------------



------------------------------------------------------------------------------------------------------------------------------------------------

COPY/PASTE APPROPRIATE 'Affected service' FROM THE LIST BELOW

service1, service2, service3

COPY/PASTE APPROPRIATE 'Impact' FROM THE LIST BELOW

platform1, platform2



==> 00-Unknown_Inital.txt <==
------------------------------------------------------------------------------------------------------------------------------------------------
Select Stormcrow Service 
35	ATL - All Messaging Services 
------------------------------------------------------------------------------------------------------------------------------------------------


[INC00XXXXX] CompanyX Incident Notification - Initial


**Issue Summary:** Please be advised that an issue has been detected that is impacting CompanyX services. CompanyX Engineers are currently investigating and will provide an update shortly with more information. 


**Start Date Time:** 07/14/2018 06:40 PM ET


**Severity:** S1

==> 00-Unknown_Update.txt <==
[INC00XXXX] CompanyX Incident Notification - Update


**Issue Update:** CompanyX Engineers continue to work on remediating the issue.


---------------Additional Issue Details---------------


Additional updates will be provided as more information becomes available.


**Affected service(s):** ------------------------------


**Impact:** -------------------------------------------



------------------------------------------------------------------------------------------------------------------------------------------------


COPY/PASTE APPROPRIATE 'Affected service' FROM THE LIST BELOW

service1, service2, service3

COPY/PASTE APPROPRIATE 'Impact' FROM THE LIST BELOW

platform1, platform2

`;

const MaintenanceList = `==> 00-US-Standard Maintenance-Final.txt <==
CHG0032233 CompanyX Planned Maintenance - XXXXX  - Final

**Final:** The maintenance has been completed.

**End Date/Time:** 07/15/2018 03:00 AM ET 


==> 00-US-Standard Maintenance_Inital.txt <==
CHG0032233 CompanyX Planned Maintenance - XXXXX - Initial

**Summary:** Please be advised that CompanyX will be performing a planned maintenance activity per the below schedule. 

**Affected service(s):** 

**Market:** US, CA

**Expected Impact:** No Expected Impact 

**Start Date Time:** 07/15/2018 12:00 AM ET 

**End Date/Time:** 07/15/2018 03:00 AM ET 

**Severity:** P2


------------------------------------------------------------------------------------------------------------------------------------------------

COPY/PASTE APPROPRIATE 'Impact' FROM THE LIST BELOW:
==> 00-US Standard Maintenance.txt <==
CHG0033287 CompanyX Emergency Maintenance Notification

**Summary:** Please be advised that CompanyX will be performing an emergency maintenance activity as per the below schedule. 

**Affected service(s):** platform1

**Market:** US

**Expected Impact:** Platform availability

**Start Date Time:** 06/04/2019 12:00 AM ET 

**End Date/Time:** 06/04/2019 03:00 AM ET 

**Severity:** P3



------------------------------------------------------------------------------------------------------------------------------------------------

COPY/PASTE APPROPRIATE 'Impact' FROM THE LIST BELOW:
`;

export const incidents = IncidentList.replace(
  /-{124,}/g,
  "----------------------------------------------------------------------------------------------------------------------------"
)
  .split("==> ")
  .map(template => {
    var [title, body] = template.split(" <==");
    return { title, body };
  })
  .filter(template => {
    if (!template.title || !template.body) return false;
    return true;
  });

export const maintenances = MaintenanceList.replace(
  /-{124,}/g,
  "----------------------------------------------------------------------------------------------------------------------------"
)
  .split("==> ")
  .map(template => {
    var [title, body] = template.split(" <==");
    var type = /emergency/i.test(title) == true ? "emergency" : "planned";
    return { title, body, type };
  })
  .filter(template => {
    if (!template.title || !template.body) return false;
    return true;
  });
