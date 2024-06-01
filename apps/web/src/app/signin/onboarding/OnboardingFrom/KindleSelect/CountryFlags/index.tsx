import { ReactElement } from 'react'

import { KindleCountry } from '$/lib/types'

import AustraliaFlag from './au'
import BrazilFlag from './br'
import GermanyFlag from './de'
import SpainFlag from './es'
import FranceFlag from './fr'
import IndiaFlag from './in'
import ItalyFlag from './it'
import JapanFlag from './jp'
import MexicoFlag from './mx'
import UnitedKingdomFlag from './uk'
import UnitedStatesFlag from './us'

const flags: Record<KindleCountry, ReactElement> = {
  us: <UnitedStatesFlag />,
  uk: <UnitedKingdomFlag />,
  es: <SpainFlag />,
  de: <GermanyFlag />,
  mx: <MexicoFlag />,
  fr: <FranceFlag />,
  jp: <JapanFlag />,
  it: <ItalyFlag />,
  in: <IndiaFlag />,
  br: <BrazilFlag />,
  au: <AustraliaFlag />,
}

export default flags
