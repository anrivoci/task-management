import { Dispatch, SetStateAction, Fragment } from "react";

interface TaskFooterProps {
    addItem: number | null;
    id: number;
    handleAddTask: () => void;
    setInputValue: Dispatch<SetStateAction<string>>;
    setAddItem: Dispatch<SetStateAction<number | null>>;
}

const TaskFooter = ({
    id,
    addItem,
    setAddItem,
    handleAddTask,
    setInputValue
}: TaskFooterProps) => {
    return (
        <Fragment>
            {addItem === id ? (
                <div className="item_input_wrapper">
                    <div className="item_input">
                        <input
                            placeholder="Enter Item Title..."
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <div className="save_item">
                            <p
                                className="save_button"
                                onClick={handleAddTask}>
                                Add Task
                            </p>
                            <p
                                className="close_button"
                                onClick={() => setAddItem(null)}>
                                X
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="add_item_wrapper" onClick={() => setAddItem(id)}>
                    <div className="add_item">
                        <p>+ Add an Item</p>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default TaskFooter;