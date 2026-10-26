import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../store/userSlice";

function EditUserPage({ user, onClose }) {
    const [name, setName] = useState(user?.name ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(updateUser({ id: user.id, name, email })).unwrap();
            onClose();
        } catch {
            setError("사용자 정보를 수정하지 못했습니다.");
        }
    };

    return (
        <div className="modal-overlay" onMouseDown={onClose}>
            <section
                className="user-edit-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="edit-user-title"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div className="section-heading">
                    <h2 id="edit-user-title">사용자 정보 수정</h2>
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
                    {error && (
                        <p className="form-error" role="alert">
                            {error}
                        </p>
                    )}
                    <div className="form-actions">
                        <button type="button" onClick={onClose}>
                            취소
                        </button>
                        <button type="submit">저장</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default EditUserPage;
