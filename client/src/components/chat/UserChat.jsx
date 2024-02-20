import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const UserChat =({chat, user})=>{
    const {recipientUser}=useFetchRecipientUser(chat, user)
    console.log(recipientUser)
    return <Stack direction="horizontal" gap={3} className="user-card align-items-centar p-2 justify-content-between">
        <div className="d-flex">
            <div className="me-2">
                A
            </div>
            <div className="text-content">
                <div className="name">{recipientUser?.name}</div>
                <div className="text">TextMessage</div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">
                12/12/2024
            </div>
            <div className="this-user-notifications">2</div>
            <span className="user-online"></span>
        </div>
    </Stack>
}

export default UserChat;

