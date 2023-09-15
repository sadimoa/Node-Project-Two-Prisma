import express from "express";

import prisma from "./lib/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const authors = await prisma.author.findMany();

    if (authors) {
      res.status(200).json(authors);
    } else {
      res.status(404).json({ message: "authors not found" });
    }

  } catch (err) {
    res.status(500).json({ message: "Failed to get authors" });
  }
});


router.get("/:id", async (req, res) => {
    try{
            const author = await prisma.author.findUnique({
            where: {
              id: Number(req.params.id),
            },
          })

        if(author){
            res.status(200).json(author);
        }

        else{
            res.status(404).json({ message: "Author not found" });
        }
 
    }catch (err) {
        res.status(500).json({ message: "Failed to get author" });
      }    
})


router.post("/", async (req, res) => {
  try {
    const author = await prisma.author.create({
      data: req.body,
    });
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async  (req, res) => {
try{
    const author = await prisma.author.update({
        where: {
            id: Number(req.params.id),
          },
          data: req.body
        })
          if (author) {
            res.status(200).json(author);
          }else {
            res.status(404).json({message: 'author not found'});
          }
}catch (err) {
    res.status(500).json({ message: "can't update author" });
  }
})

router.delete('/:id', async (req, res) => {
    try{
        const author = await prisma.author.delete({
            where: {
               id: Number(req.params.id)
            }
        })

        if(author){
            res.status(200).json({message: 'author deleted successfully'})
        }else{
            res.status(404).json({message: 'can not find author'})}
        }

    catch(err){
        res.status(500).json({ message: "can't delete author" });
    }
})


export default router