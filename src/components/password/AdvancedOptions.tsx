import { Info } from 'lucide-react'
import { Card, Checkbox, Input, Tooltip } from '@components/ui'
import { GeneratorOptions, OnOptionChange } from '../../features/password-generator/types'

interface Props {
  options: GeneratorOptions
  onOptionChange: OnOptionChange
  onMinNumbersChange: (_val: number) => void
  onMinSpecialChange: (_val: number) => void
}

export const AdvancedOptions = ({ options, onOptionChange, onMinNumbersChange, onMinSpecialChange }: Props) => {
  return (
    <Card as="section" variant="secondary" padding="sm" className="space-y-4 border-white/5 bg-surface/30">
      <div className="flex items-center gap-2">
        <Checkbox
          label="Avoid Ambiguous Characters"
          checked={options.avoidAmbiguous}
          onChange={() => onOptionChange('avoidAmbiguous', !options.avoidAmbiguous)}
        />
        <Tooltip content="Ambiguous characters can be easily confused with others, such as 'O' (uppercase o) and '0' (zero).">
          <Info size={16} className="text-primary cursor-help hover:text-primary/80" />
        </Tooltip>
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
