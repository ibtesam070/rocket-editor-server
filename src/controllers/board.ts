import { Request, Response } from "express";
import Board, { IBoard } from "../models/board";

export const createBoard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;
    const board: IBoard = new Board({ name });
    await board.save();
    res.status(201).json({ id: board._id });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const board = await Board.findById(id);
    if (!board) {
      res.status(404).json({ error: "Board not found" });
      return;
    }
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
