import { useMemo } from "react";
//other-libs
import { useSelector } from "react-redux";
//state
import { RootState } from "../../state/store";
//helpers
import { getReports } from "../../helpers/reporting";
//styles
import './statistics.css';

const Statistics = () => {
    const data: any = useSelector((state: RootState) => state.data);
    const search = useSelector((state: RootState) => state.search);

    const filteredData = useMemo(() => {
        return search
            ? data.filter((task: any) => task.title.toLowerCase().includes(search.toLowerCase()))
            : data;
    }, [search, data]);

    return (
        <div className="statistics_container">
            <h1>Team Development - Report for Q1 2024</h1>
            <h2>Task Performance</h2>
            <table>
                <thead>
                    <tr>
                        <th>Task ID</th>
                        <th>Task Name</th>
                        <th>Completed</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((task: any) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.status === "done" ? "Yes" : "No"}</td>
                            <td>{task.status.toUpperCase()}</td>
                            <td>{task.assignee}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Team Efficiency</h2>
            <ul>
                <li>Total Tasks: {data.length}</li>
                <li>Completed Tasks: {getReports(data, 'done')}</li>
                <li>Pending Tasks: {getReports(data, 'todo')}</li>
            </ul>
        </div>
    )
}

export default Statistics;