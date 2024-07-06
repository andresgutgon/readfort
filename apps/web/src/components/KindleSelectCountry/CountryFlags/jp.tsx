export default function JapanFlag() {
  return (
    <svg width={24} height={24} viewBox='0 0 32 32'>
      <rect width={30} height={24} x={1} y={4} fill='#fff' rx={4} ry={4} />
      <path
        d='M27 4H5a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Zm3 20c0 1.654-1.346 3-3 3H5c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3h22c1.654 0 3 1.346 3 3v16Z'
        opacity={0.15}
      />
      <circle cx={16} cy={16} r={6} fill='#ae232f' />
      <path
        fill='#fff'
        d='M27 5H5a3 3 0 0 0-3 3v1a3 3 0 0 1 3-3h22a3 3 0 0 1 3 3V8a3 3 0 0 0-3-3Z'
        opacity={0.2}
      />
    </svg>
  )
}
