import { EmailService, TicketService ,TicketServiceLocation } from './company/InternalData'
import { Market, Organization, Status } from './company/InternalData'

export interface StormCrowData{
    incidentId: number;
    communicationId: number;
    emailSubject: string;
    emailContent: string[];
    services: EmailService[];
}

export interface ServiceNowData{
    ticketNo: string;
    service: TicketService;
    serviceLocation: TicketServiceLocation;
}

export default interface Ticket{
    stormcrowData: StormCrowData;
    serviceNowData: ServiceNowData;
    organization: Organization;
    planned: boolean;
    status: Status;
    market: Market;
}