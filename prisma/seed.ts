import { PrismaClient, Prisma } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  // For development with self-signed certificates
  ssl: {
    rejectUnauthorized: false
  }
})

const prisma = new PrismaClient({
  adapter
})

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Brandon Argel',
    email: 'brandargel@gmail.com'
  },
  {
    name: 'Alice',
    email: 'alice@gmail.com'
  },
  {
    name: 'Bob',
    email: 'bob@gmail.com'
  }
]

export async function main() {
  for (const user of userData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
