import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"

export default function ParentDashboard() {

    return (

        <div className="flex h-screen overflow-hidden bg-background-light">

            {/* SIDEBAR */}
            <Sidebar />

            <main className="flex-1 flex flex-col overflow-hidden">

                {/* NAVBAR */}
                <Navbar />

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">

                    {/* HEADER */}
                    <div className="flex justify-between items-end">

                        <div>

                            <h1 className="text-2xl font-bold text-slate-900">
                                Trang chủ phụ huynh                            </h1>

                            <p className="text-slate-500">
                                Theo dõi việc học tập của con bạn
                            </p>

                        </div>

                    </div>

                    {/* CHILD INFO */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6">

                        <div className="flex items-center gap-4">

                            <div
                                className="w-16 h-16 rounded-full bg-cover bg-center"
                                style={{ backgroundImage: "url(https://i.pravatar.cc/150?img=5)" }}
                            />

                            <div>

                                <h3 className="text-lg font-bold">
                                    Nguyễn Minh Anh
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Lớp 5A • Trường Tiểu học ABC
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className="bg-white border border-slate-200 rounded-xl p-6">

                            <p className="text-sm text-slate-500">
                                Điểm trung bình
                            </p>

                            <h2 className="text-3xl font-bold mt-2 text-primary">
                                8.7
                            </h2>

                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-6">

                            <p className="text-sm text-slate-500">
                                Bài tập đã hoàn thành
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                24
                            </h2>

                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-6">

                            <p className="text-sm text-slate-500">
                                Thông báo mới
                            </p>

                            <h2 className="text-3xl font-bold mt-2 text-red-500">
                                3
                            </h2>

                        </div>

                    </div>

                    {/* UPCOMING CLASSES */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6">

                        <h3 className="font-bold mb-4">
                            Lịch học sắp tới
                        </h3>

                        <div className="space-y-3">

                            <div className="flex justify-between p-4 bg-slate-50 rounded-lg">

                                <div>

                                    <p className="font-semibold">
                                        Toán
                                    </p>

                                    <p className="text-sm text-slate-500">
                                        Giáo viên: Nguyễn Văn A
                                    </p>

                                </div>

                                <span className="text-sm text-slate-500">
                                    08:00 - 09:30
                                </span>

                            </div>

                            <div className="flex justify-between p-4 bg-slate-50 rounded-lg">

                                <div>

                                    <p className="font-semibold">
                                        Tiếng Anh
                                    </p>

                                    <p className="text-sm text-slate-500">
                                        Giáo viên: Trần Thị B
                                    </p>

                                </div>

                                <span className="text-sm text-slate-500">
                                    10:00 - 11:30
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* NOTIFICATIONS */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6">

                        <h3 className="font-bold mb-4">
                            Thông báo từ giáo viên
                        </h3>

                        <div className="space-y-4">

                            <div className="border-l-4 border-primary pl-4">

                                <p className="font-semibold">
                                    Bài kiểm tra Toán tuần tới
                                </p>

                                <p className="text-sm text-slate-500">
                                    Học sinh cần ôn tập chương 3.
                                </p>

                            </div>

                            <div className="border-l-4 border-primary pl-4">

                                <p className="font-semibold">
                                    Hoạt động ngoại khóa
                                </p>

                                <p className="text-sm text-slate-500">
                                    Tham quan bảo tàng vào thứ sáu.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    )

}