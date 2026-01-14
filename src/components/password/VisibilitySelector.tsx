import { ChevronDown } from 'lucide-react'
import { Activity, useId } from 'react'
import { Button, Card, Checkbox } from '@components/ui'
import { type SettingType } from '@/lib/password/types'
import { useActivityMode } from '@/hooks'

interface VisibilitySelectorProps {
  showStrength: boolean
  showCrackTime: boolean
  onToggle: (_key: SettingType) => void
}

export const VisibilitySelector = ({ showStrength, showCrackTime, onToggle }: VisibilitySelectorProps) => {
  const [activityMode, toggle, isOpen] = useActivityMode(false)
  const contentId = useId()

  return (
    <div className="border-border mt-6 border-t pt-4">
      <Button
        variant="ghost"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="text-text-muted flex w-full items-center justify-between p-0 text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-transparent hover:text-foreground active:scale-none"
      >
        <span>Display Settings</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </Button>

      <Activity mode={activityMode}>
        <div
          id={contentId}
          hidden={!isOpen}
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'mt-4 max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <Card className="border-border bg-surface/50 space-y-4 p-4">
            <Checkbox label="Show Strength Meter" checked={showStrength} onChange={() => onToggle('strength')} />
            <Checkbox label="Show Time to Crack" checked={showCrackTime} onChange={() => onToggle('crackTime')} />
          </Card>
        </div>
      </Activity>
    </div>
  )
}
