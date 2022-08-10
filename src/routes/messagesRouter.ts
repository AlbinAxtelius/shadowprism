import { validateInput } from "@app/middleware/validateInput"
import { Message } from "@app/models/Message"
import prisma from "@app/prisma/prisma"
import { Request, Response, Router } from "express"
import z from "zod"

export const messagesRouter = Router()

messagesRouter.get("/", async (req, res) => {
  const messages = await prisma.message.findMany()

  res.send(messages)
})

const postMessageBodySchema = z.object({
  text: z.string(),
})

type MessageCreateInput = z.infer<typeof postMessageBodySchema>

messagesRouter.post(
  "/",
  validateInput(
    z.object({
      body: postMessageBodySchema,
    })
  ),
  async (
    req: Request<never, Message, MessageCreateInput>,
    res: Response<Message>
  ) => {
    const { body } = req

    const message = await prisma.message.create({
      data: {
        content: body.text,
      },
    })

    res.send(message)
  }
)
