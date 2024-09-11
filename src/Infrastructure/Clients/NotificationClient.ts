import axios, { AxiosResponse } from 'axios';
import CreateNotificationRequest from './Requests/CreateNotificationRequest';


class NotificationClientMicroservice {

    async createNotification(notificationRequest: CreateNotificationRequest, authorization: string): Promise<AxiosResponse> {
        try {
            const headers =
            {
                'Content-Type': 'application/json',
                'Authorization': authorization
            }
            const response = await axios.post(`http://localhost:3004/api/notification`, notificationRequest, 
                {
                    headers: headers
                });
            return response;
        } catch (err: any) {            
            throw new Error(err)
        }
    }
}
export default NotificationClientMicroservice;