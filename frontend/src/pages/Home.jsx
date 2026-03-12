import { Link } from "react-router-dom"

export default function Home() {

    const scrollToSection = (id) => {
        const section = document.getElementById(id)
        if (section) {
            section.scrollIntoView({ behavior: "smooth" })
        }
    }


    return (
        <div className="min-h-screen flex flex-col bg-background-light">

            {/* NAVBAR */}
            <header className="flex items-center justify-between border-b border-primary/10 px-6 py-4 md:px-20 lg:px-40 bg-white">

                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-4xl">
                        school
                    </span>

                    <h2 className="text-xl font-bold tracking-tight">
                        EduPlatform
                    </h2>
                </div>

                <nav className="hidden md:flex gap-6 text-sm font-medium">

                    <button onClick={() => scrollToSection("home")} className="hover:text-primary">
                        Trang chủ
                    </button>

                    <button onClick={() => scrollToSection("courses")} className="hover:text-primary">
                        Khóa học
                    </button>

                    <button onClick={() => scrollToSection("contacts")} className="hover:text-primary">
                        Liên hệ
                    </button>

                </nav>

                <div className="flex gap-3">

                    <Link
                        to="/login"
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold"
                    >
                        Đăng nhập
                    </Link>

                    <Link
                        to="/register"
                        className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold"
                    >
                        Đăng ký
                    </Link>

                </div>

            </header>


            <main className="flex-1">

                {/*HOME*/}

                <section id="home" className="px-6 md:px-20 lg:px-40 py-16">

                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        <div className="flex flex-col gap-6">

                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold w-fit">
                                Giáo dục hiện đại
                            </span>

                            <h1 className="text-5xl font-black leading-tight">
                                Khơi nguồn sáng tạo
                                <br />
                                ươm mầm tương lai
                            </h1>

                            <p className="text-slate-600 text-lg max-w-xl">
                                EduPlatform giúp trẻ phát triển toàn diện
                                thông qua các khóa học sáng tạo, công nghệ
                                và tư duy logic.
                            </p>

                            <div className="flex gap-4">

                                <Link
                                    to="/register"
                                    className="px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-lg"
                                >
                                    Bắt đầu học
                                </Link>

                            </div>

                        </div>


                        {/* HOME IMAGE */}

                        <div className="rounded-3xl overflow-hidden shadow-xl">

                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4smOCPVuoU3wiFbhb0KRsouRLio3kfbfE9PEtXy6_D7HtWoCPYHXF3Chd8ihALZZu1DLHJke7umiefz_ICXepuLc4Eh35gL7lYCu9QV9wfWyihwwyujIxvqTnsGT011qMVjFVJoFB73B_AARxsmR5Tdvj2fgq2vqbH6F5MaUGyVZ-gIxJLAotUEAGWvsA-bnTZ4kRnxdRke8BLzN4_1wPtfE6SRcmedK4eGpZQrJ7Pho2d6iGvPUzfEcs2I7NdqT8qqVoDMrEVf8"
                                className="w-full h-full object-cover"
                                alt="hero"
                            />

                        </div>

                    </div>

                </section>


                {/* COURSES */}

                <section id="courses" className="px-6 md:px-20 lg:px-40 py-20 bg-white">

                    <div className="text-center mb-12">

                        <h2 className="text-3xl font-bold">
                            Tại sao chọn EduPlatform?
                        </h2>

                        <p className="text-slate-500 mt-3">
                            Môi trường học tập hiện đại cho trẻ em
                        </p>

                    </div>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="p-8 rounded-2xl border bg-slate-50">

                            <span className="material-symbols-outlined text-primary text-4xl">
                                menu_book
                            </span>

                            <h4 className="text-xl font-bold mt-4">
                                Chương trình chuẩn quốc tế
                            </h4>

                            <p className="text-slate-500 mt-2">
                                Nội dung học tập hiện đại
                                giúp trẻ tiếp cận tri thức toàn cầu.
                            </p>

                        </div>


                        <div className="p-8 rounded-2xl border bg-slate-50">

                            <span className="material-symbols-outlined text-primary text-4xl">
                                emoji_objects
                            </span>

                            <h4 className="text-xl font-bold mt-4">
                                Học qua trải nghiệm
                            </h4>

                            <p className="text-slate-500 mt-2">
                                Hoạt động thực tế giúp trẻ
                                phát triển tư duy sáng tạo.
                            </p>

                        </div>


                        <div className="p-8 rounded-2xl border bg-slate-50">

                            <span className="material-symbols-outlined text-primary text-4xl">
                                verified_user
                            </span>

                            <h4 className="text-xl font-bold mt-4">
                                Môi trường an toàn
                            </h4>

                            <p className="text-slate-500 mt-2">
                                Hệ thống quản lý học sinh
                                và bảo mật thông tin tuyệt đối.
                            </p>

                        </div>

                    </div>

                </section>

                {/* CONTACT */}
                <section id="contacts" className="px-6 md:px-20 lg:px-40 py-20">
                    <div className="text-center ">
                        <h2 className="text-3xl font-bold">
                            Liên hệ với chúng tôi
                        </h2>

                        <p className="text-slate-500 mt-3">
                            Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc của bạn
                        </p>
                    </div>
                </section>


            </main>


            {/* FOOTER */}

            <footer className="p-6 text-center text-slate-400 text-xs">
                © 2024 EduPlatform. Tất cả các quyền được bảo lưu.
            </footer>

        </div>
    )
}