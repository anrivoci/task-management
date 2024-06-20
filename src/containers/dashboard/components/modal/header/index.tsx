import { useState } from "react";
//other-libs
import { useDispatch, useSelector } from "react-redux";
import { Input, Popover } from 'antd';
//state
import { AppDispatch, RootState } from "../../../../../state/store";
import { deleteTask, updateDescription, updateAssignee } from "../../../../../state/data/dataSlice";
//helpers
import { getInitials } from "../../../../../helpers/strings";

const { TextArea } = Input;

interface HeaderProps {
    title: string | ''
    closeModal: any;
    item: any
}

export const Header = (props: HeaderProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const auth: any = useSelector((state: RootState) => state.auth.userInfo);
    const [description, setDescription] = useState<string | null>(props.item.description)
    const [open, setOpen] = useState(false);

    const handleDelete = (id: number) => {
        dispatch(deleteTask(id));
        props.closeModal();
    }

    const editDescription = (id: number) => {
        dispatch(updateDescription({ id, description }));
    }

    const updateMember = (id: number, name: string) => {
        dispatch(updateAssignee({ id, name }));
        handleOpenChange(false);
    }

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const TEAM_MEMBERS = [
        {
            id: 1,
            name: auth?.firstName + ' ' + auth?.lastName,
        },
        {
            id: 2,
            name: 'John Doe',
        },
        {
            id: 3,
            name: 'Jane Doe',
        },
    ]

    const content = (
        <div>
            {TEAM_MEMBERS.map((member) => {
                return (
                    <div key={member.id} className="members" onClick={() => updateMember(props.item.id, member.name)}>
                        {member?.name}
                    </div>
                )
            })}
        </div>
    );

    return (
        <div className="header_container">
            <div className="header_title">
                <Popover
                    open={open}
                    onOpenChange={handleOpenChange}
                    content={content}
                    trigger="click"
                    className="popover"
                    placement="bottomRight">
                    <div className="select_assign">
                        {getInitials(props.item.assignee)}
                    </div>
                </Popover>
                <h1>{props.title}</h1>
            </div>
            <div className="delete" onClick={() => handleDelete(props.item.id)}>
                Delete
            </div>
            <div className="modal_description">
                <svg fill="#fff" opacity={0.7} width="22px" height="22px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <title>justify-align</title>
                    <path d="M0 30.016h16v-4h-16v4zM0 22.016h32v-4h-32v4zM0 14.016h32v-4h-32v4zM0 6.016h32v-4h-32v4z"></path>
                </svg>
                <h2>Description</h2>
            </div>
            <div className="area_wrapper">
                <TextArea
                    onChange={(e) => setDescription(e.target.value)}
                    className="text_area"
                    value={description || ""}
                    placeholder="Add a more detailed description..."
                    autoSize={{ minRows: 3, maxRows: 5 }}
                />
                <div className="description" onClick={() => editDescription(props.item.id)}>
                    Save
                </div>
            </div>
        </div>
    )
}

export default Header;