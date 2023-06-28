import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { todoListValidationSchema } from 'validationSchema/todo-lists';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.todo_list
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTodoListById();
    case 'PUT':
      return updateTodoListById();
    case 'DELETE':
      return deleteTodoListById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTodoListById() {
    const data = await prisma.todo_list.findFirst(convertQueryToPrismaUtil(req.query, 'todo_list'));
    return res.status(200).json(data);
  }

  async function updateTodoListById() {
    await todoListValidationSchema.validate(req.body);
    const data = await prisma.todo_list.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTodoListById() {
    const data = await prisma.todo_list.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
