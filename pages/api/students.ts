import type { NextApiRequest, NextApiResponse } from 'next'
import prisma  from '../../lib/db'
import { collection } from '../../data/collection'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let result = await prisma.student.findMany()

  // load dummy item into prisma database if database is empty
  if (!result.length) {
    collection.forEach(async (item) => {
      const create = await prisma.student.create({
        data: {
          name: item.name,
          age: item.age,
          gender: item.gender,
          group: item.group
        }
      })
    })
  } else result = await prisma.student.findMany()
  

  return res.status(200).json({ success: true, data: result })
}
