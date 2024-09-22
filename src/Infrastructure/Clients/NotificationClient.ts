import axios, { AxiosResponse } from 'axios';
import CreateNotificationRequest from './Requests/CreateNotificationRequest';
import ConflictException from '../../Application/Exceptions/ConflictException';


class NotificationClientMicroservice {

    async createNotification(notificationRequest: CreateNotificationRequest, authorization: string): Promise<AxiosResponse | void> {
        try {
            if (process.env.NOTIFICATIONMS) {
                const headers =
                {
                    'Content-Type': 'application/json',
                    'Authorization': authorization
                }
                const response = await axios.post(`${process.env.NOTIFICATIONMS}/notification`, notificationRequest,
                    {
                        headers: headers
                    });
                return response;
            }
            else
            {
                throw new ConflictException('No se especifico ninguna url para el ms de notificaciones')
            }

        } catch (err: any) {
            console.error(err);
        }
    }
}
export default NotificationClientMicroservice;