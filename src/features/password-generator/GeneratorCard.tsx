import { Activity } from 'react'
import { useGenerator } from './hooks/useGenerator'
import { Card, CardHeader, CardContent } from '@components/ui'
import {
  AdvancedOptions,
  CrackTime,
  HistoryLog,
  LengthControl,
  OptionsSection,
  PasswordDisplay,
  PasswordSuggestions,
  StrengthMeter,
  VisibilitySelector
} from '@components/password'
import { MIN_LENGTH, MAX_LENGTH } from '@/lib/password/types'

export const GeneratorCard = () => {
  const {
    password,
    history,
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
    clearHistory,
    suggestions
  } = useGenerator()

  return (
    <Card className="max-w-md mx-auto w-full" variant="outline">
      <CardHeader>
        <h2 className="text-xl font-bold">Generator</h2>
      </CardHeader>

      <CardContent>
        <PasswordDisplay password={password} onRegenerate={regenerate} />

        <LengthControl length={length} minLength={MIN_LENGTH} maxLength={MAX_LENGTH} onChange={handleLengthChange} />

        <Activity mode={displaySettings.strength ? 'visible' : 'hidden'}>
          <StrengthMeter score={score} level={securityLevelByScore} />
          <PasswordSuggestions
            password={password}
            suggestions={suggestions}
            defaultMessage="Select some options to see suggestions."
          />
        </Activity>
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

        <VisibilitySelector
          showStrength={displaySettings.strength}
          showCrackTime={displaySettings.crackTime}
          onToggle={toggleDisplay}
        />

        <HistoryLog history={history} onClear={clearHistory} />
      </CardContent>
    </Card>
  )
}
