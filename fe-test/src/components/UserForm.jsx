import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

function UserForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email) {
            return;
        }

        dispatch(addUser({ name, email }));
        setName("");
        setEmail("");
    };

    return (
        <>
            <div className="section-heading">
                <h2>새 사용자 등록</h2>
                <p>이름과 이메일을 입력해 사용자를 추가하세요.</p>
            </div>
            <form className="user-form" onSubmit={handleSubmit}>
                <label className="form-field">
                    이름
                    <input
                        type="text"
                        placeholder="홍길동"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label className="form-field">
                    이메일
                    <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <button type="submit">사용자 추가</button>
            </form>
        </>
    );
}

export default UserForm;
