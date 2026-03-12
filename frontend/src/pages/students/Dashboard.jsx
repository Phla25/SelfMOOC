import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function Dashboard() {

    const [stats, setStats] = useState({
        assignmentsDone: 0,
        assignmentsTotal: 0,
        gpa: 0,
        upcomingClasses: 0
    });

    const [assignments, setAssignments] = useState([]);
    const [todaySchedule, setTodaySchedule] = useState([]);

    useEffect(() => {

        setStats({
            assignmentsDone: 24,
            assignmentsTotal: 30,
            gpa: 8.5,
            upcomingClasses: 4
        });

        setAssignments([
            {
                id: 1,
                title: "Giải tích 1",
                desc: "Chương 3: Đạo hàm",
                deadline: "25/10",
                status: "urgent"
            },
            {
                id: 2,
                title: "Lập trình OOP",
                desc: "Project thư viện",
                deadline: "30/10",
                status: "progress"
            },
            {
                id: 3,
                title: "Tiếng Anh chuyên ngành",
                desc: "Dịch thuật tài liệu",
                deadline: "02/11",
                status: "new"
            }
        ]);

        setTodaySchedule([
            {
                id: 1,
                time: "08:00 - 10:00",
                subject: "Giải tích 1",
                room: "Phòng A102"
            },
            {
                id: 2,
                time: "10:15 - 12:15",
                subject: "Lập trình OOP",
                room: "Phòng B205"
            },
            {
                id: 3,
                time: "13:30 - 15:30",
                subject: "Tự học thư viện",
                room: "Tầng 3"
            }
        ]);

    }, []);

    const statusColor = (status) => {
        switch (status) {
            case "urgent":
                return "text-red-500";
            case "progress":
                return "text-amber-500";
            default:
                return "text-slate-400";
        }
    };

    return (

        <div className="flex h-screen">

            {/* Sidebar */}
            <Sidebar />

            <div className="flex flex-col flex-1">

                {/* Navbar */}
                <Navbar />

                <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-8">

                    {/* Header */}
                    <header className="mb-8">
                        <h1 className="text-3xl font-black">
                            Bảng điều khiển học tập
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Chào mừng bạn quay trở lại!
                        </p>
                    </header>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm">
                            <p className="text-sm text-slate-500 uppercase tracking-wider">
                                Bài tập hoàn thành
                            </p>
                            <p className="text-3xl font-bold mt-2">
                                {stats.assignmentsDone}/{stats.assignmentsTotal}
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm">
                            <p className="text-sm text-slate-500 uppercase tracking-wider">
                                Điểm trung bình
                            </p>
                            <p className="text-3xl font-bold mt-2">
                                {stats.gpa}/10
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm">
                            <p className="text-sm text-slate-500 uppercase tracking-wider">
                                Lớp học sắp tới
                            </p>
                            <p className="text-3xl font-bold mt-2">
                                {stats.upcomingClasses}
                            </p>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Assignments */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm overflow-hidden">

                                <div className="px-6 py-4 border-b flex justify-between items-center">
                                    <h2 className="text-lg font-bold">
                                        Bài tập hiện tại
                                    </h2>
                                    <button className="text-primary text-sm font-semibold">
                                        Xem tất cả
                                    </button>
                                </div>

                                <div className="divide-y">

                                    {assignments.map((a) => (

                                        <div
                                            key={a.id}
                                            className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        >

                                            <div>
                                                <p className="font-semibold">
                                                    {a.title}
                                                </p>
                                                <p className="text-sm text-slate-500">
                                                    {a.desc}
                                                </p>
                                            </div>

                                            <p className={`text-sm font-medium ${statusColor(a.status)}`}>
                                                Hạn nộp: {a.deadline}
                                            </p>

                                        </div>

                                    ))}

                                </div>

                            </div>

                            {/* Weekly schedule */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm p-6">

                                <h2 className="text-lg font-bold mb-6">
                                    Lịch học tuần này
                                </h2>

                                <div className="grid grid-cols-7 gap-2 text-center">

                                    {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, index) => (

                                        <div key={index} className="flex flex-col items-center">

                                            <span className="text-xs text-slate-500 mb-1">
                                                {day}
                                            </span>

                                            <div className="w-10 h-10 flex items-center justify-center rounded-full border font-semibold">
                                                {23 + index}
                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                        {/* Right sidebar */}
                        <div className="space-y-6">

                            {/* Today schedule */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm p-6">

                                <h2 className="text-lg font-bold mb-6">
                                    Lịch hôm nay
                                </h2>

                                <div className="space-y-6">

                                    {todaySchedule.map((item) => (

                                        <div key={item.id}>

                                            <p className="text-primary text-xs font-semibold uppercase">
                                                {item.time}
                                            </p>

                                            <p className="font-bold">
                                                {item.subject}
                                            </p>

                                            <p className="text-sm text-slate-500">
                                                {item.room}
                                            </p>

                                        </div>

                                    ))}

                                </div>

                            </div>

                            {/* Announcement */}
                            <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">

                                <h3 className="font-bold text-primary mb-2">
                                    Thông báo
                                </h3>

                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                    Lịch thi giữa kỳ đã được cập nhật.
                                </p>

                                <button className="mt-4 w-full py-2 bg-primary text-white text-sm font-semibold rounded-lg">
                                    Xem chi tiết
                                </button>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>

    );
}