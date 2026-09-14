const BASE_URL = 'http://localhost:7070/api'

export interface ServiceListItem {
  id: number
  name: string
  price: number
}

export interface ServiceDetails extends ServiceListItem {
  content: string
}

class HttpError extends Error {
  status: number

  constructor(status: number, serverMessage: string) {
    super(serverMessage)
    this.name = 'HttpError'
    this.status = status
  }
}

async function readBody(res: Response): Promise<string> {
  try {
    const text = await res.text()
    if (!text) return ''
    try {
      const data = JSON.parse(text) as { message?: string; error?: string }
      return data.message ?? data.error ?? text
    } catch {
      return text
    }
  } catch {
    return ''
  }
}

function humanizeError(status: number, serverMessage: string): string {
  if (status === 404) return 'Услуга не найдена. Возможно, она была удалена из каталога.'
  if (status === 500) return 'Ошибка на сервере. Попробуйте повторить запрос через несколько секунд.'
  if (status >= 500) return `Сервер временно недоступен (${status}). Попробуйте повторить запрос.`
  if (status >= 400) return `Запрос отклонён (${status}). ${serverMessage}`.trim()
  return serverMessage || `Неожиданный ответ сервера (${status}).`
}

async function request<T>(url: string): Promise<T> {
  let res: Response
  try {
    res = await fetch(url)
  } catch {
    throw new Error('Не удалось соединиться с сервером. Проверьте, запущен ли бэкенд на порту 7070.')
  }

  if (!res.ok) {
    const body = await readBody(res)
    throw new HttpError(res.status, humanizeError(res.status, body))
  }

  return (await res.json()) as T
}

export const servicesAPI = {
  fetchList: () => request<ServiceListItem[]>(`${BASE_URL}/services`),
  fetchDetails: (id: number) => request<ServiceDetails>(`${BASE_URL}/services/${id}`),
}