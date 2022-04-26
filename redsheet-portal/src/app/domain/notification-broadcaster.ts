import { Subject, Observable } from 'rxjs/Rx';

export class Notification {
    private static notificationSubject: Subject<boolean> = new Subject<boolean>();

    public static notificationSubscriber: Observable<boolean>;

    static init(){
        Notification.notificationSubscriber = Notification.notificationSubject.asObservable();
    }

    static broadcast(){
        Notification.notificationSubject.next(true);
    }
}