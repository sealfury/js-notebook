import express from 'express'
import fs from 'fs/promises'
import path from 'path'

interface Cell {
  id: string
  content: string
  type: 'text' | 'code'
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router()
  router.use(express.json())

  const fullPath = path.join(dir, filename)

  router.get('/cells', async (req, res) => {
    try {
      // Read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' })

      res.send(JSON.parse(result))
    } catch (err) {
      // If read throws an error, inspect to see if file exists
      if (err.code === 'ENOENT') {
        // Create a file and add default cells
        // TODO: add more sensible defaults
        await fs.writeFile(fullPath, '[]', 'utf-8')
        res.send([])
      } else {
        throw err
      }
    }
  })

  router.post('/cells', async (req, res) => {
    // Take the list of cells from req obj & serialize
    const { cells }: { cells: Cell[] } = req.body

    // Write cells to file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8')

    res.send({ status: 400 })
  })

  return router
}
