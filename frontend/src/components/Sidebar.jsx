import { Link, useNavigate } from "react-router-dom"

export default function Sidebar() {

    const role = localStorage.getItem("role")
    const username = localStorage.getItem("username")
    const email = localStorage.getItem("email")

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate("/home")
    }

    const roleVN = {
        TEACHER: "Giáo viên",
        STUDENT: "Học sinh",
        PARENT: "Phụ huynh"
    }

    const displayRole =
        role === "STUDENT"
            ? username || "Student"
            : email || "Teacher"

    const menus = {
        TEACHER: [
            { icon: "dashboard", label: "Tổng quan", path: "/teacher/dashboard" },
            { icon: "groups", label: "Lớp học", path: "/teacher/classes" },
            { icon: "assignment", label: "Bài tập", path: "/teacher/assignments" },
            { icon: "calendar_today", label: "Lịch dạy", path: "/teacher/schedule" },
            { icon: "bar_chart", label: "Báo cáo", path: "/teacher/reports" },
            { icon: "mail", label: "Tin nhắn", path: "/messages" },
            { icon: "settings", label: "Cài đặt", path: "/teacher/settings" }
        ],

        STUDENT: [
            { icon: "dashboard", label: "Tổng quan", path: "/student/dashboard" },
            { icon: "groups", label: "Lớp học", path: "/student/classes" },
            { icon: "assignment", label: "Bài tập", path: "/student/assignments" },
            { icon: "bar_chart", label: "Kết quả", path: "/student/results" },
            { icon: "calendar_today", label: "Lịch học", path: "/student/schedule" },
            { icon: "mail", label: "Tin nhắn", path: "/messages" },
            { icon: "settings", label: "Cài đặt", path: "/student/settings" }
        ],

        PARENT: [
            { icon: "dashboard", label: "Tổng quan", path: "/parent/dashboard" },
            { icon: "bar_chart", label: "Báo cáo kết quả", path: "/parent/results" },
            { icon: "calendar_today", label: "Lịch học", path: "/parent/schedule" },
            { icon: "notifications", label: "Thông báo", path: "/parent/notifications" },
            { icon: "mail", label: "Tin nhắn", path: "/messages" },
            { icon: "settings", label: "Cài đặt", path: "/parent/settings" }
        ]
    }

    const menu = menus[role] || []

    return (
        <aside className="w-72 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between p-6">

            {/* TOP */}
            <div className="flex flex-col gap-8">

                {/* LOGO */}
                <div className="flex items-center gap-3 px-2">
                    <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-2xl">
                            school
                        </span>
                    </div>

                    <div>
                        <h1 className="text-lg font-bold">EduPlatform</h1>
                        <p className="text-xs text-slate-500">Hệ thống giáo dục</p>
                    </div>
                </div>

                {/* MENU */}
                <nav className="flex flex-col gap-1">

                    {menu.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <span className="material-symbols-outlined">
                                {item.icon}
                            </span>

                            <span className="text-sm">
                                {item.label}
                            </span>
                        </Link>
                    ))}

                </nav>

            </div>

            {/* USER + LOGOUT */}
            <div className="flex flex-col gap-4">

                {/* Avatar card */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">

                    <div className="flex items-center gap-3 mb-3">

                        <div
                            className="size-10 rounded-full bg-cover bg-center border-2 border-primary/20"
                            style={{ backgroundImage: "url(https://i.pravatar.cc/100)" }}
                        />

                        <div className="flex flex-col">

                            <p className="text-xs text-slate-500">
                                {roleVN[role] || "User"}
                            </p>

                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                {displayRole}
                            </p>
                        </div>

                    </div>

                </div>

                {/* Logout button */}
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl h-11 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                    <span className="material-symbols-outlined text-lg">
                        logout
                    </span>

                    <span>
                        Đăng xuất
                    </span>

                </button>

            </div>

        </aside>
    )
}