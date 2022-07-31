import { ColumnDefinitionType, ITableItem } from "../entities/models/models";

export const dataReportsTableColumns: ColumnDefinitionType<ITableItem, keyof ITableItem>[] = [
    {
        key: "company",
        title: "Company",
        sortable: true,
        textInput: true
    },
    {
        key: "country",
        title: "Country",
        sortable: true,
        textInput: true
    },
    {
        key: "installs",
        title: "Installs",
        sortable: true,
        textInput: true
    },
    {
        key: "roi",
        title: "ROI",
        sortable: true,
        textInput: true
    },
    {
        key: "industryRoi",
        title: "Indusrty ROI",
        sortable: true,
        textInput: true
    }
]

