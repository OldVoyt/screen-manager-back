export type StorageModel = {
  StorageCategory: StorageCategory[]
}

export type StorageCategory = {
  Id: string
  Name: string
  StorageItems: StorageItem[]
}

export type StorageItem = {
  Name: string
  Type: string
  Format?: string
  Resolution?: string
  Id: string
  Active?: boolean
  Url: string
  Duration: number
}
