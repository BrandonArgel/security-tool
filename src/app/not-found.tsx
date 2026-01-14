import { Button, Card } from '@components/ui'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Card variant="default" className="mx-auto max-w-md py-12 text-center">
      <h1 className="mb-4 text-6xl font-black text-foreground/10">404</h1>
      <h2 className="mb-4 text-xl font-bold">Tool not found</h2>
      <p className="mb-8 text-text-muted">
        The tool you are looking for does not exist or has been moved to another server.
      </p>
      <Button asChild>
        <Link href="/generator">Back to Generator</Link>
      </Button>
    </Card>
  )
}
