import { or, ilike } from 'drizzle-orm';
import db from '@/db';
import { advocates } from '../schema';

const sortMapping = [
  {
    columnName: 'created_at',
    entity: advocates.createdAt,
  },
  {
    columnName: 'first_name',
    entity: advocates.firstName,
  },
];

export const getAdvocatesQuery = async (limit: number, offset: number, sort?: string, like?: string) => {
  // Where filters: https://orm.drizzle.team/docs/select#filters
  const where = like
    ? or(
        ilike(advocates.firstName, `%${like}%`),
        ilike(advocates.lastName, `%${like}%`),
        ilike(advocates.city, `%${like}%`),
      )
    : undefined;

    const mapSortToType = sortMapping.find(mapping => mapping.columnName === sort);
    const orderBy = !mapSortToType ? advocates.createdAt : mapSortToType.entity;

  return db.select().from(advocates).where(where).orderBy(orderBy).limit(limit).offset(offset);
};
