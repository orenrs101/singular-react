import './TableBody.scss';
import { ColumnDefinitionType } from "../../entities/models/models";
import React, { memo } from "react";
import TableRow from "./TableRow";

const TableBody = <T, KEY extends keyof T>({ columns, data }: ITableRowsProps<T, KEY>) => {

    const rows = data.map((row:T, idx1: number) => {
        return (
            // <TableRow row={row} columns={columns} key={idx1} /> //- if do so implement context to prevent prop drilling
            <tr className='table-body-row' key={`row-${idx1}`}>
                {columns.map((column: ColumnDefinitionType<T, KEY>, idx2: number) => {
                    //If value is missing (but not 0 number)
                    const cellData = (row[column.key] || typeof row[column.key] === "number") ? (row[column.key]) : "----" ;

                    return (
                        <td key={`cell-${idx2}`}>
                            {/*@ts-ignore*/}
                            {(column.isUrl === true) ? <a href={cellData} title={cellData} target="_blank">{cellData} </a> : cellData}
                        </td>
                    )}
                )}
            </tr>
        );
    });

    return <tbody className="table-body">{rows}</tbody>;
};

export default TableBody;
// export default memo(TableBody);

export interface ITableRowsProps<T, KEY extends keyof T> {
    columns: ColumnDefinitionType<T, KEY>[];
    data: T[];
}