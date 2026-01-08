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
  return (
    <Card as="section" variant="secondary" padding="sm" className="space-y-4 border-white/5 bg-surface/30">
      <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Include Characters</h3>
      <div className="grid grid-cols-2 gap-y-4 gap-x-6">
        <Checkbox label="a-z" checked={options.lower} onChange={() => onChange('lower', !options.lower)} />
        <Checkbox label="A-Z" checked={options.upper} onChange={() => onChange('upper', !options.upper)} />
        <Checkbox label="0-9" checked={options.number} onChange={() => onChange('number', !options.number)} />
        <Checkbox label="!@#$%^&*" checked={options.special} onChange={() => onChange('special', !options.special)} />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-700">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Min. Numbers</label>
          <Input
            type="number"
            min={0}
            max={10}
            value={options.minNumbers}
            disabled={!options.number}
            onChange={(e) => onMinNumbersChange(parseInt(e.target.value) || 0)}
            className="bg-surface text-center disabled:opacity-30"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Min. Special</label>
          <Input
            type="number"
            min={0}
            max={10}
            value={options.minSpecial}
            disabled={!options.special}
            onChange={(e) => onMinSpecialChange(parseInt(e.target.value) || 0)}
            className="bg-surface text-center disabled:opacity-30"
          />
        </div>
      </div>
    </Card>
  )
}

export const OptionsSection = memo(OptionsSectionImpl)
