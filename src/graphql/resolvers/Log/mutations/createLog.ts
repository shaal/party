import { LogActionType } from '@prisma/client'
import { db } from '@utils/prisma'

export const createLog = async (
  userId: any,
  entityId: any,
  action: LogActionType
) => {
  new Promise((resolve, reject) => {
    db.log
      .create({
        data: {
          user: { connect: { id: userId } },
          entityId,
          action
        }
      })
      .then((value) => resolve(value))
      .catch((error) => reject(error))
  })
}
