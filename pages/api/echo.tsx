import {NextApiRequest, NextApiResponse} from "next";

interface MessageNextApiRequest extends NextApiRequest {
    query: {
        message: string
    }
}

export default function echo(req: NextApiRequest, res: NextApiResponse) {
    res.json({ message: req.query.message ?? 'Base message'})
}