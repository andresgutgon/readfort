import { Select } from '@readfort/ui'
import flags from '$/app/signin/onboarding/OnboardingFrom/KindleSelect/CountryFlags'

const COUNTRIES = [
  { label: 'United States', value: 'us', icon: flags.us },
  { label: 'Germany', value: 'de', icon: flags.de },
  { label: 'Spain', value: 'es', icon: flags.es },
  { label: 'Mexico', value: 'mx', icon: flags.mx },
  { label: 'United Kingdom', value: 'uk', icon: flags.uk },
  { label: 'France', value: 'fr', icon: flags.fr },
  { label: 'Japan', value: 'jp', icon: flags.jp },
  { label: 'Italy', value: 'it', icon: flags.it },
  { label: 'India', value: 'in', icon: flags.in },
  { label: 'Brazil', value: 'br', icon: flags.br },
  { label: 'Australia', value: 'au', icon: flags.au },
]

export default function KindleSelect({
  selected,
  errors,
}: {
  selected: string | undefined
  errors: string[] | undefined
}) {
  return (
    <Select
      autoFocus={!selected}
      name='kindle'
      defaultValue={selected}
      options={COUNTRIES}
      errors={errors}
      description='The country where you have your Kindle account'
      placeholder='Select your Kindle country'
    />
  )
}
