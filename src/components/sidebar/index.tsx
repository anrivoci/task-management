//other-libes
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//store
import { logOut } from "../../state/auth/authSlice";
import { AppDispatch } from "../../state/store";
//provider
import { useLanguage } from "../../hooks/language_provider";
//styles
import './sidebar.css';

const SideBar = () => {
    const { changeLanguage, translations } = useLanguage();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const onLogOut = () => {
        dispatch(logOut());
        navigate('/')
    }

    return (
        <div className="sidebar_container">
            <div className="sidebar_wrapper">
                <h1>{translations.taskManagement}</h1>
                <h2>{translations.board}</h2>
            </div>
            <div className="wrapper">
                <div className="logo" />
                <p>Lufthansa</p>
            </div>
            <div className="logout_button" onClick={() => onLogOut()}>
                {translations.logout}
            </div>
            <div className="lang">
                <p onClick={() => changeLanguage('al')}>AL</p>
                <p onClick={() => changeLanguage('en')}>EN</p>
            </div>
        </div>
    )
}

export default SideBar;