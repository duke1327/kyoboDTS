import { Navigate, Route, Routes } from "react-router-dom";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

import "./App.css";

function App() {
    return (
        <main className="app-shell">
            <header className="app-header">
                <p className="app-eyebrow">USER MANAGEMENT</p>
                <h1>사용자 관리</h1>
                <p className="app-description">
                    사용자를 등록하고 목록을 확인할 수 있습니다.
                </p>
            </header>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <section className="user-form-card">
                                <UserForm />
                            </section>
                            <section className="user-list-card">
                                <UserList />
                            </section>
                        </>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </main>
    );
}

export default App;
