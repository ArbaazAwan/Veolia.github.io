import * as xlsx from "xlsx";

const getFileName = (name?: string) => {
    let timeSpan = new Date().toISOString();
    let sheetName = name || "ExportResult";
    let fileName = `${sheetName}-${timeSpan}`;
    return {
        sheetName,
        fileName
    };
};
export class TableUtil {
    static exportTableToExcel(tableId: string, name?: string) {
        let { sheetName, fileName } = getFileName(name);
        let targetTableElm = document.getElementById(tableId);
        let wb = xlsx.utils.table_to_book(targetTableElm, <xlsx.Table2SheetOpts>{
            sheet: sheetName
        });
        writeFile(wb, `${fileName}.xlsx`);
    }

    static exportArrayToExcel(arr: any[], name?: string) {
        let { sheetName, fileName } = getFileName(name);

        var wb = xlsx.utils.book_new();
        var ws = xlsx.utils.json_to_sheet(arr);
        xlsx.utils.book_append_sheet(wb, ws, sheetName);
        writeFile(wb, `${fileName}.xlsx`);
    }
}
function writeFile(wb: any, arg1: string) {
    throw new Error("Function not implemented.");
}

