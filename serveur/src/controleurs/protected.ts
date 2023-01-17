import { Request, Response, NextFunction } from 'express'

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next()
    }
    else {
        res.redirect('/')
    }
}
export default authenticate