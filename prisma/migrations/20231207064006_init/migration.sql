-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "student_name" TEXT NOT NULL,
    "course_name" TEXT,
    "fee" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
