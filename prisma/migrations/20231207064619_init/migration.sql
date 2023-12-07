/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "student_name" TEXT NOT NULL,
    "course_name" TEXT,
    "fee" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
