import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"
import { useNavigate } from "react-router-dom"

export default function TeacherMaterialsPage() {

    const navigate = useNavigate()

    return (
        <div className="flex h-screen overflow-hidden bg-background-light">

            {/* SIDEBAR */}
            <Sidebar />

            {/* MAIN */}
            <main className="flex-1 flex flex-col overflow-hidden">

                <Navbar />

                {/* HEADER */}
                <header className="p-8 flex flex-wrap justify-between items-center gap-4">

                    <div>
                        <h2 className="text-3xl font-black">
                            Thư viện tài liệu học tập
                        </h2>

                        <p className="text-slate-500 text-sm mt-1">
                            Quản lý và chia sẻ học liệu bài giảng cho học sinh
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/teacher/create-material")}
                        className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined">add_circle</span>
                        Thêm tài liệu mới
                    </button>

                </header>

                {/* FILTER */}
                <section className="px-8 pb-6">

                    <div className="flex flex-col lg:flex-row gap-4">

                        {/* SEARCH */}
                        <input
                            placeholder="Tìm kiếm tên tài liệu..."
                            className="flex-1 px-4 py-3 rounded-xl border"
                        />

                        <select className="px-4 py-3 rounded-xl border">
                            <option>Tất cả lớp</option>
                            <option>12A1</option>
                            <option>11B2</option>
                        </select>

                        <select className="px-4 py-3 rounded-xl border">
                            <option>Loại tài liệu</option>
                            <option>PDF</option>
                            <option>Video</option>
                            <option>Word</option>
                        </select>

                    </div>

                </section>

                {/* TABLE */}
                <section className="px-8 pb-10 overflow-y-auto">

                    <div className="bg-white border rounded-2xl overflow-hidden">

                        <table className="w-full text-left">

                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold">Tên tài liệu</th>
                                    <th className="px-6 py-4 text-xs font-bold text-center">Lớp</th>
                                    <th className="px-6 py-4 text-xs font-bold">Ngày tải</th>
                                    <th className="px-6 py-4 text-xs font-bold text-center">Lượt xem</th>
                                    <th className="px-6 py-4 text-xs font-bold text-right">Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>

                                {/* ROW */}
                                <tr className="hover:bg-slate-50">

                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-3">

                                            <span className="material-symbols-outlined text-red-500 text-3xl">
                                                picture_as_pdf
                                            </span>

                                            <div>
                                                <p className="font-semibold text-sm">
                                                    Giáo án Toán Giải tích 12
                                                </p>

                                                <p className="text-xs text-slate-400">
                                                    PDF • 2.4MB
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                            12A1
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        10/10/2023
                                    </td>

                                    <td className="px-6 py-4 text-center text-sm">
                                        1200
                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex justify-end gap-2">

                                            <button className="p-2 hover:bg-slate-100 rounded-lg">
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>

                                            <button className="p-2 hover:bg-red-50 text-red-500 rounded-lg">
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </section>

            </main>

        </div>
    )
}