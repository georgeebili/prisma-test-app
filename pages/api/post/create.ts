import type { NextApiRequest, NextApiResponse } from 'next'
import prisma  from '../../../lib/db'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {name, age, group, gender} = req.body
  const result = await prisma.student.create(
    {
        data: {
            name: name,
            age: age,
            group: group,
            gender: gender,
        }
    }
  )

  return res.status(200).json({ success: true })
}