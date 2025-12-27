import { InputHTMLAttributes } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Checkbox = ({ label, checked, onChange, disabled, ...props }: CheckboxProps) => {
  return (
    <label
      className={`flex items-center w-fit gap-3 select-none transition-opacity ${
        disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer group'
      }`}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        <div
          className={`
            w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center
            ${
              checked ? 'bg-primary border-primary' : 'bg-transparent border-control-border group-hover:border-gray-400'
            }
          `}
        >
          <svg
            className={`
              w-3.5 h-3.5 text-white fill-none stroke-current
              transition-all duration-200 transform animate-check-pop-in
              ${checked ? 'animate-check-in' : 'animate-check-out hidden'}
            `}
            viewBox="0 0 24 24"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      <span
        className={`text-sm font-medium transition-colors ${
          checked ? 'text-white' : 'text-text-muted group-hover:text-gray-200'
        }`}
      >
        {label}
      </span>
    </label>
  )
}
