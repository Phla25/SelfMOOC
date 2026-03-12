import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
    const navigate = useNavigate();
    return (
        <div className="flex h-screen overflow-hidden bg-background-light">

            <Sidebar />

            <main className="flex-1 flex flex-col overflow-hidden">

                <Navbar />

                <div className="flex-1 overflow-y-auto p-8 space-y-8">

                    {/* Welcome */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight">
                                Bảng điều khiển Giáo viên
                            </h2>
                            <p className="text-slate-500">
                                Chào mừng trở lại, Giáo sư. Bạn có 3 lớp học hôm nay.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">

                            <button className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-bold text-sm">
                                <span className="material-symbols-outlined">quiz</span>
                                Tạo bài thi
                            </button>

                            <button className="flex items-center gap-2 bg-white border px-4 py-2.5 rounded-xl font-bold text-sm">
                                <span className="material-symbols-outlined">upload_file</span>
                                Tải học liệu
                            </button>

                            <button className="flex items-center gap-2 bg-white border px-4 py-2.5 rounded-xl font-bold text-sm">
                                <span className="material-symbols-outlined">group_add</span>
                                Chia nhóm
                            </button>

                            <button
                                onClick={() => navigate("/teacher/create-student")}
                                className="flex items-center gap-2 bg-white border px-4 py-2.5 rounded-xl font-bold text-sm"
                            >
                                <span className="material-symbols-outlined">person_add</span>
                                Tạo tài khoản HS
                            </button>

                            <button className="flex items-center gap-2 bg-white border px-4 py-2.5 rounded-xl font-bold text-sm">
                                <span className="material-symbols-outlined">file_download</span>
                                Xuất báo cáo
                            </button>

                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* LEFT */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* Statistics */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                <div className="bg-white p-6 rounded-2xl border">
                                    <p className="text-sm text-slate-500">Điểm TB lớp</p>

                                    <div className="flex items-end justify-between mt-2">
                                        <h3 className="text-3xl font-bold">84.5%</h3>
                                        <span className="text-green-500 text-sm font-bold flex items-center gap-1">
                                            +2.4%
                                            <span className="material-symbols-outlined text-sm">
                                                trending_up
                                            </span>
                                        </span>
                                    </div>

                                    <div className="w-full bg-slate-100 h-2 rounded-full mt-4">
                                        <div
                                            className="bg-primary h-full rounded-full"
                                            style={{ width: "84.5%" }}
                                        />
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border">
                                    <p className="text-sm text-slate-500">Tỉ lệ đạt</p>

                                    <div className="flex items-end justify-between mt-2">
                                        <h3 className="text-3xl font-bold">92%</h3>
                                        <span className="text-slate-400 text-sm">
                                            Mục tiêu: 90%
                                        </span>
                                    </div>

                                    <div className="w-full bg-slate-100 h-2 rounded-full mt-4">
                                        <div
                                            className="bg-green-500 h-full rounded-full"
                                            style={{ width: "92%" }}
                                        />
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border">
                                    <p className="text-sm text-slate-500">Học sinh hoạt động</p>

                                    <div className="flex items-end justify-between mt-2">
                                        <h3 className="text-3xl font-bold">142</h3>
                                        <span className="text-slate-400 text-sm">
                                            Từ 4 lớp
                                        </span>
                                    </div>
                                </div>

                            </div>

                            {/* Classes Table */}
                            <div className="bg-white rounded-2xl border overflow-hidden">

                                <div className="p-6 border-b flex justify-between items-center">
                                    <h3 className="text-lg font-bold">Lớp học của bạn</h3>
                                    <button className="text-primary text-sm font-bold">
                                        Xem tất cả
                                    </button>
                                </div>

                                <table className="w-full text-left">

                                    <thead>
                                        <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
                                            <th className="px-6 py-4">Tên lớp</th>
                                            <th className="px-6 py-4">Sĩ số</th>
                                            <th className="px-6 py-4">Vắng</th>
                                            <th className="px-6 py-4">Bài thi gần nhất</th>
                                            <th className="px-6 py-4"></th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y">

                                        <tr className="hover:bg-slate-50">
                                            <td className="px-6 py-4 font-semibold text-primary">
                                                Toán 101 - Giải tích
                                            </td>
                                            <td className="px-6 py-4">32 Học sinh</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-xs font-bold">
                                                    2 Vắng
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                Cuối kỳ (88%)
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="material-symbols-outlined text-slate-400 cursor-pointer">
                                                    more_horiz
                                                </span>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-slate-50">
                                            <td className="px-6 py-4 font-semibold text-primary">
                                                Đại số Nâng cao
                                            </td>
                                            <td className="px-6 py-4">28 Học sinh</td>
                                            <td className="px-6 py-4 text-slate-400">—</td>
                                            <td className="px-6 py-4">
                                                Kiểm tra #4 (79%)
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="material-symbols-outlined text-slate-400 cursor-pointer">
                                                    more_horiz
                                                </span>
                                            </td>
                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                        </div>

                        {/* RIGHT */}
                        <div className="lg:col-span-4 space-y-8">

                            {/* Schedule */}
                            <div className="bg-white rounded-2xl border p-6">
                                <h3 className="text-lg font-bold mb-4">
                                    Lịch dạy hôm nay
                                </h3>

                                <div className="space-y-6">

                                    <div>
                                        <p className="text-xs text-primary font-bold uppercase">
                                            Đang diễn ra
                                        </p>

                                        <h4 className="font-bold mt-1">
                                            Giải tích 101
                                        </h4>

                                        <p className="text-xs text-slate-500">
                                            08:00 - 09:30
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400 uppercase">
                                            Sắp tới
                                        </p>

                                        <h4 className="font-bold mt-1">
                                            Thống kê Ứng dụng
                                        </h4>

                                        <p className="text-xs text-slate-500">
                                            10:00 - 11:30
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}