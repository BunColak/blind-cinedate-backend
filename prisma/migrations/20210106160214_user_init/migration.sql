-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "likedMovies" INTEGER[],
    "dislikedMovies" INTEGER[],

    PRIMARY KEY ("id")
);
