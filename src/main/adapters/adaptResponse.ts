import { Response } from 'express'

export function adaptResponse(
  res: {
    status: number
    body: { message?: string; name?: string; url?: string }
  },
  response: Response,
): void {
  switch (true) {
    case res.status >= 200 && res.status <= 299:
      response.status(res.status).json(res.body)
      break
    case res.status === 302:
      response.status(res.status).redirect(res.body?.url as string)
      break
    default:
      response.status(res.status).json({
        error: {
          message: res.body?.message,
          name: res.body?.name,
        },
      })
  }
}
