import Link from 'next/link'
import { Button, Card } from '@/components/ui'
import { KeyRound, ShieldCheck } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col gap-8 py-10">
      <div className="space-y-4 text-center">
        <h1 className="bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-4xl font-bold text-transparent">
          Security Tool
        </h1>
        <p className="text-text-muted mx-auto max-w-md text-lg">
          Generate secure passwords and validate their strength with our security tools.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/generator" className="group">
          <Card className="group-hover:border-primary/50 group-hover:bg-surface-hover h-full p-6 transition-all duration-300">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="bg-primary/10 text-primary rounded-2xl p-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <KeyRound size={32} />
              </div>
              <div>
                <h2 className="mb-2 text-xl font-semibold text-foreground">Generator</h2>
                <p className="text-text-muted text-sm">
                  Generate strong and random passwords personalized according to your needs.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="group-hover:bg-primary group-hover:border-primary hover:bg-primary mt-2 w-full group-hover:text-white hover:text-white text-foreground hover:bg-surface-hover"
              >
                <span>Go to Generator</span>
              </Button>
            </div>
          </Card>
        </Link>

        <Link href="/validator" className="group">
          <Card className="group-hover:border-success/50 group-hover:bg-surface-hover h-full p-6 transition-all duration-300">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="bg-success/10 text-success rounded-2xl p-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h2 className="mb-2 text-xl font-semibold text-foreground">Validator</h2>
                <p className="text-text-muted text-sm">
                  Analyze the security of your passwords and receive tips to improve them.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="group-hover:bg-success group-hover:border-success hover:bg-success mt-2 w-full group-hover:text-white hover:text-white text-foreground hover:bg-surface-hover"
              >
                <span>Go to Validator</span>
              </Button>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  )
}
