import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function Setting() {

    const token = localStorage.getItem("token");

    const [profile, setProfile] = useState({
        name: "",
        username: "",
        role: "",
        phone: "",
        email: ""
    });

    const [children, setChildren] = useState([]);
    const [linkCode, setLinkCode] = useState("");

    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false
    });

    useEffect(() => {

        fetch("http://localhost:3000/api/parents/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setProfile(data);
            });

        fetch("http://localhost:3000/api/parents/children", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setChildren(data));

    }, [token]);

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };


    const saveProfile = async () => {

        await fetch("http://localhost:3000/api/parents/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(profile)
        });

        alert("Cập nhật thành công");
    };

    const linkStudent = async () => {

        if (!linkCode.trim()) {
            alert("Vui lòng nhập mã liên kết");
            return;
        }

        try {

            const res = await fetch("http://localhost:3000/api/parents/link-student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    link_code: linkCode.trim()
                })
            });

            const data = await res.json();

            if (res.ok) {

                alert(data.message);

                if (data.student) {
                    setChildren(prev => [...prev, data.student]);
                }

                setLinkCode("");

            } else {

                alert(data.error || "Liên kết thất bại");

            }

        } catch (err) {

            console.error(err);
            alert("Lỗi kết nối server");

        }

    };

    const changePassword = async () => {

        if (password.newPassword !== password.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp");
            return;
        }

        const res = await fetch("http://localhost:3000/api/auth/change-password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                oldPassword: password.oldPassword,
                newPassword: password.newPassword
            })
        });

        const data = await res.json();

        if (res.ok) {

            alert("Đổi mật khẩu thành công");

            setPassword({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

        } else {

            alert(data.error || "Đổi mật khẩu thất bại");

        }

    };

    const roleName = {
        PARENT: "Phụ huynh"
    };

    return (

        <div className="flex h-screen bg-background-light">

            <Sidebar />

            <div className="flex flex-col flex-1">

                <Navbar />

                <main className="flex-1 p-8 overflow-y-auto">

                    <div className="max-w-5xl mx-auto space-y-8">

                        <header>
                            <h2 className="text-3xl font-bold">
                                Cài đặt tài khoản
                            </h2>
                            <p className="text-slate-500">
                                Quản lý thông tin phụ huynh
                            </p>
                        </header>


                        {/* PERSONAL INFO */}

                        <section className="bg-white p-6 rounded-xl border shadow-sm">

                            <h3 className="text-lg font-bold mb-6">
                                Thông tin cá nhân
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div>
                                    <label className="text-sm font-medium">Họ và tên</label>
                                    <input
                                        name="name"
                                        value={profile.name || ""}
                                        onChange={handleProfileChange}
                                        className="w-full rounded-lg border p-2"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Vai trò</label>
                                    <input
                                        value={roleName[profile.role] || ""}
                                        readOnly
                                        className="w-full rounded-lg border bg-gray-100 p-2"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Email</label>

                                    <input
                                        value={profile.email || ""}
                                        readOnly
                                        className="w-full rounded-lg border bg-gray-100 p-2"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Tên tài khoản</label>

                                    <input
                                        name="username"
                                        value={profile.username || ""}
                                        onChange={handleProfileChange}
                                        className="w-full rounded-lg border p-2"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="text-sm font-medium">Số điện thoại</label>
                                    <input
                                        name="phone"
                                        value={profile.phone || ""}
                                        onChange={handleProfileChange}
                                        className="w-full rounded-lg border p-2"
                                    />
                                </div>

                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={saveProfile}
                                    className="bg-primary text-white px-6 py-2 rounded-lg"
                                >
                                    Lưu thay đổi
                                </button>
                            </div>

                        </section>



                        {/* CHILDREN */}

                        <section className="bg-white rounded-xl border p-6">

                            <h3 className="text-lg font-bold mb-4">
                                Thông tin con cái
                            </h3>

                            <div className="space-y-4">
                                {children.length === 0 && (
                                    <p className="text-slate-500 text-sm">
                                        Chưa có học sinh nào được liên kết
                                    </p>
                                )}

                                {children.map(child => (

                                    <div
                                        key={child.id}
                                        className="flex items-center p-4 bg-primary/5 rounded-xl border"
                                    >

                                        <div className="size-14 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                                            <span className="material-symbols-outlined text-3xl">
                                                child_care
                                            </span>
                                        </div>

                                        <div className="flex-1">
                                            <h4 className="font-bold">
                                                {child.name}
                                            </h4>
                                            <p className="text-sm text-slate-500">
                                                Mã HS: {child.link_code}
                                            </p>
                                        </div>

                                        <div className="flex gap-2">

                                        </div>

                                    </div>

                                ))}

                            </div>


                            {/* LINK CHILD */}

                            <div className="mt-8 border-t pt-6">

                                <h4 className="font-bold mb-4">
                                    Liên kết tài khoản con
                                </h4>

                                <div className="flex gap-3">

                                    <input
                                        placeholder="Ví dụ: STD-123456"
                                        value={linkCode}
                                        onChange={(e) => setLinkCode(e.target.value)}
                                        className="flex-1 border rounded-lg p-2"
                                    />

                                    <button
                                        onClick={linkStudent}
                                        className="bg-primary text-white px-6 rounded-lg"
                                    >
                                        Liên kết ngay
                                    </button>

                                </div>

                            </div>

                        </section>

                        {/* PASSWORD */}

                        <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">

                            <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">
                                    lock
                                </span>
                                <h3 className="font-bold text-slate-800">
                                    Đổi mật khẩu
                                </h3>
                            </div>

                            <div className="p-6 flex flex-col gap-5">

                                {/* OLD PASSWORD */}

                                <div>

                                    <label className="text-sm font-semibold text-slate-700">
                                        Mật khẩu hiện tại
                                    </label>

                                    <div className="relative">

                                        <input
                                            type={showPassword.old ? "text" : "password"}
                                            value={password.oldPassword}
                                            onChange={e =>
                                                setPassword({ ...password, oldPassword: e.target.value })
                                            }
                                            className="w-full mt-1 rounded-lg border px-4 py-3 text-base bg-slate-50"
                                        />

                                        <span
                                            onClick={() =>
                                                setShowPassword({
                                                    ...showPassword,
                                                    old: !showPassword.old
                                                })
                                            }
                                            className="material-symbols-outlined absolute right-3 top-3 cursor-pointer text-slate-500"
                                        >
                                            {showPassword.old ? "visibility" : "visibility_off"}
                                        </span>

                                    </div>

                                </div>


                                {/* NEW PASSWORD */}

                                <div>

                                    <label className="text-sm font-semibold text-slate-700">
                                        Mật khẩu mới
                                    </label>

                                    <div className="relative">

                                        <input
                                            type={showPassword.new ? "text" : "password"}
                                            value={password.newPassword}
                                            onChange={e =>
                                                setPassword({ ...password, newPassword: e.target.value })
                                            }
                                            className="w-full mt-1 rounded-lg border px-4 py-3 text-base bg-slate-50"
                                        />

                                        <span
                                            onClick={() =>
                                                setShowPassword({
                                                    ...showPassword,
                                                    new: !showPassword.new
                                                })
                                            }
                                            className="material-symbols-outlined absolute right-3 top-3 cursor-pointer text-slate-500"
                                        >
                                            {showPassword.new ? "visibility" : "visibility_off"}
                                        </span>

                                    </div>

                                </div>


                                {/* CONFIRM PASSWORD */}

                                <div>

                                    <label className="text-sm font-semibold text-slate-700">
                                        Xác nhận mật khẩu mới
                                    </label>

                                    <div className="relative">

                                        <input
                                            type={showPassword.confirm ? "text" : "password"}
                                            value={password.confirmPassword}
                                            onChange={e =>
                                                setPassword({
                                                    ...password,
                                                    confirmPassword: e.target.value
                                                })
                                            }
                                            className="w-full mt-1 rounded-lg border px-4 py-3 text-base bg-slate-50"
                                        />

                                        <span
                                            onClick={() =>
                                                setShowPassword({
                                                    ...showPassword,
                                                    confirm: !showPassword.confirm
                                                })
                                            }
                                            className="material-symbols-outlined absolute right-3 top-3 cursor-pointer text-slate-500"
                                        >
                                            {showPassword.confirm ? "visibility" : "visibility_off"}
                                        </span>

                                    </div>

                                </div>


                                {/* PASSWORD RULE */}

                                <div className="mt-2 space-y-2">

                                    <p className="text-xs text-slate-500 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[14px]">
                                            check_circle
                                        </span>
                                        Ít nhất 8 ký tự
                                    </p>

                                    <p className="text-xs text-slate-500 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[14px]">
                                            check_circle
                                        </span>
                                        Bao gồm chữ cái và số
                                    </p>

                                </div>


                                {/* BUTTON */}

                                <button
                                    onClick={changePassword}
                                    className="mt-3 bg-primary text-white font-bold py-3 rounded-lg text-base"
                                >
                                    Cập nhật mật khẩu
                                </button>

                            </div>

                        </section>

                    </div>

                </main>

            </div>

        </div>

    );

}