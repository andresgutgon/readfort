import 'reflect-metadata'

import { DataSource } from 'typeorm'

import { getConfig } from './dataSource'

export default new DataSource(getConfig())
