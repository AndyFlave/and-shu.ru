export {}

declare global {
  interface YmFunction {
    (counterId: number, event: string, ...args: unknown[]): void
    a?: unknown[]
    l?: number
  }

  interface Window {
    ym?: YmFunction
  }
}
