import express from "express";

import prisma from "./lib/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const bookStores = await prisma.bookStore.findMany();

    if (bookStores) {
      res.status(200).json(bookStores);
    } else {
      res.status(404).json({ message: "bookStores not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to get bookStores" });
  }
});

router.get('/:id', async (req, res) => {
    try{
        const bookStore = await prisma.bookStore.findUnique({
            where: { 
                id: Number(req.params.id)
            }
        })
        
        if(bookStore){
            res.status(200).json(bookStore)
        }
        else{
            res.status(404).json({ message: 'BookStore not found'})
        }
    }catch(err){
        res.status(500).json({ message: "can't found bookstore" });
    }
})


router.post('/', async (req, res) => {
    try{
        const bookStore = await prisma.bookStore.create({
            data: req.body,
        })


        
        res.status(201).json(bookStore);

    }catch(err){
        res.status(500).json({ message: "can't add bookstore" });
    }
})



router.put('/:id', async (req, res) => {
    try{
        const bookStore = await prisma.bookStore.update({
            where: {
                id: Number(req.params.id)
            },
          data: req.body,
        })
         
        if(bookStore){
            res.status(201).json(bookStore);
        }else{
            res.status(404).json({message: 'Bookstore not found'})
        }

    }catch(err){
        res.status(500).json({ message: "can't update bookstore" });
    }
})


router.delete('/:id', async (req, res) => {
    try{
        const bookStore = await prisma.bookStore.delete({
            where: {
                id: Number(req.params.id)
            },
        })

        if(bookStore){
            res.status(201).json({message: 'bookstore deleted successfully'});
        }else{
            res.status(404).json({message: 'Bookstore not deleted yet'})
        }

    }catch(err){
        res.status(500).json({ message: "can't delete bookstore" });
    }
})



export default router