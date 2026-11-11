import {Request, Response} from 'express';
import {fetchMenusByDiningLocationId} from '../services/menuService';

export async function getMenusByDiningLocationId(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            error: 'Invalid request, must input a number greater than 0'
        });
    }
    //No need to check if menus is null or undefined, because the service will return an empty array if no menus are found
    const menus = await fetchMenusByDiningLocationId(id);
    return res.status(200).json({
        success: true,
        data: menus
    });
}