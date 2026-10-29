import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import Swal from "sweetalert2";

function UserForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [showTerms, setShowTerms] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) {
            return;
        }

        setAgreed(false);
        setShowTerms(true);
    };

    const handleAgree = async () => {
        setError("");

        try {
            await dispatch(addUser({ name, email, agreed })).unwrap();
            setName("");
            setEmail("");
            setShowTerms(false);
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "사용자 추가 실패",
                text: error.message || "요청 처리 중 오류가 발생했습니다.",
                confirmButtonText: "확인",
            });
        }
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
            {showTerms && (
                <div className="terms-overlay">
                    <section
                        className="terms-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="terms-title"
                    >
                        <h2 id="terms-title">이용 약관</h2>
                        <p> 이것은 이용약관 </p>

                        <label>
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                            />
                            동의합니다.
                        </label>
                        <div className="terms-actions">
                            <button
                                type="button"
                                onClick={() => setShowTerms(false)}
                            >
                                취소
                            </button>
                            <button type="button" onClick={handleAgree}>
                                동의
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
}

export default UserForm;
