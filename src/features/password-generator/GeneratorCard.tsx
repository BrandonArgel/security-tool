import { Card, CardHeader, CardContent } from '@components/ui'
import { useGenerator } from './hooks/useGenerator'
import { PasswordDisplay } from '../../components/password/PasswordDisplay'
import { LengthControl } from '../../components/password/LengthControl'
import { StrengthMeter } from '../../components/password/StrengthMeter'
import { CrackTime } from '../../components/password/CrackTime'
import { OptionsSection } from '../../components/password/OptionsSection'
import { AdvancedOptions } from '../../components/password/AdvancedOptions'
import { VisibilitySelector } from '../../components/password/VisibilitySelector'
import { HistoryLog } from '../../components/password/HistoryLog'
import { MIN_LENGTH, MAX_LENGTH } from './types'

export default function GeneratorCard() {
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
    clearHistory
  } = useGenerator()

  return (
    <Card className="max-w-md mx-auto" variant="outline">
      <CardHeader>
        <h2 className="text-xl font-bold">Generator</h2>
      </CardHeader>

      <CardContent>
        <PasswordDisplay password={password} onRegenerate={regenerate} />

        <LengthControl length={length} minLength={MIN_LENGTH} maxLength={MAX_LENGTH} onChange={handleLengthChange} />

        <div className="space-y-2">
          {displaySettings.strength && <StrengthMeter score={score} level={securityLevelByScore} />}
          {displaySettings.crackTime && <CrackTime time={crackTime} level={securityLevel} />}
        </div>

        <OptionsSection options={options} onChange={handleOptionChange} />

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
