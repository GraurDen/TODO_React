import React, { Suspense } from "react";
import style from "./App.module.css";
import Header from "./components/header/Header.jsx";
import ButtonsTranslations from "./components/ButtonsTranslations.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Auth from "./components/auth";
import Content from "./components/content";
import { useTranslation } from "react-i18next";

function App() {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState(todos);
    // Tasks number per page
    const [pageSize] = useState(5);
    // Activate filter button
    const [filterButtonBy, setFilterButtonBy] = useState("");
    // Activate order button
    const [orderBy, setOrderBy] = useState("asc");
    // Tasks total
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    // Current page
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const baseURL = "http://localhost:5000/api";

    const token = localStorage.getItem("token");

    const { i18n } = useTranslation();

    useEffect(() => {
        if (!token) {
            localStorage.removeItem("userName");
            navigate(`/auth`);
        }
        getTasks();
    }, [filterButtonBy, orderBy, currentPage, todos, totalItemsCount]);

    //#region functions

    // Interceptors response
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            let errorMessage;
            if (!error.request.response) {
                errorMessage = "No responce";
            }
            if (error.request.response === undefined) {
                errorMessage = "Client side trouble";
            }
            if (error.response) {
                errorMessage = `${error.response.status}: ${error.response.data.message}`;
            }
            if (error.response.status === 404) {
                errorMessage = `404 Page not found`;
            }
            if (error.response.status === 400) {
                errorMessage = `Bad Request`;
            }
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userName");
                navigate(`/auth`);
            }
            message.error(errorMessage);
        }
    );

    // Interceptors request
    axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
            "token"
        )}`;
        return config;
    });

    // Set userName to the localStorage
    const setUserName = (userName) =>
        localStorage.setItem("userName", userName);

    // Get userName from localStorage
    const userName = localStorage.getItem("userName");

    // Authentication -> register / login
    const authentication = async (userName, password, submitType) => {
        try {
            const res = await axios.post(`${baseURL}/${submitType}`, {
                name: userName,
                password,
            });
            const token = res.data.token;

            localStorage.setItem("token", token);
            getTasks();
            // Handling 'Register' and 'Login' submeet buttons
            if (submitType === "register") message.info("You are registered");
            if (submitType === "auth") navigate("/content");
        } catch (error) {
            if (submitType === "register") message.error("Registration error");
            if (submitType === "auth") message.error("Login error");
        }
    };

    // Logout
    const logout = () => {
        localStorage.removeItem("userName");
        navigate(`/auth`);
    };

    // Get all tasks
    const getTasks = async () => {
        const response = await axios.get(`${baseURL}/todos`, {
            params: {
                pp: pageSize,
                page: currentPage,
                sortBy: filterButtonBy !== "" ? filterButtonBy : "",
                orderBy: orderBy,
            },
        });

        setFilteredTodos(response.data.rows);
        setTotalItemsCount(response.data.count);

        if (response.data.count === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Set current page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // Order by...
    const onOrderBy = (order) => {
        setOrderBy(order);
    };
    // addTask
    const addTask = async (userInput) => {
        await axios.post(`${baseURL}/todo`, {
            name: userInput,
            done: false,
        });
        setTodos([todos]);
    };
    // Remove task
    const removeTask = async (uuid) => {
        await axios.delete(`${baseURL}/todo/${uuid}`);
        setTodos([todos]);
    };
    // User message
    const showUserMessage = () => {
        message.info("Field must be filled !");
    };

    // Edit task
    const editTask = async (uuid, userInput) => {
        const response = await axios.patch(`${baseURL}/todo/${uuid}`, {
            name: userInput,
        });
        setTodos([todos]);
    };

    // Toggle task
    const toggleTask = async (uuid, status) => {
        await axios.patch(`${baseURL}/todo/${uuid}`, {
            done: status,
        });
        setTodos([todos]);
    };

    // Set filter
    const onSetFilterBy = (status) => {
        setFilterButtonBy(status);
    };

    // Change locale
    const setLocale = async (lng) => {
        const response = await axios.get(`${baseURL}/lang/`, {
            params: { lng: lng },
        });
        message.info(response.data);
    };

    // Handling 'en' and 'ru' buttons clicks
    const changeLanguage = (e) => {
        setLocale(e.target.value);
        i18n.changeLanguage(e.target.value);
    };
    //#endregion

    return (
        <div className={style.container}>
            <Suspense fallback={"Loading"}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                    {/* EN / RU */}
                    <div>
                        <button
                            type="button"
                            onClick={changeLanguage}
                            value="en">
                            EN
                        </button>
                        <button
                            type="button"
                            onClick={changeLanguage}
                            value="ru">
                            RU
                        </button>
                    </div>

                    {/* logout */}
                    <div>
                        <button type="button" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>

                <Header task={totalItemsCount} />
                {/* Content */}
                <div className={style.content}>
                    {/* {testredirect && <Navigate to='/auth' replace={true} />} */}
                    <Routes>
                        <Route
                            path="/auth"
                            element={
                                <Auth
                                    setUserName={setUserName}
                                    authentication={authentication}
                                />
                            }
                        />
                        <Route
                            path="/content"
                            element={
                                <Content
                                    addTask={addTask}
                                    showUserMessage={showUserMessage}
                                    onOrderBy={onOrderBy}
                                    onSetFilterBy={onSetFilterBy}
                                    removeTask={removeTask}
                                    toggleTask={toggleTask}
                                    editTask={editTask}
                                    filteredTodos={filteredTodos}
                                    paginate={paginate}
                                    totalItemsCount={totalItemsCount}
                                    currentPage={currentPage}
                                />
                            }
                        />
                    </Routes>
                </div>
            </Suspense>
        </div>
    );
}

export default App;
