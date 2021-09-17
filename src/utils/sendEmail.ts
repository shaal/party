import nodemailer, { SentMessageInfo } from 'nodemailer'

import { db } from './prisma'

interface SendEmailInput {
  receiverId: string
  subject: string
  text: string
}

export const sendEmail = async (
  input: SendEmailInput
): Promise<string | SentMessageInfo> => {
  const receiver = await db.user.findUnique({
    where: { id: input.receiverId },
    select: { email: true }
  })

  const transport = {
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  }

  new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === `development`) {
      console.log()
      console.log(`To: ${receiver?.email}`)
      console.log(`Subject: ${input.subject}`)
      console.log()
      console.log(input.text)
      console.log()
      return
    }

    if (!receiver?.email || !input.subject || !input.text) {
      return reject('Missing required elements to send email.')
    }

    nodemailer.createTransport(transport).sendMail(
      {
        from: `Devparty ${process.env.MAIL_FROM_ADDRESS}`,
        to: receiver?.email,
        subject: input?.subject,
        text: input?.text,
        html: input?.text
      },
      (error, info) => {
        if (error) {
          return reject(error.message)
        }
        return resolve(info)
      }
    )
  })
}
