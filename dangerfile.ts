import { danger, message, warn } from 'danger'

const context = danger.gitlab

// Say thanks
message(
  `Thanks for creating the the MR @${context.mr.author.username} 💝\n\n /cc @yo can you please review this 🙇‍♂️`
)

// No MR is too small to include a description of why you made a change
if (context.mr.description.length < 10) {
  warn('Please include a description of your MR changes.')
}
