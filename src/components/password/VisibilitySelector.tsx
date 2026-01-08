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
    <div className="mt-6 border-t border-border pt-4">
      <Button
        variant="ghost"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex items-center justify-between w-full p-0 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] hover:text-white hover:bg-transparent transition-colors duration-300 active:scale-none"
      >
        <span>Display Settings</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </Button>

      <Activity mode={activityMode}>
        <div
          id={contentId}
          hidden={!isOpen}
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 max-h-40 mt-4' : 'opacity-0 max-h-0'
          }`}
        >
          <Card className="p-4 space-y-4 border-border bg-surface/50">
            <Checkbox label="Show Strength Meter" checked={showStrength} onChange={() => onToggle('strength')} />
            <Checkbox label="Show Time to Crack" checked={showCrackTime} onChange={() => onToggle('crackTime')} />
          </Card>
        </div>
      </Activity>
    </div>
  )
}
