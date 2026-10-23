import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../store/userSlice";

function EditUserPage() {
    const { id } = useParams();
    const user = useSelector((state) =>
        state.user.users.find((item) => String(item.id) === id),
    );
    const [name, setName] = useState(user?.name ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!user) {
        return (
            <section className="user-edit-card">
                <p className="empty-state">사용자를 찾을 수 없습니다.</p>
                <Link className="back-link" to="/">사용자 목록으로</Link>
            </section>
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(
                updateUser({ id: user.id, name, email }),
            ).unwrap();
            navigate("/");
        } catch {
            setError("사용자 정보를 수정하지 못했습니다.");
        }
    };

    return (
        <section className="user-edit-card">
            <div className="section-heading">
                <h2>사용자 정보 수정</h2>
                <p>이름과 이메일을 수정한 뒤 저장하세요.</p>
            </div>
            <form className="edit-user-form" onSubmit={handleSubmit}>
                <label className="form-field">
                    이름
                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </label>
                <label className="form-field">
                    이메일
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </label>
                {error && <p className="form-error" role="alert">{error}</p>}
                <div className="form-actions">
                    <Link className="cancel-link" to="/">취소</Link>
                    <button type="submit">저장</button>
                </div>
            </form>
        </section>
    );
}

export default EditUserPage;
