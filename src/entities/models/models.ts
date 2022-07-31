//KEY can only be one of T properties (valid key of T)
export type ColumnDefinitionType<T, KEY extends keyof T> = {
    key: KEY
    title: string
    sortable: boolean
    width?: number
    textInput?: boolean
    isUrl?: boolean
};

export interface ICompany  {
    display_name: string
    id: number
    name: string
}

export interface ICountry {
    installs: number
    country: string
    cost: number,
    iso: string
    revenue: number
}

export interface ICompanyPerformance {
    installs: number
    country: string
    cost: number
    iso: string
    revenue: number
}

export interface ITableItem {
    company: string
    country: string
    installs: number
    roi: number
    industryRoi: number
}