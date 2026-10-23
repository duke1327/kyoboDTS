import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../store/userSlice";

function UserList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.user.users);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <>
            <div className="section-heading">
                <h2>사용자 목록</h2>
                <p>등록된 사용자 정보를 확인할 수 있습니다.</p>
            </div>
            {users.length > 0 ? (
                <ul className="user-list">
                    {users.map((user) => (
                        <li key={user.id}>
                            <span className="user-avatar" aria-hidden="true">
                                {user.name?.charAt(0) || "?"}
                            </span>
                            <span className="user-details">
                                <span className="user-name">{user.name}</span>
                                <span className="user-email">{user.email}</span>
                            </span>
                            <button
                                className="edit-button"
                                type="button"
                                onClick={() => navigate(`/users/${user.id}/edit`)}
                            >
                                수정
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="empty-state">등록된 사용자가 없습니다.</p>
            )}
        </>
    );
}

export default UserList;