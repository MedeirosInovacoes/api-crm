export class NotFoundError extends Error {
  constructor(id: any[] | any, entityName: string) {
    const idsMessage = Array.isArray(id) ? id.join(', ') : id
    super(`${entityName} Not Found using ID ${idsMessage}`)
    this.name = 'NotFoundError'
  }
}
