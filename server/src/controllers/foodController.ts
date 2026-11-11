import {Request, Response} from 'express';
import {fetchFoodsByMenuId} from '../services/foodService';

export async function getFoodsByMenuId(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            error: 'Invalid request, must input a number greater than 0'
        });
    }

    const foods = await fetchFoodsByMenuId(id);
    return res.status(200).json({
        success: true,
        data: foods
    });
    
}