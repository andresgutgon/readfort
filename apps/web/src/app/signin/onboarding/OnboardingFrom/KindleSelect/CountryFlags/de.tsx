export default function MexicoFlag() {
  return (
    <svg width={24} height={24} viewBox='0 0 32 32'>
      <path fill='#cc2b1d' d='M1 11h30v10H1z' />
      <path d='M5 4h22c2.208 0 4 1.792 4 4v4H1V8c0-2.208 1.792-4 4-4Z' />
      <path
        fill='#f8d147'
        d='M27 28H5c-2.208 0-4-1.792-4-4v-4h30v4c0 2.208-1.792 4-4 4Z'
      />
      <path
        d='M27 4H5a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Zm3 20c0 1.654-1.346 3-3 3H5c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3h22c1.654 0 3 1.346 3 3v16Z'
        opacity={0.15}
      />
      <path
        fill='#fff'
        d='M27 5H5a3 3 0 0 0-3 3v1a3 3 0 0 1 3-3h22a3 3 0 0 1 3 3V8a3 3 0 0 0-3-3Z'
        opacity={0.2}
      />
    </svg>
  )
}
