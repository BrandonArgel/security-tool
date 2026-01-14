import { useMemo, useState } from 'react'
import { Card, CardHeader, CardContent, Input } from '@components/ui'
import {
  getSecurityLevelByTime,
  getSecurityLevelByScore,
  getStrengthScore,
  getTimeToCrack,
  getPasswordFeedback
} from '@/lib/password/metrics'
import { CrackTime, PasswordSuggestions, StrengthMeter } from '@components/password'
import { useDebounce } from '@/hooks'

export const ValidatorCard = () => {
  const [password, setPassword] = useState('')
  const debouncedPassword = useDebounce(password, 500)
  const score = useMemo(() => getStrengthScore(debouncedPassword), [debouncedPassword])
  const crackTime = useMemo(() => getTimeToCrack(debouncedPassword), [debouncedPassword])
  const securityLevel = useMemo(() => getSecurityLevelByTime(crackTime), [crackTime])
  const securityLevelByScore = useMemo(() => getSecurityLevelByScore(score), [score])
  const suggestions = useMemo(() => getPasswordFeedback(debouncedPassword), [debouncedPassword])

  return (
    <Card className="mx-auto w-full max-w-md" variant="outline">
      <CardHeader>
        <h2 className="text-xl font-bold">Password Validator</h2>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2">
          <Input
            type="password"
            placeholder="Enter password to validate"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="bg-surface border-border text-primary flex h-10 w-10 items-center justify-center rounded-lg border font-mono text-sm">
            {password.length}
          </div>
        </div>

        <div className="space-y-2">
          <StrengthMeter score={score} level={securityLevelByScore} />
          <PasswordSuggestions
            password={debouncedPassword}
            suggestions={suggestions}
            defaultMessage="Enter a password to see suggestions."
          />
          <CrackTime time={crackTime} level={securityLevel} />
        </div>
      </CardContent>
    </Card>
  )
}
