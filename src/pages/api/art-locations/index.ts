import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { artLocationValidationSchema } from 'validationSchema/art-locations';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getArtLocations();
    case 'POST':
      return createArtLocation();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getArtLocations() {
    const data = await prisma.art_location
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'art_location'));
    return res.status(200).json(data);
  }

  async function createArtLocation() {
    await artLocationValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.todo_list?.length > 0) {
      const create_todo_list = body.todo_list;
      body.todo_list = {
        create: create_todo_list,
      };
    } else {
      delete body.todo_list;
    }
    const data = await prisma.art_location.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
