import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";

export default class UserController {
  private static readonly _service = new UserService();

  public async findOne(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await UserController._service.findOne(parseInt(req.params.id));
        return res.json({ user });
    } catch (error) {
        next(error);
    }
  }

  public async findAll(req: Request, res: Response) {
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 5;
    const users = await UserController._service.findAll(pageSize, page, limit);
    return res.json({ users });
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserController._service.create(req.body);
      return res.json({ user });
    } catch (error) {
      next(error);
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserController._service.update(parseInt(req.params.id),req.body);
      return res.json({ user });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await UserController._service.delete(parseInt(req.params.id));
      return res.json({ status: "ok", deleted });
    } catch (error) {
      next(error);
    }
  }
}
