-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(255) NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "userDetails" TEXT NOT NULL DEFAULT '',
    "profileUrl" TEXT,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_likedUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_dislikedUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_likedUsers_AB_unique" ON "_likedUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_likedUsers_B_index" ON "_likedUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_dislikedUsers_AB_unique" ON "_dislikedUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_dislikedUsers_B_index" ON "_dislikedUsers"("B");

-- AddForeignKey
ALTER TABLE "_likedUsers" ADD CONSTRAINT "_likedUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedUsers" ADD CONSTRAINT "_likedUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dislikedUsers" ADD CONSTRAINT "_dislikedUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dislikedUsers" ADD CONSTRAINT "_dislikedUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
