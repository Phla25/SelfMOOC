import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
export default function CreateStudent() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");

    const [result, setResult] = useState({
        username: "",
        password: "",
        link_code: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await fetch("http://localhost:3000/api/teachers/create-student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    name,
                    dob
                })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Tạo tài khoản thất bại");
                return;
            }

            setResult({
                username: data.username,
                password: data.password,
                link_code: data.student.link_code
            });

        } catch (err) {
            console.error(err);
            alert("Lỗi kết nối đến máy chủ");
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background-light">

            <Sidebar />

            <main className="flex-1 flex flex-col overflow-hidden">

                <Navbar />

                <div className="flex-1 overflow-y-auto p-8">

                    <div className="max-w-6xl mx-auto space-y-8">

                        {/* HEADER */}
                        <div>
                            <h2 className="text-3xl font-black">
                                Tạo tài khoản học sinh
                            </h2>

                            <p className="text-slate-500 mt-1">
                                Nhập thông tin để cấp tài khoản truy cập cho học sinh
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                            {/* LEFT FORM */}
                            <div className="lg:col-span-8">

                                <div className="bg-white rounded-2xl border p-8">

                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                            {/* NAME */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold">
                                                    Họ và tên
                                                </label>

                                                <input
                                                    type="text"
                                                    placeholder="Nguyễn Văn A"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full h-12 px-4 rounded-xl border bg-slate-50"
                                                    required
                                                />
                                            </div>

                                            {/* DOB */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold">
                                                    Ngày sinh
                                                </label>

                                                <input
                                                    type="date"
                                                    value={dob}
                                                    onChange={(e) => setDob(e.target.value)}
                                                    className="w-full h-12 px-4 rounded-xl border bg-slate-50"
                                                />
                                            </div>

                                            {/* USERNAME */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold">
                                                    Tên đăng nhập
                                                </label>

                                                <input
                                                    type="text"
                                                    value={result.username}
                                                    placeholder="Tạo tự động"
                                                    readOnly
                                                    className="w-full h-12 px-4 rounded-xl border bg-slate-100"
                                                />
                                            </div>

                                            {/* PASSWORD */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold">
                                                    Mật khẩu tạm thời
                                                </label>

                                                <input
                                                    type="text"
                                                    value={result.password}
                                                    placeholder="Tạo tự động"
                                                    readOnly
                                                    className="w-full h-12 px-4 rounded-xl border bg-slate-100"
                                                />
                                            </div>

                                            {/* CODE */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold">
                                                    Mã code phụ huynh
                                                </label>

                                                <input
                                                    type="text"
                                                    value={result.link_code}
                                                    placeholder="Tạo tự động"
                                                    readOnly
                                                    className="w-full h-12 px-4 rounded-xl border bg-slate-100"
                                                />
                                            </div>

                                        </div>

                                        {/* BUTTON */}
                                        <div className="flex gap-4 pt-6 border-t">

                                            <button
                                                type="submit"
                                                className="bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2"
                                            >
                                                <span className="material-symbols-outlined">
                                                    person_add
                                                </span>
                                                Tạo tài khoản
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => navigate("/teacher/dashboard")}
                                                className="bg-slate-100 px-8 py-3 rounded-xl font-bold"
                                            >
                                                Hoàn thành
                                            </button>

                                        </div>

                                    </form>

                                </div>

                            </div>

                            {/* RIGHT SIDE MOCK DATA (GIỮ NGUYÊN) */}
                            <div className="lg:col-span-4 space-y-6">

                                {/* RECENT ACCOUNTS */}
                                <div className="bg-white rounded-2xl border overflow-hidden">

                                    <div className="p-6 border-b flex justify-between">
                                        <h3 className="font-bold flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">
                                                history
                                            </span>
                                            Tài khoản vừa tạo
                                        </h3>

                                        <button className="text-primary text-sm font-bold">
                                            Tất cả
                                        </button>
                                    </div>

                                    <table className="w-full text-left">

                                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                                            <tr>
                                                <th className="px-6 py-3">Học sinh</th>
                                                <th className="px-6 py-3">Username</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y">

                                            <tr className="hover:bg-slate-50">
                                                <td className="px-6 py-4 font-semibold">
                                                    Lê Minh Tuấn
                                                </td>
                                                <td className="px-6 py-4 text-xs font-mono">
                                                    tuan.lm.23
                                                </td>
                                            </tr>

                                            <tr className="hover:bg-slate-50">
                                                <td className="px-6 py-4 font-semibold">
                                                    Trần Thu Hà
                                                </td>
                                                <td className="px-6 py-4 text-xs font-mono">
                                                    ha.tt.23
                                                </td>
                                            </tr>

                                            <tr className="hover:bg-slate-50">
                                                <td className="px-6 py-4 font-semibold">
                                                    Phạm Anh Đức
                                                </td>
                                                <td className="px-6 py-4 text-xs font-mono">
                                                    duc.pa.23
                                                </td>
                                            </tr>

                                        </tbody>

                                    </table>

                                </div>


                                {/* HELP CARD */}
                                <div className="bg-slate-900 rounded-2xl p-6 text-white">

                                    <h4 className="font-bold mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined">
                                            help
                                        </span>
                                        Trợ giúp nhanh
                                    </h4>

                                    <ul className="text-sm space-y-3 opacity-90">
                                        <li>
                                            • Học sinh sẽ được yêu cầu đổi mật khẩu khi đăng nhập lần đầu
                                        </li>
                                        <li>
                                            • Mã code dùng để liên kết tài khoản phụ huynh
                                        </li>
                                    </ul>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}