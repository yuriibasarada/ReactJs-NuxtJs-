import {NextApiRequest, NextApiResponse} from "next";

interface IdNextApiRequest extends NextApiRequest {
    id: string | number
}
export default function getById(req: NextApiRequest, res: NextApiResponse) {
    res.json({'Your Id':req.query.id })
}