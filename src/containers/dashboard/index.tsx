import React, { useMemo, useState } from 'react';
//other libs
import { useSelector, useDispatch } from 'react-redux';
//state
import { addColumn } from '../../state/columns/columnsSlice';
import { updateStatus, addTask } from '../../state/data/dataSlice';
import { AppDispatch, RootState } from '../../state/store';
//hoc
import ColumnModal from "./components/modal/index";
//components
import TaskFooter from './components/task_footer';
import Statistics from '../../components/statistics';
import Fallback from '../../components/fallback';
//style
import './dashboard.css';

interface DataProps {
    id: number;
    title: string;
    status: string;
    priority: string;
    assignee: string;
    options: {
        description: string;
        details: any[] | null;
    }
}

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: RootState) => state.data);
    const columns = useSelector((state: RootState) => state.columns);
    const search = useSelector((state: RootState) => state.search);
    const auth: any = useSelector((state: RootState) => state.auth.userInfo);

    const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
    const [addItem, setAddItem] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState<string | ''>('');

    const onDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: string) => {
        const id = parseInt(e.dataTransfer.getData("id"));
        dispatch(updateStatus({ id, status: newStatus }));
        setDragOverColumn(null);
    };

    const handleAddTask = () => {
        if (inputValue.trim() === "") return;
        const newTask: DataProps = {
            id: data.length + 1,
            title: inputValue,
            status: columns.find(col => col.id === addItem)?.key || "TODO",
            priority: 'low',
            assignee: '',
            options: {
                description: "",
                details: null
            }
        };
        dispatch(addTask(newTask));
        setInputValue("");
        setAddItem(null);
    };

    const sortedData = useMemo(() => {
        const priorityOrder: Record<string, number> = { low: 2, medium: 1, high: 0 };
        return [...data].sort((a, b) => {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }, [data]);

    const filteredData = useMemo(() => {
        return search
            ? sortedData.filter(task => task.title.toLowerCase().includes(search.toLowerCase()))
            : sortedData;
    }, [search, sortedData]);

    if (!auth)
        return <Fallback />;

    return (
        <div>
            <div className="columns_wrapper">
                {columns.map(col => {
                    const columnData = filteredData.filter(item => item.status === col.key);
                    return (
                        <div key={col.id} className='column_width'>
                            <div
                                className={`column ${dragOverColumn === col.key ? 'highlight' : ''}`}
                                onDrop={e => onDrop(e, col.key)}
                                onDragOver={(e) => e.preventDefault()}
                                onDragEnter={() => setDragOverColumn(col.key)}
                            >
                                <div className="col_title">
                                    <p className="list_name">{col.name}</p>
                                    <span className="list_menu">⋯</span>
                                </div>
                                <div className="data_wrapper">
                                    {columnData.map((item: any) => (
                                        <div key={item.id}>
                                            <ColumnModal
                                                draggable
                                                item={item}
                                                className="column_data"
                                                onDragStart={(e: any) => e.dataTransfer.setData("id", item.id.toString())}
                                                closeModal={undefined}
                                            />
                                        </div>
                                    ))}
                                    {dragOverColumn === col.key && (
                                        <div className="column_data" style={{ height: 16 }} />
                                    )}
                                </div>
                                <TaskFooter
                                    id={col.id}
                                    addItem={addItem}
                                    setAddItem={setAddItem}
                                    handleAddTask={handleAddTask}
                                    setInputValue={setInputValue}
                                />
                            </div>
                        </div>
                    );
                })}
                <div className="add_list" onClick={() => dispatch(addColumn())}>
                    <p>+ Add another list</p>
                </div>
            </div>
            {auth?.role === 'admin' && (
                <Statistics />
            )}
        </div>
    );
};

export default Dashboard;