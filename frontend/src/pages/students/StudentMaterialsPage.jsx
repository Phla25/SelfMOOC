import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function StudentMaterialsPage() {
    return (
        <div className="flex h-screen overflow-hidden bg-background-light">

            <Sidebar />

            <main className="flex-1 flex flex-col overflow-hidden">

                <Navbar />

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-6xl mx-auto space-y-8">

                        {/* Title */}
                        <div className="space-y-1">
                            <h2 className="text-3xl font-bold tracking-tight">
                                Thư viện tài liệu học tập
                            </h2>

                            <p className="text-slate-500">
                                Truy cập và quản lý tất cả tài liệu học tập của bạn tại đây.
                            </p>
                        </div>

                        {/* Search + Filters */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4 lg:flex-row lg:items-center">

                            {/* Search */}
                            <div className="flex-1 relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    search
                                </span>

                                <input
                                    type="text"
                                    placeholder="Tìm kiếm tài liệu..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg focus:ring-2 focus:ring-primary/40 text-sm"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex flex-wrap items-center gap-3">

                                {/* Subject */}
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg text-sm font-medium hover:bg-slate-100">
                                    <span>Môn học</span>
                                    <span className="material-symbols-outlined text-sm">
                                        expand_more
                                    </span>
                                </button>

                                {/* Divider */}
                                <div className="h-6 w-px bg-slate-200"></div>

                                <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-medium">
                                    Tất cả
                                </button>

                                <button className="px-4 py-2 bg-slate-50 rounded-lg text-sm font-medium hover:bg-slate-100 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">
                                        picture_as_pdf
                                    </span>
                                    PDF
                                </button>

                                <button className="px-4 py-2 bg-slate-50 rounded-lg text-sm font-medium hover:bg-slate-100 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">
                                        play_circle
                                    </span>
                                    Video
                                </button>

                                <button className="px-4 py-2 bg-slate-50 rounded-lg text-sm font-medium hover:bg-slate-100 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">
                                        description
                                    </span>
                                    Docx
                                </button>

                            </div>

                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">

                                    <thead className="bg-slate-50 border-b">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                                Tài liệu
                                            </th>
                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                                Giảng viên
                                            </th>
                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                                Ngày đăng
                                            </th>
                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                                Định dạng
                                            </th>
                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 text-right">
                                                Hành động
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y">

                                        {/* Item 1 */}
                                        <tr className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">

                                                    <div className="size-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                                                        <span className="material-symbols-outlined">
                                                            picture_as_pdf
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-sm">
                                                            Toán Giải tích 12 - Chương Đạo hàm
                                                        </p>
                                                        <p className="text-xs text-slate-500">
                                                            Toán học • 12.4 MB
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm">
                                                Nguyễn Văn A
                                            </td>

                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                15/10/2023
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                                    PDF
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <button className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-sm">
                                                    <span className="material-symbols-outlined text-sm">
                                                        visibility
                                                    </span>
                                                    Xem ngay
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Item 2 */}
                                        <tr className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">

                                                    <div className="size-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                                        <span className="material-symbols-outlined">
                                                            movie
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-sm">
                                                            Video Vật lý - Chương 1: Động lực học
                                                        </p>
                                                        <p className="text-xs text-slate-500">
                                                            Vật lý • 45:12 • HD
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm">
                                                Trần Thị B
                                            </td>

                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                12/10/2023
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                                                    Video
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <button className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-sm">
                                                    <span className="material-symbols-outlined text-sm">
                                                        play_arrow
                                                    </span>
                                                    Xem ngay
                                                </button>
                                            </td>
                                        </tr>

                                    </tbody>

                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="px-6 py-4 bg-slate-50 border-t flex items-center justify-between">

                                <p className="text-xs text-slate-500">
                                    Đang hiển thị 1 đến 5 của 24 tài liệu
                                </p>

                                <div className="flex items-center gap-2">
                                    <button className="size-8 rounded-lg bg-primary text-white text-xs font-bold">
                                        1
                                    </button>

                                    <button className="size-8 rounded-lg text-xs font-bold hover:bg-slate-200">
                                        2
                                    </button>

                                    <button className="size-8 rounded-lg text-xs font-bold hover:bg-slate-200">
                                        3
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}