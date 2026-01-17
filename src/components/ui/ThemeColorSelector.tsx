'use client'

import { useThemeColor, ThemeColor } from '@/hooks/useThemeColor'
import { ColorRadioGroup, type ColorOption } from '@/components/ui/ColorRadioGroup'

const themeOptions: ColorOption[] = [
  { value: 'blue', label: 'Blue', colorClass: 'bg-blue-500' },
  { value: 'green', label: 'Green', colorClass: 'bg-green-500' },
  { value: 'violet', label: 'Violet', colorClass: 'bg-violet-500' },
  { value: 'orange', label: 'Orange', colorClass: 'bg-orange-500' },
  { value: 'rose', label: 'Rose', colorClass: 'bg-rose-500' },
  { value: 'yellow', label: 'Yellow', colorClass: 'bg-yellow-500' }
]

export function ThemeColorSelector() {
  const { color, setColor } = useThemeColor()

  console.log({ color })

  return (
    <div className="bg-card max-w-md space-y-6 rounded-lg p-8">
      <div>
        <h3 className="text-lg font-medium">Accent Color</h3>
        <p className="text-muted-foreground text-sm">Select the main interface color.</p>
      </div>

      <ColorRadioGroup
        options={themeOptions}
        defaultValue={color}
        onValueChange={(value: ThemeColor) => {
          setColor(value)
        }}
      />
    </div>
  )
}
