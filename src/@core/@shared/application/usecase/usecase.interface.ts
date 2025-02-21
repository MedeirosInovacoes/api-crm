export default interface UseCaseInterface<Input, Output> {
  execute(input: Input): Promise<Output> | Promise<void> | Output | void
}
