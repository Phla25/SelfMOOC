'use client';

import { useEffect, useState } from 'react';
import { getMyNotificationsAction, markAsReadAction } from '@/modules/notifications/notification.action';
import { getMyChildrenAction } from '@/modules/family/controller/family.action';

type ChildInfo = {
  student_id: number;
  student_name: string;
  student_avatar: string | null;
};

type NotificationItem = {
  _id: string;
  recipient_id: number;
  recipient_type?: string;
  type: string;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string | Date;
  child?: ChildInfo | null;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [childrenData, setChildrenData] = useState<ChildInfo[]>([]);
  const [activeStudentId, setActiveStudentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [nowTs] = useState(() => Date.now());

  useEffect(() => {
    async function fetchData() {
      const [notifRes, childrenRes] = await Promise.all([
        getMyNotificationsAction(100),
        getMyChildrenAction(),
      ]);

      if (notifRes.success) setNotifications(notifRes.data);
      if (childrenRes.success) {
        setChildrenData(childrenRes.data);
        if (childrenRes.data.length > 0) {
          setActiveStudentId((current) => current ?? childrenRes.data[0].student_id);
        }
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  const isParentView = childrenData.length > 0;
  const visibleNotifications = isParentView && activeStudentId
    ? notifications.filter((n) => Number(n.recipient_id) === activeStudentId)
    : notifications;
  const activeChild = childrenData.find((child) => child.student_id === activeStudentId) || null;

  async function handleClickNotif(n: NotificationItem) {
    if (!n.is_read) {
      const res = await markAsReadAction(n._id);
      if (res.success) {
        setNotifications((prev) => prev.map((item) => (item._id === n._id ? { ...item, is_read: true } : item)));
      }
    }
  }

  function timeAgo(dateInput: string | Date) {
    const diff = nowTs - new Date(dateInput).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} phút trước`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} giờ trước`;
    return `${Math.floor(hours / 24)} ngày trước`;
  }

  const unreadCount = notifications.filter((n) => !n.is_read).length;
  const visibleUnreadCount = visibleNotifications.filter((n) => !n.is_read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="flex items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-800">Thông Báo</h1>
          <p className="text-gray-400 font-medium">
            {isParentView ? 'Thông báo được chia theo từng bé' : 'Tất cả thông báo dành cho bạn'}
          </p>
        </div>
        <div className="ml-auto bg-blue-100 text-blue-700 font-black px-4 py-2 rounded-2xl text-sm">
          {unreadCount} chưa đọc
        </div>
      </div>

      {isParentView && (
        <div className="mb-8 bg-white rounded-[2rem] shadow-xl p-5 border-b-8 border-emerald-100">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-black text-gray-800">Chọn con để xem thông báo</h2>
              <p className="text-sm text-gray-400 font-medium">
                {activeChild ? `Đang xem: ${activeChild.student_name}` : 'Chưa có bé nào được liên kết'}
              </p>
            </div>
            <div className="bg-emerald-100 text-emerald-700 font-black px-4 py-2 rounded-2xl text-sm">
              {visibleUnreadCount} chưa đọc trong mục này
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
            {childrenData.length === 0 ? (
              <div className="bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-3xl p-6 w-full text-center text-emerald-700 font-medium">
                Chưa có bé nào được liên kết để chia thông báo.
              </div>
            ) : (
              childrenData.map((child) => {
                const total = notifications.filter((n) => Number(n.recipient_id) === child.student_id).length;
                const unread = notifications.filter(
                  (n) => Number(n.recipient_id) === child.student_id && !n.is_read
                ).length;
                const isActive = activeStudentId === child.student_id;

                return (
                  <button
                    key={child.student_id}
                    onClick={() => setActiveStudentId(child.student_id)}
                    className={`min-w-[220px] text-left rounded-3xl p-4 transition-all border-2 flex items-center gap-4 ${
                      isActive
                        ? 'bg-emerald-50 border-emerald-400 shadow-md'
                        : 'bg-white border-gray-100 hover:border-emerald-200'
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-inner border-4 ${
                        isActive ? 'border-emerald-200 bg-white' : 'border-gray-50 bg-gray-100'
                      }`}
                    >
                      {child.student_avatar ? (
                        <img
                          src={child.student_avatar}
                          className="w-full h-full object-cover rounded-full"
                          alt="avatar"
                        />
                      ) : (
                        '🐣'
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold truncate ${isActive ? 'text-emerald-700' : 'text-gray-700'}`}>
                        {child.student_name}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium mt-1">
                        {total} thông báo • {unread} chưa đọc
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] shadow-xl p-6 border-b-8 border-blue-100">
        <h2 className="text-xl font-black text-gray-700 mb-6">
          {isParentView && activeChild ? `📋 Thông báo của ${activeChild.student_name}` : '📋 Tất cả thông báo'}
        </h2>

        {loading ? (
          <div className="text-center py-16 opacity-30">
            <div className="text-5xl animate-spin">⏳</div>
          </div>
        ) : visibleNotifications.length === 0 ? (
          <div className="text-center py-16 opacity-30">
            <span className="text-6xl block mb-4">📭</span>
            <p className="font-black uppercase tracking-widest text-sm">
              {isParentView && activeChild ? 'Bé này chưa có thông báo nào' : 'Không có thông báo nào'}
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {visibleNotifications.map((n) => (
              <button
                key={n._id}
                onClick={() => handleClickNotif(n)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  n.is_read
                    ? 'border-gray-100 bg-gray-50 opacity-70'
                    : 'border-transparent bg-gray-50 hover:border-blue-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl flex-shrink-0 border border-gray-100">
                    {n.type === 'class_announcement' ? '📢' : n.type === 'grade' ? '📝' : n.type === 'attendance' ? '⏰' : '🔔'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-sm font-black truncate ${n.is_read ? 'text-gray-500' : 'text-gray-800'}`}>
                        {n.title}
                      </p>
                      {!n.is_read && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-400 truncate">{n.body}</p>
                    <p className="text-[10px] text-gray-300 mt-1 font-bold">{timeAgo(n.created_at)}</p>
                  </div>
                  {isParentView && n.child?.student_name && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold flex-shrink-0">
                      {n.child.student_name}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
