import { useState } from "react";
//other-libs
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from 'antd';
//hoc
import withModal from "../../../../hocs/withModal";
//state
import { AppDispatch, RootState } from "../../../../state/store";
import { addComment } from "../../../../state/data/dataSlice";
//components
import Header from "./header";
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Mentions } from 'antd';
//helpers
import { getInitials } from "../../../../helpers/strings";
//styles
import './modal.css';

const { TextArea } = Input;

interface ColumnModalProps {
    draggable?: boolean;
    onDragStart?: React.DragEventHandler<HTMLDivElement>;
    className?: string;
    item: {
        id: number;
        title: string;
        status: string;
        started: string;
        ended: string;
        priority: string;
        assignee: string;
        options: {
            description: string;
            details: Array<{
                user: string;
                updated: string;
                prevStatus: string;
                currentStatus: string;
                comments: string[];
            }>;
        };
    };
    closeModal: any;
}

const ColumnModal = (props: ColumnModalProps) => {
    const { title, options } = props.item;
    const dispatch = useDispatch<AppDispatch>();
    const auth: any = useSelector((state: RootState) => state.auth?.userInfo);
    const [comment, setComment] = useState('');

    const handleSave = () => {
        if (!comment.trim()) {
            return;
        }

        dispatch(addComment({
            id: props.item.id,
            user: auth?.firstName + auth?.lastName,
            updated: "22/10/2024",
            prevStatus: "",
            currentStatus: props.item.status,
            comment: comment,
        }));

        setComment('');
    };

    return (
        <div className="modal_container">
            <Header
                title={title}
                item={props.item}
                closeModal={props.closeModal}
            />
            <div className="activity_description">
                <svg width="40px" height="40px" viewBox="0 -0.5 25 25" fill="#fff" opacity={0.7} xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.1 5.00016H6.9C6.53425 4.99455 6.18126 5.13448 5.9187 5.38917C5.65614 5.64385 5.50553 5.99242 5.5 6.35816V14.5002C5.50553 14.8659 5.65614 15.2145 5.9187 15.4692C6.18126 15.7238 6.53425 15.8638 6.9 15.8582H10.77C10.9881 15.857 11.2035 15.9056 11.4 16.0002L17.051 19.0002L17 14.5002H18.43C19.0106 14.5091 19.4891 14.0467 19.5 13.4662V6.35816C19.4945 5.99242 19.3439 5.64385 19.0813 5.38917C18.8187 5.13448 18.4657 4.99455 18.1 5.00016Z" stroke="#323941" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.5 8.25024C8.08579 8.25024 7.75 8.58603 7.75 9.00024C7.75 9.41446 8.08579 9.75024 8.5 9.75024V8.25024ZM16.5 9.75024C16.9142 9.75024 17.25 9.41446 17.25 9.00024C17.25 8.58603 16.9142 8.25024 16.5 8.25024V9.75024ZM8.5 11.2502C8.08579 11.2502 7.75 11.586 7.75 12.0002C7.75 12.4145 8.08579 12.7502 8.5 12.7502V11.2502ZM14.5 12.7502C14.9142 12.7502 15.25 12.4145 15.25 12.0002C15.25 11.586 14.9142 11.2502 14.5 11.2502V12.7502ZM8.5 9.75024H16.5V8.25024H8.5V9.75024ZM8.5 12.7502H14.5V11.2502H8.5V12.7502Z" fill="#323941" />
                </svg>
                <h2>Activity</h2>
            </div>
            <div className="comment_wrapper">
                <div className="avatar">{getInitials(auth?.firstName)}{getInitials(auth?.lastName)}</div>
                <div className="flex_items">
                    <Mentions
                        style={{ width: '100%' }}
                        placeholder="Write a comment..."
                        autoSize={{ minRows: 2, maxRows: 3 }}
                        className="comment_area"
                        value={comment}
                        onChange={(value: string) => setComment(value)}
                        options={[
                            {
                                value: 'John Doe',
                                label: 'John Doe',
                            },
                            {
                                value: 'Anri Voci',
                                label: 'Anri Voci',
                            },
                            {
                                value: 'Jane Doe',
                                label: 'Jane Doe',
                            },
                        ]}
                    />
                    <Upload>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </div>
                {comment.length > 0 && (
                    <div className="description" onClick={handleSave}>
                        Save
                    </div>
                )}
            </div>
            {options?.details?.map((detail: any, index: number) => (
                detail.comments.length > 0 && (
                    <div key={index} className="user_section" style={{ marginBottom: 30 }}>
                        <div className="user_avatar">
                            <p>{getInitials(detail.user)}</p>
                        </div>
                        <div className="username">
                            <p>{detail.user}</p>
                        </div>
                        <div>
                            {detail.comments.map((comment: any, index: number) => {
                                return (
                                    <div key={index} className="other_comments">
                                        <TextArea
                                            className="comment_area"
                                            value={comment}
                                            autoSize={{ minRows: 2, maxRows: 2 }}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )))}
        </div>
    )
}

export default withModal(ColumnModal);