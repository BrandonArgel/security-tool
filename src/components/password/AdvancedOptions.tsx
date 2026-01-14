import { Info } from 'lucide-react'
import { Card, Checkbox, Tooltip } from '@components/ui'
import { GeneratorOptions, OnOptionChange } from '@/lib/password/types'

interface Props {
  options: GeneratorOptions
  onOptionChange: OnOptionChange
  onMinNumbersChange: (_val: number) => void
  onMinSpecialChange: (_val: number) => void
}

export const AdvancedOptions = ({ options, onOptionChange }: Props) => {
  return (
    <Card as="section" variant="secondary" padding="sm" className="bg-surface/30 space-y-4 border-white/5">
      <h3 className="text-text-muted text-xs font-bold tracking-[0.2em] uppercase">Advanced Options</h3>

      <div className="flex items-center gap-2">
        <Checkbox
          label="No Consecutive"
          checked={options.avoidRepeated}
          onChange={() => onOptionChange('avoidRepeated', !options.avoidRepeated)}
        />
        <Tooltip content="Consecutive characters can make passwords easier to guess, such as 'aa' or '11'.">
          <Info size={16} className="text-primary hover:text-primary/80 cursor-help" />
        </Tooltip>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          label="No Sequences"
          checked={options.avoidSequences}
          onChange={() => onOptionChange('avoidSequences', !options.avoidSequences)}
        />
        <Tooltip content="Sequences of characters can make passwords easier to guess, such as 'abc' or '123'.">
          <Info size={16} className="text-primary hover:text-primary/80 cursor-help" />
        </Tooltip>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          label="Avoid Ambiguous"
          checked={options.avoidAmbiguous}
          onChange={() => onOptionChange('avoidAmbiguous', !options.avoidAmbiguous)}
        />
        <Tooltip content="Ambiguous characters can be easily confused with others, such as 'O' (uppercase o) and '0' (zero).">
          <Info size={16} className="text-primary hover:text-primary/80 cursor-help" />
        </Tooltip>
      </div>
    </Card>
  )
}
