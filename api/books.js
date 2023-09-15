import express from "express";

import prisma from "./lib/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await prisma.book.findMany();

    if (books) {
      res.status(200).json(books);
    } else {
      res.status(404).json({ message: "books not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to get books" });
  }
});

router.get('/:id', async (req, res) => {
    try{
        const book = await prisma.book.findUnique({
            where: { 
                id: Number(req.params.id)
            }
        })
        
        if(book){
            res.status(200).json(book)
        }
        else{
            res.status(404).json({ message: 'book not found'})
        }
    }catch(err){
        res.status(500).json({ message: "can't found book" });
    }
})


router.post('/', async (req, res) => {
    try{
        const book = await prisma.book.create({
            data: req.body,
        })
        res.status(201).json(book);

    }catch(err){
        res.status(500).json({ message: "can't add book" });
    }
})



router.put('/:id', async (req, res) => {
    try{
        const book = await prisma.book.update({
            where: {
                id: Number(req.params.id)
            },
          data: req.body,
        })
        if(book){
            res.status(201).json(book);
        }else{
            res.status(404).json({message: 'book not found'})
        }
    }catch(err){
        res.status(500).json({ message: "can't update book" });
    }
})


router.delete('/:id', async (req, res) => {
    try{
        const book = await prisma.book.delete({
            where: {
                id: Number(req.params.id)
            },
        })
        if(book){
            res.status(201).json({message: 'book deleted successfully'});
        }else{
            res.status(404).json({message: 'book not deleted yet'})
        }
    }catch(err){
        res.status(500).json({ message: "can't delete book" });
    }
})



export default router