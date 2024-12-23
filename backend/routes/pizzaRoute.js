import express from 'express';
import { addPizza, deletePizza, fetchAllPizzas, fetchRandomPizzas, searchInPizzas, updatePizza } from '../controllers/PizzaController.js';

const router = express.Router();

router.get('/random',fetchRandomPizzas);
router.get('/search',searchInPizzas)
router.get("/all",fetchAllPizzas );
router.post("/add", addPizza);
router.put("/update/:id",updatePizza);
router.delete("/delete/:id",deletePizza );

export default router;
