import { danger, warn } from 'danger'

// No MR is too small to include a description of why you made a change
if (danger.gitlab.mr.description.length < 10) {
  warn('Please include a description of your MR changes.')
}
