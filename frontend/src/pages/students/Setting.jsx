import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function Setting() {

    const token = localStorage.getItem("token");

    const [profile, setProfile] = useState({
        name: "",
        username: "",
        role: "",
        dob: "",
        link_code: ""
    });

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

        fetch("http://localhost:3000/api/students/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setProfile({
                    name: data.name || "",
                    username: data.username || "",
                    role: data.role || "",
                    dob: data.dob ? data.dob.slice(0, 10) : "",
                    link_code: data.link_code || ""
                });
            })
            .catch(err => console.error(err));

    }, [token]);



    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
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

    const handleSave = async () => {

        const res = await fetch("http://localhost:3000/api/students/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(profile)
        });

        const data = await res.json();

        if (res.ok) {
            alert("Cập nhật thành công");
        } else {
            alert(data.message || "Lỗi cập nhật");
        }
    };







    const handleCopy = () => {
        navigator.clipboard.writeText(profile.link_code);
        alert("Đã sao chép mã liên kết");
    };

    const roleName = {
        TEACHER: "Giáo viên",
        STUDENT: "Học sinh",
        PARENT: "Phụ huynh"
    }

    return (

        <div className="flex min-h-screen bg-slate-50">

            <Sidebar />

            <div className="flex flex-col flex-1">

                <Navbar />

                <main className="flex-1 p-8 lg:p-12">

                    <div className="max-w-5xl mx-auto">

                        {/* HEADER */}

                        <header className="mb-10">
                            <h2 className="text-3xl font-extrabold">
                                Cài đặt tài khoản
                            </h2>

                            <p className="text-slate-500 mt-2">
                                Quản lý thông tin cá nhân và bảo mật của bạn
                            </p>
                        </header>

                        <div className="space-y-8">

                            {/* PERSONAL INFO */}

                            <section className="bg-white p-6 rounded-xl border shadow-sm">

                                <div className="flex items-center gap-2 mb-6 border-b pb-4">
                                    <span className="material-symbols-outlined text-blue-500">
                                        person
                                    </span>

                                    <h3 className="text-lg font-bold">
                                        Thông tin cá nhân
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* NAME */}

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold">
                                            Họ và tên
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={profile.name}
                                            onChange={handleChange}
                                            className="h-12 rounded-lg border px-3 focus:ring-2 focus:ring-blue-400 outline-none"
                                        />
                                    </div>

                                    {/* USERNAME */}

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold">
                                            Tên tài khoản
                                        </label>

                                        <input
                                            type="text"
                                            name="username"
                                            value={profile.username}
                                            onChange={handleChange}
                                            className="h-12 rounded-lg border px-3 focus:ring-2 focus:ring-blue-400 outline-none"
                                        />
                                    </div>

                                    {/* ROLE */}

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold">
                                            Vai trò
                                        </label>

                                        <input
                                            type="text"
                                            value={roleName[profile.role] || ""}
                                            readOnly
                                            className="h-12 rounded-lg border px-3 bg-gray-100"
                                        />
                                    </div>

                                    {/* DOB */}

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold">
                                            Ngày sinh
                                        </label>

                                        <input
                                            type="date"
                                            name="dob"
                                            value={profile.dob}
                                            onChange={handleChange}
                                            className="h-12 rounded-lg border px-3 focus:ring-2 focus:ring-blue-400 outline-none"
                                        />
                                    </div>

                                </div>

                                <div className="mt-6">

                                    <button
                                        onClick={handleSave}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm"
                                    >
                                        Lưu thay đổi
                                    </button>

                                </div>

                            </section>

                            {/* LINK CODE */}

                            <section className="bg-white p-6 rounded-xl border shadow-sm">

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-blue-500">
                                        link
                                    </span>

                                    <h3 className="text-lg font-bold">
                                        Liên kết tài khoản
                                    </h3>
                                </div>

                                <p className="text-sm text-slate-500 mb-4">
                                    Gửi mã này cho phụ huynh để họ theo dõi kết quả học tập của bạn.
                                </p>

                                <div className="flex gap-3">

                                    <input
                                        className="flex-1 h-12 rounded-lg border bg-slate-50 font-mono text-center font-bold"
                                        value={profile.link_code}
                                        readOnly
                                    />

                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-2 bg-blue-100 text-blue-600 px-6 py-3 rounded-lg font-semibold text-sm hover:bg-blue-200"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            content_copy
                                        </span>

                                        Sao chép mã
                                    </button>

                                </div>

                            </section>

                            {/* PASSWORD */}

                            <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">

                                <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-500">
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
                                                className="w-full mt-1 rounded-lg border px-4 py-2.5 bg-slate-50"
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
                                                className="w-full mt-1 rounded-lg border px-4 py-2.5 bg-slate-50"
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
                                                className="w-full mt-1 rounded-lg border px-4 py-2.5 bg-slate-50"
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
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm"
                                    >
                                        Cập nhật mật khẩu
                                    </button>

                                </div>

                            </section>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}