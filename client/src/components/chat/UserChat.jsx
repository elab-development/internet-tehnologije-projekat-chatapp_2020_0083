import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationFunc } from "../../utils/unreadNotification";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";

const UserChat =({chat, user})=>{
    const {recipientUser}=useFetchRecipientUser(chat, user)
    const {onlineUsers, notifications,markThisUserNotificationsAsRead}=useContext(ChatContext);
    const {latestMessage}=useFetchLatestMessage(chat)

    const unreadNotifications=unreadNotificationFunc(notifications)
    const thisUserNotifications=unreadNotifications?.filter(
        n=>n.senderId == recipientUser?._id
    )
    const isOnline= onlineUsers?.some((user)=>user?.userId===recipientUser?._id)

const truncateText=(text)=>{
    let shortText = text.substring(0,20);
    if(text.length>20){
        shortText=shortText+"..."
    }
    return shortText
}

    return <Stack direction="horizontal" gap={3} className="user-card align-items-centar p-2 justify-content-between" role="button"
    onClick={()=>{
        if(thisUserNotifications?.length!==0){
            markThisUserNotificationsAsRead(thisUserNotifications, notifications)
        }
    }}>
        <div className="d-flex">
            <div className="me-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
            </div>
            <div className="text-content">
                <div className="name">{recipientUser?.name}</div>
                <div className="text">{
                    latestMessage?.text && (
                        <span>{truncateText(latestMessage?.text)}</span>
                    )
                }</div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">
                {moment(latestMessage?.createdAt).calendar()}
            </div>
            <div className={ thisUserNotifications?.length > 0 ? "this-user-notifications": ""}>
                {thisUserNotifications?.length > 0 ? thisUserNotifications?.length : ''}
            </div>
            <span className={isOnline ? "user-online" : ""}></span>
        </div>
    </Stack>
}

export default UserChat;

