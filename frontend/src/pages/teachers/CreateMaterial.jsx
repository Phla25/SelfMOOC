import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function CreateMaterial() {
    return (
        <div className="flex h-screen overflow-hidden bg-background-light">

            {/* SIDEBAR */}
            <Sidebar />

            {/* MAIN AREA */}
            <main className="flex-1 flex flex-col overflow-hidden">

                <Navbar />

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto bg-slate-50">

                    <div className="max-w-5xl mx-auto px-8 py-10">

                        {/* HEADER */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-black">
                                Tạo tài liệu học tập mới
                            </h2>

                            <p className="text-slate-500 mt-1">
                                Tải lên và thiết lập tài liệu giảng dạy cho học sinh của bạn.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* LEFT COLUMN */}
                            <div className="lg:col-span-2 space-y-6">

                                {/* INFO */}
                                <div className="bg-white p-6 rounded-2xl border">

                                    <h3 className="text-lg font-bold mb-4">
                                        Thông tin chung
                                    </h3>

                                    <div className="space-y-4">

                                        <input
                                            className="w-full px-4 py-3 rounded-xl border"
                                            placeholder="Tên tài liệu"
                                        />

                                        <textarea
                                            rows="4"
                                            className="w-full px-4 py-3 rounded-xl border"
                                            placeholder="Mô tả tài liệu"
                                        />

                                        <div className="grid grid-cols-2 gap-4">

                                            <select className="px-4 py-3 rounded-xl border">
                                                <option>Chọn lớp học</option>
                                                <option>10A1</option>
                                                <option>10A2</option>
                                            </select>

                                            <select className="px-4 py-3 rounded-xl border">
                                                <option>Chọn chủ đề</option>
                                                <option>Chương 1</option>
                                                <option>Chương 2</option>
                                            </select>

                                        </div>

                                    </div>

                                </div>

                                {/* UPLOAD */}
                                <div className="bg-white p-6 rounded-2xl border">

                                    <h3 className="text-lg font-bold mb-4">
                                        Tải lên tệp
                                    </h3>

                                    <div className="border-2 border-dashed rounded-xl p-10 text-center">

                                        <p className="font-semibold">
                                            Kéo file vào đây
                                        </p>

                                        <p className="text-sm text-slate-500">
                                            PDF, Word, PowerPoint
                                        </p>

                                        <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg">
                                            Chọn file
                                        </button>

                                    </div>

                                </div>

                            </div>

                            {/* RIGHT COLUMN */}
                            <div className="space-y-6">

                                <div className="bg-white p-6 rounded-2xl border">

                                    <h3 className="text-lg font-bold mb-4">
                                        Cài đặt hiển thị
                                    </h3>

                                    <label className="flex items-center gap-3">
                                        <input type="radio" name="visibility" defaultChecked />
                                        <span>Tất cả học sinh</span>
                                    </label>

                                    <label className="flex items-center gap-3 mt-3">
                                        <input type="radio" name="visibility" />
                                        <span>Học sinh được chọn</span>
                                    </label>

                                </div>

                                {/* ACTION */}
                                <button className="w-full py-4 bg-primary text-white rounded-xl font-bold">
                                    Lưu & Đăng tải
                                </button>

                                <button className="w-full py-4 border rounded-xl">
                                    Hủy bỏ
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}