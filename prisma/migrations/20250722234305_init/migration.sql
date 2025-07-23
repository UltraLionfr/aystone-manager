-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pseudo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerId" TEXT NOT NULL,
    "coordsX" INTEGER NOT NULL,
    "coordsY" INTEGER NOT NULL,
    "coordsZ" INTEGER NOT NULL,
    "tags" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "etat" TEXT NOT NULL DEFAULT 'En cours',
    "projet" TEXT,
    "monde" TEXT NOT NULL DEFAULT 'overworld',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Project_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_pseudo_key" ON "Player"("pseudo");
