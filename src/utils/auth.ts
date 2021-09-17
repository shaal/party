import { ValidationError } from '@graphql/errors'
import crypto from 'crypto'
import { bcrypt, bcryptVerify } from 'hash-wasm'

import { prisma } from './prisma'

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
  const user = await prisma.user.findFirst({
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

  const costFactorString = user.hashedPassword.split('$')[2]

  if (!costFactorString) {
    throw new Error('Unknown password format.')
  }

  const costFactor = Number.parseInt(costFactorString, 10)
  if (costFactor !== COST_FACTOR) {
    const improvedHash = await hashPassword(password)
    await prisma.user.update({
      where: { id: user.id },
      data: { hashedPassword: improvedHash }
    })
  }

  return user
}
