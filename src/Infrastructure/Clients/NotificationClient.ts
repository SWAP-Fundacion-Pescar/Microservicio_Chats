import axios, { AxiosResponse } from 'axios';
import CreateNotificationRequest from './Requests/CreateNotificationRequest';
import ConflictException from '../../Application/Exceptions/ConflictException';


class NotificationClientMicroservice {

    async createNotification(notificationRequest: CreateNotificationRequest, authorization: string): Promise<AxiosResponse> {
        try {
            console.log(authorization);
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
            console.error(err);
        }
    }
}
export default NotificationClientMicroservice;