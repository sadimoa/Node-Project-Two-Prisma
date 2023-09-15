/*
  Warnings:

  - You are about to drop the column `bookStoreId` on the `Book` table. All the data in the column will be lost.
  - Added the required column `bookstoreId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bookstoreId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Book_bookstoreId_fkey" FOREIGN KEY ("bookstoreId") REFERENCES "BookStore" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("authorId", "created", "id", "image", "price", "title", "updated") SELECT "authorId", "created", "id", "image", "price", "title", "updated" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;