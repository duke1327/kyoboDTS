import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser, deleteUser } from "../store/userSlice";
import Swal from "sweetalert2";
import EditUserPage from "./EditUserPage";

function UserList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.user.users);
    const [editUser, setEditUser] = useState(null);

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
                                onClick={() => setEditUser(user)}
                            >
                                수정
                            </button>
                            <button
                                className="delete-button"
                                type="button"
                                onClick={() => {
                                    Swal.fire({
                                        title: "정말로 삭제하시겠습니까?",
                                        text: "이 작업은 되돌릴 수 없습니다.",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#d33",
                                        cancelButtonColor: "#3085d6",
                                        confirmButtonText: "삭제",
                                        cancelButtonText: "취소",
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            dispatch(deleteUser(user.id));
                                        }
                                    });
                                }}
                            >
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="empty-state">등록된 사용자가 없습니다.</p>
            )}

            {editUser && (
                <EditUserPage
                    key={editUser.id}
                    user={editUser}
                    onClose={() => setEditUser(null)}
                />
            )}
        </>
    );
}

export default UserList;
