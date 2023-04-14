import React, { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
  IonAvatar,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import "./PackageHistoryContainer.css";
import { hasFieldName } from "../../utils/objects";
import { searchOutline } from "ionicons/icons";
import StatusIcon from "../Shared/Icons/StatusIcon";
import { timeConvertTZ } from "../../utils/date";
import { arrowDownOutline, arrowUpOutline } from "ionicons/icons";

interface Props {
  data: any[];
  columnAliases?: { [key: string]: string };
}

const DynamicTable: React.FC<Props> = ({ data, columnAliases = {} }) => {
  const [headers, setHeaders] = useState<string[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
const [sortConfig, setSortConfig] = useState<{
  key: string;
  direction: "asc" | "desc";
} | null>(null);

  const pageSize = 5;

  const getHeaderLabel = (header: string): string => {
    return columnAliases[header] ?? header;
  };

useEffect(() => {
  if (data && data.length > 0) {
    const orderedHeaders = Object.keys(columnAliases);
    const remainingHeaders = Object.keys(data[0]).filter(
      (header) => !orderedHeaders.includes(header),
    );
    const finalHeaders = [...orderedHeaders, ...remainingHeaders];
    setHeaders(finalHeaders);
  }
}, [data]);


  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    const results = tableData.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
    setSearchResults(results);
  }, [searchTerm, tableData]);

  const pageCount = Math.ceil(searchResults.length / pageSize);
  const pages = Array.from({ length: pageCount }, (_, index) => index);

  const handlePageClick = (page: number) => {
    setPageIndex(page);
  };
const handleHeaderClick = (header: string) => {
  let direction: "asc" | "desc" = "asc";
  if (sortConfig?.key === header && sortConfig.direction === "asc") {
    direction = "desc";
  }
  setSortConfig({ key: header, direction });
};
useEffect(() => {
  const sortedData = [...tableData];
  if (sortConfig) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }
  const results = sortedData.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );
  setSearchResults(results);
}, [searchTerm, tableData, sortConfig]);

const getSortingIcon = (header: string) => {
  if (sortConfig?.key === header) {
    return sortConfig.direction === "asc" ? arrowUpOutline : arrowDownOutline;
  }
  return undefined;
};


  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonIcon color="primary" icon={searchOutline} slot="start" />
            <IonInput
              placeholder="Buscar..."
              value={searchTerm}
              onIonChange={(e) => setSearchTerm(e.detail.value!)}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className="table-header"
                      onClick={() => handleHeaderClick(header)}
                    >
                      <IonLabel>{getHeaderLabel(header)}</IonLabel>
                      {getSortingIcon(header) && (
                        <IonIcon
                          className="sort-icon"
                          icon={getSortingIcon(header)}
                        />
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {searchResults
                  .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
                  .map((row, index) => (
                    <tr key={index}>
                      {headers.map((header, index) => (
                        <td key={index}>
                          <IonItem>
                            {hasFieldName(header, row) &&
                            row[header]?.includes("http") ? (
                              <IonAvatar key={index} slot="start">
                                <img src={row[header]} />
                              </IonAvatar>
                            ) : header === "status" ||
                              header == "notificationWay" ? (
                              <StatusIcon status={row[header]} />
                            ) : header === "receivedAt" ? (
                              timeConvertTZ(row[header], "America/Bogota")
                            ) : (
                              row[header]
                            )}
                          </IonItem>
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          {pages.map((page, index) => (
            <IonButton
              key={index}
              fill={pageIndex === page ? "solid" : "clear"}
              onClick={() => handlePageClick(page)}
            >
              {page + 1}
            </IonButton>
          ))}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default DynamicTable;
                           
