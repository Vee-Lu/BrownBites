import {Request, Response} from 'express';
import { fetchAllDiningLocations, fetchDiningLocationById } from '../services/diningLocationService';

export async function getDiningLocations(req: Request, res: Response) {
    const diningLocations = await fetchAllDiningLocations();

    return res.status(200).json({
        success: true,
        data: diningLocations
    });
}

export async function getDiningLocationById(req: Request, res: Response) {
    //Check is input is NaN, if is true then send a 400 error (invalid request)
    const id = Number(req.params.id)
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            error: 'Invalid request, must input a number greater than 0'
        });
    }

    const diningLocation = await fetchDiningLocationById(id);

    //Return a 404 error if dining location is not found 
    if (!diningLocation) {
        return res.status(404).json({
            success: false,
            error: 'Not Found. No dining location exists'
        });
    }

    //Return a success status if found
    return res.status(200).json({
        success: true,
        data: diningLocation
    });
}