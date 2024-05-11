import { Session } from 'next-auth'

export default function getUserInfoFromSession(session: Session | null) {
  if (!session || !session.user) {
    return { name: 'Unknown', initials: 'X', email: 'unknown', image: null }
  }

  const { name, email, image } = session.user

  return {
    name: name ?? 'Unknown',
    initials: name ?? 'X',
    email,
    image,
  }
}
