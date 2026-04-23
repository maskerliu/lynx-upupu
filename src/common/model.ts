
export interface BizResp<T> {
  code: number
  data: T
}


export interface ActivityRow {
  height: number
  cols: ActivityCol[]
}

export interface ActivityCol {
  width: number
  items: Activity[]
}

export interface Activity {
  id: string
  title: string
  desc: string
  image: string
  schema: string
  type: ActivityCardType
  width?: number
  height?: number
}

export enum ActivityCardType {
  C4_4 = '4*4',
  C4_2 = '4*2',
  C4_1 = '4*1',
  C2_4 = '2*4',
  C2_1 = '2*1',
  C1_4 = '1*4',
  C2_2 = '2*2',
  C1_2 = '1*2',
}

export interface Category {
  name: string
  type: string
}

export interface Post {
  id: string
  title: string
  image?: string
  schema?: string
  snap?: string
  content?: string
  category?: string
  date?: string
  tag?: string[]
}