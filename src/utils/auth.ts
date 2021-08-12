import crypto from 'crypto'
import { bcrypt, bcryptVerify } from 'hash-wasm'
import { ValidationError } from 'src/graphql/errors'

import { db } from './prisma'

const COST_FACTOR = 11

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16)

  const key = await bcrypt({
    password,
    salt,
    costFactor: COST_FACTOR,
    outputType: 'encoded'
  })

  return key
}

export function verifyPassword(
  hashedPassword: string,
  password: string
): Promise<boolean> {
  return bcryptVerify({
    password,
    hash: hashedPassword
  })
}

export async function authenticateUser(email: string, password: string) {
  const user = await db.user.findFirst({
    where: {
      email: {
        equals: email
      }
    }
  })

  if (!user || !user.hashedPassword) {
    throw new ValidationError('Email not found', {
      email: 'Email not found.'
    })
  }

  if (!(await verifyPassword(user.hashedPassword, password))) {
    throw new ValidationError('Invalid password.', {
      password: 'Password is incorrect.'
    })
  }

  const [, _algo, costFactorString] = user.hashedPassword.split('$')

  if (!costFactorString) {
    throw new Error('Unknown password format.')
  }

  const costFactor = parseInt(costFactorString, 10)
  if (costFactor !== COST_FACTOR) {
    const improvedHash = await hashPassword(password)
    await db.user.update({
      where: { id: user.id },
      data: { hashedPassword: improvedHash }
    })
  }

  return user
}
