import { LogActionType } from '@prisma/client'
import { db } from '@utils/prisma'

/**
 * Creates a log for the action performed by the user
 * @param userId - Current user id
 * @param entityId - Entity id where the action is going to perform
 * @param action - Type of the action
 */
export const createLog = (
  userId: string,
  entityId: string,
  action: LogActionType
): void => {
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
