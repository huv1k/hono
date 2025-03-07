import type { HonoRequest } from '../request.ts'

export type BodyData = Record<string, string | File>

export const parseBody = async <T extends BodyData = BodyData>(
  request: HonoRequest | Request
): Promise<T> => {
  let body: BodyData = {}
  const contentType = request.headers.get('Content-Type')

  if (
    contentType &&
    (contentType.startsWith('multipart/form-data') ||
      contentType.startsWith('application/x-www-form-urlencoded'))
  ) {
    const formData = await request.formData()
    if (formData) {
      const form: BodyData = {}
      formData.forEach((value, key) => {
        form[key] = value
      })
      body = form
    }
  }
  return body as T
}
