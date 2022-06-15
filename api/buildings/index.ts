import { Request, Response } from 'express'
import { Building } from '../../lib/db'

export const list = async (_: Request, res: Response) => {
    res.json(await Building.findAll())
}

export const get = async (req: Request, res: Response) => {
    res.json(await Building.findByPk(req.params.buildingId))
}

export const create = async (req: Request, res: Response) =>
    res.json(await Building.create(req.body))

export const destroy = async (req: Request, res: Response) => {
    const { buildingId } = req.params
    res.json(
        await Building.destroy({
            where: {
                id: buildingId,
            },
        })
    )
}