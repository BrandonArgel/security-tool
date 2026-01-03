import Link from 'next/link'
import { Button, Card } from '@/components/ui'
import { KeyRound, ShieldCheck } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col gap-8 py-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
          Security Tool
        </h1>
        <p className="text-text-muted text-lg max-w-md mx-auto">
          Generate secure passwords and validate their strength with our security tools.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/generator" className="group">
          <Card className="h-full p-6 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-surface-hover">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <KeyRound size={32} />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Generator</h2>
                <p className="text-text-muted text-sm">
                  Generate strong and random passwords personalized according to your needs.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full mt-2 group-hover:bg-primary group-hover:text-white group-hover:border-primary hover:bg-primary hover:text-white"
              >
                <span>Go to Generator</span>
              </Button>
            </div>
          </Card>
        </Link>

        <Link href="/validator" className="group">
          <Card className="h-full p-6 transition-all duration-300 group-hover:border-success/50 group-hover:bg-surface-hover">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 rounded-2xl bg-success/10 text-success transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Validator</h2>
                <p className="text-text-muted text-sm">
                  Analyze the security of your passwords and receive tips to improve them.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full mt-2 group-hover:bg-success group-hover:text-white group-hover:border-success hover:bg-success hover:text-white"
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
