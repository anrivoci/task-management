import React, { useState } from "react";
//components
import { Modal } from "antd";

interface ItemProps {
    id: number;
    title: string;
}

interface WithModalProps {
    item: ItemProps;
    className?: string;
    draggable?: boolean;
    onDragStart?: React.DragEventHandler<HTMLDivElement>;
    closeModal?: () => void;
}

const withModal = <P extends WithModalProps>(Component: React.ComponentType<P>) => (
    props: P
) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                key={props.item.id}
                className={props.className}
                draggable={props.draggable}
                onDragStart={props.onDragStart}
                onClick={() => setIsModalOpen(true)}
            >
                <p>{props.item.title}</p>
            </div>
            <Modal
                footer={null}
                open={isModalOpen}
                className="modal_wrapper"
                onCancel={handleCloseModal}
            >
                <Component {...props} closeModal={handleCloseModal} />
            </Modal>
        </>
    )
}

export default withModal;
