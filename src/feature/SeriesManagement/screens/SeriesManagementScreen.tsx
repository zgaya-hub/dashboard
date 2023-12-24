// import Button from "@/components/Button";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { getGridData } from "../mock";
import { NoRecordFoundIllustration } from "@/assets/Illestrations";
import DataGridPro from "@/components/DataGridPro/DataGridPro";
// import { useDemoData } from '@mui/x-data-grid-generator';

const SeriesManagementScreen = () => {
  // const { data, loading } = useDemoData({
  // dataSet: "Employee",
  // rowLength: 1000,
  // treeData: { maxDepth: 2, groupingField: "name", averageChildren: 200 },
  // });

  const columns = [
    { field: "id", headerName: "ID", type: "string", width: 300 },
    { field: "name", headerName: "Name", type: "string", width: 300 },
    { field: "email", headerName: "Email", type: "string", width: 300 },
    { field: "address", headerName: "Address", type: "string", width: 300 },
    { field: "phone", headerName: "Phone", type: "string", width: 300 },
    { field: "company", headerName: "Company", type: "string", width: 300 },
  ];
  // id: randUuid,
  //     name: randFullName,
  //     email: randEmail,
  //     address: randAddress,
  //     phone: randNumber,
  //     company: randCompanyName,

  return (
    <Page>
      <DataGridPro /* loading={loading} {...data} */ columns={columns} rows={[]}  />
    </Page>
  );
};

export default SeriesManagementScreen;
