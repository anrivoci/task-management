import { Spin } from "antd";

const Fallback = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh" }}>
            <Spin
                size="large"
            />
        </div>
    )
}

export default Fallback;