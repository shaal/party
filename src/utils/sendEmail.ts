import nodemailer from 'nodemailer'

const MAIL_FROM = process.env.MAIL_FROM_ADDRESS
const MAIL_HOST = process.env.MAIL_HOST
const MAIL_USERNAME = process.env.MAIL_USERNAME
const MAIL_PASSWORD = process.env.MAIL_PASSWORD

interface SendEmailInput {
  to: string
  subject: string
  text: string
}

export const sendEmail = async (input: SendEmailInput) => {
  if (process.env.NODE_ENV === `development`) {
    console.log()
    console.log(`To: ${input.to}`)
    console.log(`Subject: ${input.subject}`)
    console.log()
    console.log(input.text)
    console.log()
    return
  }

  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD
    }
  })

  return await transporter.sendMail({
    from: `"Devparty" ${MAIL_FROM}`,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.text
  })
}
