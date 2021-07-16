import express from 'express'

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router()

  router.get('/cells', async (req, res) => {
    // Ensure cell storage file exists
    // If it doesn't exist, add a default cell list
    // Read the file
    // Parse a list of cells from file
    // Send list of cells back to browser
  })

  router.post('/cells', async (req, res) => {
    // Ensure the file exists
    // If not, create it
    // Take the list of cells from req obj
    // Serialize cell list
    // Write cells into file
  })

  return router
}
