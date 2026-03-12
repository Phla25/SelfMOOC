export default function Navbar() {
    return (
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8">

            <div className="relative w-96">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    search
                </span>

                <input
                    className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl"
                    placeholder="Tìm kiếm học sinh, lớp học hoặc điểm số..."
                />
            </div>

            <div className="flex items-center gap-4">


                <div className="h-8 w-[1px] bg-slate-200"></div>



            </div>

        </header>
    );
}