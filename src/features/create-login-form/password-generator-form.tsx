import { Activity } from 'react'
import { useGenerator } from '@features/password-generator/hooks/useGenerator'
import { Card, CardHeader, CardContent, Button } from '@components/ui'
import {
  AdvancedOptions,
  CrackTime,
  LengthControl,
  OptionsSection,
  PasswordDisplay,
  PasswordSuggestions,
  StrengthMeter,
  VisibilitySelector
} from '@components/password'
import { useModal } from '@/components'
import { MIN_LENGTH, MAX_LENGTH } from '@/lib/password/types'

interface SavedLoginFormProps {
  onSuccess?: () => void
}

export const PasswordGeneratorForm = ({ onSuccess }: SavedLoginFormProps) => {
  const { setNewPassword } = useModal()
  const {
    password,
    length,
    options,
    displaySettings,
    score,
    crackTime,
    securityLevel,
    securityLevelByScore,
    regenerate,
    handleLengthChange,
    handleMinNumbersChange,
    handleMinSpecialChange,
    handleOptionChange,
    toggleDisplay,
    suggestions
  } = useGenerator()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setNewPassword(password)
    onSuccess?.()
  }

  return (
    <Card as="form" className="bg-background max-w-md mx-auto w-full" variant="outline">
      <CardHeader>
        <h2 className="text-xl font-bold">Generator</h2>
      </CardHeader>

      <CardContent>
        <PasswordDisplay password={password} onRegenerate={regenerate} />

        <LengthControl length={length} minLength={MIN_LENGTH} maxLength={MAX_LENGTH} onChange={handleLengthChange} />

        <StrengthMeter score={score} level={securityLevelByScore} />
        <PasswordSuggestions
          password={password}
          suggestions={suggestions}
          defaultMessage="Select some options to see suggestions."
        />
        <Activity mode={displaySettings.crackTime ? 'visible' : 'hidden'}>
          <CrackTime time={crackTime} level={securityLevel} />
        </Activity>

        <OptionsSection
          options={options}
          onChange={handleOptionChange}
          onMinNumbersChange={handleMinNumbersChange}
          onMinSpecialChange={handleMinSpecialChange}
        />

        <AdvancedOptions
          options={options}
          onOptionChange={handleOptionChange}
          onMinNumbersChange={handleMinNumbersChange}
          onMinSpecialChange={handleMinSpecialChange}
        />

        <Button type="submit" className="mt-4 w-full" onClick={handleSubmit}>
          Use this password
        </Button>
      </CardContent>
    </Card>
  )
}
