'use server';
import { cookies } from 'next/headers';
import { getMongoDb } from '@/lib/db';
import { pgPool } from '@/lib/db';
import { ObjectId } from 'mongodb'; 

type ChildProfile = {
  student_id: number;
  student_name: string;
  student_avatar: string | null;
};

type NotificationQuery = Record<string, unknown>;

export async function getMyNotificationsAction(limit = 10) {
  const token = (await cookies()).get('session')?.value;
  if (!token) return { success: false, data: [] };
  
  const user = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf-8'));

  const db = await getMongoDb();
  let query: NotificationQuery = { recipient_id: user.id };
  const childMap = new Map<number, ChildProfile>();

  if (user.role === 'parent') {
    const client = await pgPool.connect();
    try {
      const childrenRes = await client.query(
        `
          SELECT
            s.student_id,
            s.name AS student_name,
            s.avatar_url AS student_avatar
          FROM parent_student ps
          JOIN student s ON ps.student_id = s.student_id
          WHERE ps.parent_id = $1
          ORDER BY s.name ASC
        `,
        [user.id]
      );

      const children = childrenRes.rows as ChildProfile[];
      children.forEach((child) => {
        childMap.set(Number(child.student_id), child);
      });

      const childIds = children.map((child) => child.student_id);
      if (childIds.length === 0) {
        return { success: true, data: [] };
      }

      query = {
        recipient_type: 'student',
        recipient_id: { $in: childIds },
      };
    } finally {
      client.release();
    }
  }

  const notifs = await db.collection('notification')
    .find(query)
    .sort({ created_at: -1 })
    .limit(limit)
    .toArray();
    
  return { 
    success: true, 
    data: notifs.map((n) => {
      const child = childMap.get(Number(n.recipient_id));
      return {
        ...n,
        _id: n._id.toString(),
        child: child ? { ...child } : null,
      };
    }) 
  };
}

export async function markAsReadAction(notifId: string) {
  try {
    const db = await getMongoDb();
    
    const result = await db.collection('notification').updateOne(
      { _id: new ObjectId(notifId) }, 
      { $set: { is_read: true } }
    );

    if (result.matchedCount > 0) {
      return { success: true };
    }
    return { success: false, message: "Không tìm thấy thông báo" };
  } catch (error) {
    console.error("Lỗi cập nhật thông báo:", error);
    return { success: false };
  }
}
