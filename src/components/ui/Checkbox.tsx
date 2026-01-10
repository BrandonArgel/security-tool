import { InputHTMLAttributes } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Checkbox = ({ label, checked, onChange, disabled, ...props }: CheckboxProps) => {
  return (
    <label
      className={`flex w-fit items-center gap-3 transition-opacity select-none ${
        disabled ? 'cursor-not-allowed opacity-30' : 'group cursor-pointer'
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
          className={`flex size-5 items-center justify-center rounded border-2 transition-all duration-200 ${checked ? 'bg-primary border-primary' : 'border-gray-400 bg-transparent group-hover:border-gray-500'} peer-focus-visible:ring-primary peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black ${disabled ? 'opacity-50' : ''} `}
        >
          <svg
            className={`h-3.5 w-3.5 transform fill-none stroke-current text-white transition-all duration-200 ${checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'} `}
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
          checked ? 'text-foreground' : 'text-text-muted group-hover:border-gray-500'
        }`}
      >
        {label}
      </span>
    </label>
  )
}
