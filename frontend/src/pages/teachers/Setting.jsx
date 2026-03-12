import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"

export default function Settings() {

    const subjects = [
        "Tiếng Anh",
        "Tiếng Việt",
        "Toán",
        "Khoa học xã hội",
        "Âm nhạc",
        "Mỹ thuật"
    ]

    const [profile, setProfile] = useState({
        name: "",
        dob: "",
        phone: "",
        subject: "",
        email: "",
        username: "",
        role: ""
    })

    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false
    })

    useEffect(() => {
        loadProfile()
    }, [])

    async function loadProfile() {

        try {

            const token = localStorage.getItem("token")

            const res = await fetch("http://localhost:3000/api/teachers/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.json()

            setProfile({
                name: data?.name || "",
                dob: data?.dob
                    ? new Date(data.dob).toISOString().split("T")[0]
                    : "",
                phone: data?.phone || "",
                subject: data?.subject || "",
                email: data?.email || "",
                username: data?.username || "",
                role: data?.role || ""
            })

        } catch {

            alert("Không tải được thông tin")

        }

    }

    async function saveProfile() {

        try {

            const token = localStorage.getItem("token")

            const res = await fetch("http://localhost:3000/api/teachers/profile", {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    name: profile.name,
                    dob: profile.dob || null,
                    phone: profile.phone,
                    subject: profile.subject,
                    username: profile.username
                })

            })

            if (!res.ok) throw new Error()

            alert("Đã lưu thông tin")

        } catch {

            alert("Không thể lưu")

        }

    }

    async function changePassword() {

        if (password.newPassword !== password.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp")
            return
        }

        try {

            const token = localStorage.getItem("token")

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

            if (!res.ok) throw new Error()

            alert("Đổi mật khẩu thành công")

            setPassword({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            })

        } catch {

            alert("Không đổi được mật khẩu")

        }

    }

    const roleName = {
        TEACHER: "Giáo viên",
        STUDENT: "Học sinh",
        PARENT: "Phụ huynh"
    }

    return (

        <div className="flex h-screen bg-background-light">

            <Sidebar />

            <main className="flex-1 overflow-y-auto">

                <Navbar />

                <div className="max-w-5xl mx-auto p-10">

                    <div className="mb-10">
                        <h1 className="text-4xl font-extrabold mb-2">
                            Cài đặt cá nhân
                        </h1>
                        <p className="text-slate-500 text-lg">
                            Quản lý thông tin hồ sơ giáo viên và bảo mật tài khoản của bạn
                        </p>
                    </div>

                    <div className="flex flex-col gap-8">

                        {/* PROFILE */}

                        <section className="bg-white rounded-xl border overflow-hidden">

                            <div className="px-6 py-4 border-b flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">person</span>
                                <h3 className="text-lg font-bold">Thông tin cá nhân</h3>
                            </div>

                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div>
                                    <label className="text-base font-semibold">
                                        Họ và tên
                                    </label>

                                    <input
                                        value={profile.name}
                                        onChange={e => setProfile({ ...profile, name: e.target.value })}
                                        className="w-full mt-1 rounded-lg border px-4 py-3 text-base bg-slate-50"
                                    />
                                </div>

                                <div>
                                    <label className="text-base font-semibold">
                                        Ngày sinh
                                    </label>

                                    <input
                                        type="date"
                                        value={profile.dob}
                                        onChange={e => setProfile({ ...profile, dob: e.target.value })}
                                        className="w-full mt-1 rounded-lg border px-4 py-3 text-base bg-slate-50"
                                    />
                                </div>

                                <div>
                                    <label className="text-base font-semibold">
                                        Số điện thoại
                                    </label>

                                    <input
                                        value={profile.phone}
                                        onChange={e => setProfile({ ...profile, phone: e.target.value })}
                                        className="w-full mt-1 rounded-lg border px-4 py-3 text-base bg-slate-50"
                                    />
                                </div>

                                <div>
                                    <label className="text-base font-semibold">
                                        Email
                                    </label>

                                    <input
                                        value={profile.email}
                                        disabled
                                        className="w-full mt-1 rounded-lg border px-4 py-3 text-base bg-slate-100"
                                    />
                                </div>

                                <div>
                                    <label className="text-base font-semibold">
                                        Tên đăng nhập
                                    </label>

                                    <input
                                        value={profile.username}
                                        onChange={e => setProfile({ ...profile, username: e.target.value })}
                                        className="w-full mt-1 rounded-lg border px-4 py-3 text-base bg-slate-50"
                                    />
                                </div>

                                <div>
                                    <label className="text-base font-semibold">
                                        Vai trò
                                    </label>

                                    <input
                                        value={roleName[profile.role] || ""}
                                        disabled
                                        className="w-full mt-1 rounded-lg border px-4 py-3 text-base bg-slate-100"
                                    />
                                </div>

                                <div className="md:col-span-2">

                                    <label className="text-base font-semibold text-slate-700">
                                        Môn học phụ trách
                                    </label>

                                    <div className="flex flex-wrap gap-3 mt-3">

                                        {subjects.map((s) => (

                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => setProfile({ ...profile, subject: s })}
                                                className={`px-4 py-2 rounded-full border text-sm transition
                                                ${profile.subject === s
                                                        ? "bg-primary/10 border-primary text-primary"
                                                        : "border-slate-300 text-slate-600 hover:border-primary hover:text-primary"
                                                    }`}
                                            >

                                                {s}

                                            </button>

                                        ))}

                                    </div>

                                </div>

                            </div>

                            <div className="px-6 py-4 border-t flex justify-end">

                                <button
                                    onClick={saveProfile}
                                    className="bg-primary text-white font-bold py-3 px-7 rounded-lg text-base"
                                >
                                    Lưu thay đổi
                                </button>

                            </div>

                        </section>


                        {/* PASSWORD */}

                        <section className="bg-white rounded-xl border overflow-hidden">

                            <div className="px-6 py-4 border-b flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">
                                    lock
                                </span>
                                <h3 className="text-lg font-bold">
                                    Đổi mật khẩu
                                </h3>
                            </div>

                            <div className="p-6 flex flex-col gap-5">

                                {/* OLD PASSWORD */}

                                <div>

                                    <label className="text-base font-semibold">
                                        Mật khẩu hiện tại
                                    </label>

                                    <div className="relative">

                                        <input
                                            type={showPassword.old ? "text" : "password"}
                                            value={password.oldPassword}
                                            onChange={e => setPassword({ ...password, oldPassword: e.target.value })}
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

                                    <label className="text-base font-semibold">
                                        Mật khẩu mới
                                    </label>

                                    <div className="relative">

                                        <input
                                            type={showPassword.new ? "text" : "password"}
                                            value={password.newPassword}
                                            onChange={e => setPassword({ ...password, newPassword: e.target.value })}
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

                                    <label className="text-base font-semibold">
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


                                <button
                                    onClick={changePassword}
                                    className="mt-3 bg-primary text-white font-bold py-3 rounded-lg text-base"
                                >
                                    Cập nhật mật khẩu
                                </button>

                            </div>

                        </section>

                    </div>

                </div>

            </main>

        </div>

    )

}