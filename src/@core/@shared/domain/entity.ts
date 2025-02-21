export abstract class Entity {
  abstract get id(): number | string
  abstract toJSON(): Record<string, any>
}
