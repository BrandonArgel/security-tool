import { memo } from 'react'
import { Card, Checkbox, Input } from '@components/ui'
import { GeneratorOptions, OnOptionChange } from '@/lib/password/types'

interface OptionsSectionProps {
  options: GeneratorOptions
  onChange: OnOptionChange
  onMinNumbersChange: (_val: number) => void
  onMinSpecialChange: (_val: number) => void
}

const OptionsSectionImpl = ({ options, onChange, onMinNumbersChange, onMinSpecialChange }: OptionsSectionProps) => {
  const disabledNumber = !options.number
  const disabledSpecial = !options.special

  return (
    <Card as="section" variant="secondary" padding="sm" className="bg-surface/30 space-y-4 border-white/5">
      <h3 className="text-text-muted text-xs font-bold tracking-[0.2em] uppercase">Include Characters</h3>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <Checkbox label="a-z" checked={options.lower} onChange={() => onChange('lower', !options.lower)} />
        <Checkbox label="A-Z" checked={options.upper} onChange={() => onChange('upper', !options.upper)} />
        <Checkbox label="0-9" checked={options.number} onChange={() => onChange('number', !options.number)} />
        <Checkbox label="!@#$%^&*" checked={options.special} onChange={() => onChange('special', !options.special)} />
      </div>
      <div className="border-border grid grid-cols-2 gap-4 border-t pt-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="minNumbers" className="text-text-subtle text-sm">
            Min. Numbers
          </label>
          <Input
            id="minNumbers"
            type="number"
            min={0}
            max={10}
            value={disabledNumber ? 0 : options.minNumbers}
            disabled={disabledNumber}
            onChange={e => onMinNumbersChange(parseInt(e.target.value) || 0)}
            className="bg-surface text-center disabled:opacity-30"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="minSpecial" className="text-text-subtle text-sm">
            Min. Special
          </label>
          <Input
            id="minSpecial"
            type="number"
            min={0}
            max={10}
            value={disabledSpecial ? 0 : options.minSpecial}
            disabled={disabledSpecial}
            onChange={e => onMinSpecialChange(parseInt(e.target.value) || 0)}
            className="bg-surface text-center disabled:opacity-30"
          />
        </div>
      </div>
    </Card>
  )
}

export const OptionsSection = memo(OptionsSectionImpl)
