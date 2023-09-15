import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Delete existing data
    await prisma.book.deleteMany();
    await prisma.author.deleteMany();
    await prisma.bookStore.deleteMany();

      // Reset auto-increment counters
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name="book"`;
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name="author"`;
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name="bookstore"`;
  

    // Seed data for the bookstore model
    await prisma.bookStore.create({
      data: {
        name: 'iqara books',
        location: 'toocil',
        created: new Date('2022-03-30T00:00:00.000Z'),
        updated: new Date('2022-03-30T00:00:00.000Z'),
      },
    });

    await prisma.bookStore.create({
      data: {
        name: 'bookline',
        location: 'dix jano',
        created: new Date('2022-03-30T00:00:00.000Z'),
        updated: new Date('2022-03-30T00:00:00.000Z'),
      },
    });

    await prisma.bookStore.create({
      data: {
        name: 'reader',
        location: 'boqol iyo kontonka',
        created: new Date('2022-03-30T00:00:00.000Z'),
        updated: new Date('2022-03-30T00:00:00.000Z'),
      },
    });

    // Seed data for the author model
    await prisma.author.create({
      data: {
        name: 'Abwaan Hadraawi',
        created: new Date('2022-03-30T00:00:00.000Z'),
        updated: new Date('2022-03-30T00:00:00.000Z'),
      },
    });

    await prisma.author.create({
      data: {
        name: 'James Clear',
        created: new Date('2022-03-30T00:00:00.000Z'),
        updated: new Date('2022-03-30T00:00:00.000Z'),
      },
    });

    await prisma.author.create({
      data: {
        name: 'Mohammed Qamuus',
        created: new Date('2022-03-30T00:00:00.000Z'),
        updated: new Date('2022-03-30T00:00:00.000Z'),
      },
    });

    // Seed data for the book model
    await prisma.book.create({
      data: {
        bookstoreId: 2,
        authorId: 1,
        title: 'Hawaale Waran',
        price: 10,
        image: 'http://sawir',
        created: new Date('2022-03-30T00:00:00.000Z'),
        updated: new Date('2022-03-30T00:00:00.000Z'),
      },
    });

    await prisma.book.create({
      data: {
        bookstoreId: 3,
        authorId: 2,
        title: 'Dear me',
        price: 10,
        image: 'http://sawir2',
        created: new Date('2022-03-30T00:00:00.000Z'),
        updated: new Date('2022-03-30T00:00:00.000Z'),
      },
    });

    await prisma.book.create({
      data: {
        bookstoreId: 4,
        authorId: 3,
        title: 'Atomic Habit',
        price: 10,
        image: 'http://sawir3',
        created: new Date('2022-03-30T00:00:00.000Z'),
        updated: new Date('2022-03-30T00:00:00.000Z'),
      },
    });

    console.log('Seed data created successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();