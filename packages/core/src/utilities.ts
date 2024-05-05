import isNil from 'lodash/isNil'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'

export function compact(obj: Record<string, unknown>) {
  return omitBy(omitBy(obj, isNil), isUndefined)
}
