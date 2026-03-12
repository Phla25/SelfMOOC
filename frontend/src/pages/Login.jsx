import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {

    const navigate = useNavigate()

    const [role, setRole] = useState("STUDENT")
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const body =
                role === "STUDENT"
                    ? {
                        username: identifier,
                        password,
                        role
                    }
                    : {
                        email: identifier,
                        password,
                        role
                    }

            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })

            const data = await res.json()

            if (res.ok) {
                localStorage.setItem("token", data.token)
                localStorage.setItem("role", data.user.role)
                if (data.user.username) {
                    localStorage.setItem("username", data.user.username)
                }
                if (data.user.email) {
                    localStorage.setItem("email", data.user.email)
                }
                alert("Đăng nhập thành công")
                if (role === "STUDENT") navigate("/student/dashboard")
                if (role === "TEACHER") navigate("/teacher/dashboard")
                if (role === "PARENT") navigate("/parent/dashboard")
            } else {
                alert(data.message || "Đăng nhập thất bại")
            }

        } catch (err) {
            console.error(err)
            alert("Lỗi kết nối máy chủ")
        }
    }
    return (

        <div className="flex flex-col lg:flex-row min-h-screen">

            {/* LEFT SIDE */}

            <div className="flex-1 flex flex-col justify-center px-10 py-16 lg:px-32 bg-background-light">

                <div className="max-w-xl w-full mx-auto">

                    <div className="flex items-center gap-3 mb-12">

                        <div className="p-3 bg-primary rounded-lg text-white">
                            <span className="material-symbols-outlined text-2xl">school</span>
                        </div>

                        <h2 className="text-3xl font-bold">EduPlatform</h2>

                    </div>


                    <div className="mb-10">

                        <h1 className="text-4xl lg:text-5xl font-extrabold mb-3">
                            Chào mừng trở lại!
                        </h1>

                        <p className="text-slate-500 text-lg">
                            Vui lòng nhập thông tin để tiếp tục học tập.
                        </p>

                    </div>


                    {/* ROLE */}

                    <div className="grid grid-cols-3 gap-2 p-1 bg-primary/10 rounded-xl mb-10">

                        <button
                            type="button"
                            onClick={() => setRole("STUDENT")}
                            className={`py-3 px-4 rounded-lg text-base font-semibold ${role === "STUDENT"
                                ? "bg-primary text-white shadow-sm"
                                : "text-slate-600 hover:text-primary"
                                }`}
                        >
                            Học sinh
                        </button>

                        <button
                            type="button"
                            onClick={() => setRole("TEACHER")}
                            className={`py-3 px-4 rounded-lg text-base font-semibold ${role === "TEACHER"
                                ? "bg-primary text-white shadow-sm"
                                : "text-slate-600 hover:text-primary"
                                }`}
                        >
                            Giáo viên
                        </button>

                        <button
                            type="button"
                            onClick={() => setRole("PARENT")}
                            className={`py-3 px-4 rounded-lg text-base font-semibold ${role === "PARENT"
                                ? "bg-primary text-white shadow-sm"
                                : "text-slate-600 hover:text-primary"
                                }`}
                        >
                            Phụ huynh
                        </button>

                    </div>


                    <form onSubmit={handleSubmit} className="space-y-7">


                        {/* USERNAME */}

                        <div>

                            <label className="block text-base font-medium mb-2">
                                {role === "STUDENT" ? "Tên đăng nhập" : "Email"}
                            </label>

                            <div className="relative">

                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    person
                                </span>

                                <input
                                    type="text"
                                    required
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    placeholder={
                                        role === "STUDENT"
                                            ? "Nhập tên tài khoản của bạn"
                                            : "Nhập email của bạn"
                                    }
                                    className="w-full pl-10 pr-4 py-4 text-lg bg-white border border-slate-200 rounded-xl"
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div>

                            <div className="flex justify-between mb-2">

                                <label className="text-base font-medium">
                                    Mật khẩu
                                </label>

                                <a className="text-sm text-primary hover:underline">
                                    Quên mật khẩu?
                                </a>

                            </div>

                            <div className="relative">

                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    lock
                                </span>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-12 py-4 text-lg bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                >
                                    <span className="material-symbols-outlined">
                                        {showPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 text-lg bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg"
                        >
                            Đăng nhập
                        </button>

                    </form>


                    <div className="mt-10 text-center">

                        <p className="text-base text-slate-600">

                            Chưa có tài khoản?

                            <Link
                                to="/register"
                                className="font-bold text-primary ml-1"
                            >
                                Đăng ký ngay
                            </Link>

                        </p>

                    </div>

                </div>

            </div>


            {/* RIGHT SIDE */}

            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary items-center justify-center">

                <div className="absolute inset-0">

                    <img
                        className="w-full h-full object-cover opacity-30"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9ZU4tINinHO0ZvR9gmK7irOckietROcJclmhRRM9BA2TPHWHPQAwlL828eRSClG39gLJcI49HkcbTRB9JEZmCmwUsxp5GLRBIiql1dZQC7lPs3dei8PLIvlZlOP87LlpnYcHgWyNSZqa_p2BaUKg1snL5Aj58xQfg9RVEUoOk4hLHO8AS6QYrTJ9mnUGTkVP--TD-aJb3UJExNZ8NSRFWVydyQwyscMnab5rs-OECPLd4m1U_63OhgefpT52vlm3IP9Jb8QJv4j4"
                    />

                </div>


                <div className="relative z-10 p-12 text-center max-w-xl">

                    <span className="material-symbols-outlined text-white text-6xl mb-8 block">
                        auto_stories
                    </span>

                    <h2 className="text-white text-6xl font-extrabold mb-8">
                        Mở khóa tiềm năng
                        <br />
                        <span className="text-blue-200">
                            vô tận của bạn
                        </span>
                    </h2>

                    <p className="text-blue-100 text-xl">
                        "Học tập là một cuộc hành trình không bao giờ kết thúc."
                    </p>

                </div>

            </div>

        </div>

    )
}