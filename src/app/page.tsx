import Image from 'next/image'
import { Card } from '@/components/examples/Card'
import { Select } from '@/components/examples/Select'

export default function Home() {
  return (
    <>
      <main>
        <h1>Select</h1>
        <Select>
          <Select.Item label="Option 1" />
          <Select.Item label="Option 2" />
        </Select>
        <h2>Card</h2>
        <Card>
          <Card.Header title="Mi Proyecto" />
          <Card.Body>
            <p>Este es un ejemplo de componentes en espacio de nombres.</p>
            <Image
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
              alt="Logo"
              width={100}
              height={100}
            />
          </Card.Body>
        </Card>
      </main>
    </>
  )
}
