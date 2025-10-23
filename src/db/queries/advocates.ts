import { or, ilike } from 'drizzle-orm';
import db from '@/db';
import { advocates } from '../schema';

export const getAdvocatesQuery = async (limit: number, offset: number, page?: number, like?: string) => {
  // Where filters: https://orm.drizzle.team/docs/select#filters
  const where = like
    ? or(
        ilike(advocates.firstName, `%${like}%`),
        ilike(advocates.lastName, `%${like}%`),
        ilike(advocates.city, `%${like}%`),
      )
    : undefined;

  return db.select().from(advocates).where(where).orderBy(advocates.createdAt).limit(limit).offset(offset);
};
