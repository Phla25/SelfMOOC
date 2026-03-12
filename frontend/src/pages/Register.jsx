import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Register() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState("TEACHER")

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp")
            return
        }

        try {

            const res = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                    role
                })
            })

            const data = await res.json()

            if (res.ok) {
                alert("Đăng ký thành công")
                navigate("/login")
            } else {
                alert(data.message || "Đăng ký thất bại")
            }

        } catch (err) {
            console.error(err)
            alert("Lỗi kết nối máy chủ")
        }
    }

    return (

        <div className="flex flex-col lg:flex-row min-h-screen bg-background-light">

            {/* LEFT VISUAL */}

            <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-primary/10">

                <div className="max-w-xl p-12">

                    <span className="material-symbols-outlined text-primary text-5xl mb-6 block">
                        school
                    </span>

                    <h1 className="text-4xl font-extrabold mb-6 leading-tight">
                        Bắt đầu hành trình
                        <br />
                        tri thức của bạn
                    </h1>

                    <p className="text-lg text-slate-600">
                        Tham gia cùng hàng nghìn giáo viên và phụ huynh
                        để tạo nên môi trường giáo dục tốt nhất cho học sinh.
                    </p>

                </div>

            </div>


            {/* RIGHT FORM */}

            <div className="flex-1 flex items-center justify-center px-10 py-16 lg:px-20">

                <div className="max-w-xl w-full bg-white rounded-xl shadow-xl p-7 border border-slate-200">

                    {/* LOGO */}
                    <div className="flex items-center gap-3 mb-6">

                        <span className="material-symbols-outlined text-primary text-4xl">
                            school
                        </span>

                        <h2 className="text-xl font-bold tracking-tight">
                            EduPlatform
                        </h2>

                    </div>

                    <div className="mb-6">

                        <h2 className="text-2xl font-bold mb-2">
                            Tạo tài khoản mới
                        </h2>

                        <p className="text-base text-slate-500">
                            Điền thông tin bên dưới để bắt đầu
                        </p>

                    </div>


                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* EMAIL */}

                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Địa chỉ Email
                            </label>

                            <div className="relative">

                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    mail
                                </span>

                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@email.com"
                                    className="w-full pl-10 pr-4 py-3 text-base border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div>

                            <label className="block text-base font-semibold mb-2">
                                Mật khẩu
                            </label>

                            <div className="relative">

                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    lock
                                </span>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Tối thiểu 8 ký tự"
                                    className="w-full pl-10 pr-12 py-4 text-lg border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
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


                        {/* CONFIRM PASSWORD */}

                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Xác nhận mật khẩu
                            </label>

                            <div className="relative">

                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    lock_reset
                                </span>

                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Nhập lại mật khẩu"
                                    className="w-full pl-10 pr-12 py-3 text-base border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                >
                                    <span className="material-symbols-outlined">
                                        {showConfirmPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>

                            </div>

                        </div>


                        {/* ROLE */}

                        <div>

                            <label className="block text-sm font-semibold mb-3">
                                Tôi là
                            </label>

                            <div className="grid grid-cols-2 gap-4">

                                <button
                                    type="button"
                                    onClick={() => setRole("TEACHER")}
                                    className={`p-3 rounded-xl border-2 flex flex-col items-center ${role === "TEACHER"
                                        ? "border-primary bg-primary/10"
                                        : "border-slate-200"
                                        }`}
                                >

                                    <span className="material-symbols-outlined text-2xl mb-1">
                                        person_4
                                    </span>

                                    <span className="font-semibold">
                                        GIÁO VIÊN
                                    </span>

                                </button>


                                <button
                                    type="button"
                                    onClick={() => setRole("PARENT")}
                                    className={`p-3 rounded-xl border-2 flex flex-col items-center ${role === "PARENT"
                                        ? "border-primary bg-primary/10"
                                        : "border-slate-200"
                                        }`}
                                >

                                    <span className="material-symbols-outlined text-2xl mb-1">
                                        family_restroom
                                    </span>

                                    <span className="font-semibold">
                                        PHỤ HUYNH
                                    </span>

                                </button>

                            </div>

                        </div>


                        {/* SUBMIT */}

                        <button
                            type="submit"
                            className="w-full py-3 text-base bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg"
                        >
                            Đăng ký ngay
                        </button>

                    </form>


                    <div className="mt-8 text-center">

                        <p className="text-base text-slate-600">

                            Bạn đã có tài khoản?

                            <Link
                                to="/login"
                                className="text-primary font-bold ml-1"
                            >
                                Đăng nhập
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    )
}