import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const main = async () => {
  const user = await prisma
  if (!user) {
    const userId = await prisma.user.create({
      data: {
        username: "test1",
        password: "1234",
        userDetails: "hello",
      },
      select: {
        id: true,
      },
    })
    console.log("userId", userId)
    await prisma.user.create({
      data: {
        username: "test2",
        password: "1234",
        userDetails: "hello2",
        likedTo: { connect: userId },
        dislikedBy: { connect: userId },
      },
      select: {
        id: true,
      },
    })
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
