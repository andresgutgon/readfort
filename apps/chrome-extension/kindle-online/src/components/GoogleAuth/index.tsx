import { useState } from 'react'

import { OauthButton } from '@readfort/ui'
import api from '$base/lib/api'

export default function GoogleAuth() {
  const [loading, setLoading] = useState(false)
  const onClick = async () => {
    setLoading(true)
    api.signIn(() => {
      setLoading(false)
    })
  }
  return (
    <OauthButton
      onClick={onClick}
      isLoading={loading}
      disabled={loading}
      oauth={{ id: 'google', name: 'Google' }}
    />
  )
}
