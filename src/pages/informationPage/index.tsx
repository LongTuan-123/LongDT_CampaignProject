import { Grid, TextField } from "@mui/material";
import { Campaign, ErrorList } from "../../interface";

export interface InformationPageProps {
  data: Campaign;
  errorList: ErrorList;
  setData: React.Dispatch<React.SetStateAction<Campaign>>;
}

const InformationPage = ({
  data,
  errorList,
  setData,
}: InformationPageProps) => {
  return (
    <Grid container spacing={2} width={"100%"} padding={"8px"} margin={"auto"}>
      <TextField
        margin="dense"
        fullWidth={true}
        required
        error={errorList.informationName && !data.information.name}
        id="campaign-name"
        label="Tên chiến dịch"
        variant="standard"
        helperText={
          errorList.informationName && !data.information.name
            ? "Tên chiến dịch không hợp lệ"
            : ""
        }
        value={data?.information?.name}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            information: {
              ...prev.information,
              name: e.target.value,
            },
          }))
        }
      />
      <TextField
        margin="dense"
        fullWidth={true}
        id="description"
        label="Mô tả"
        variant="standard"
        value={data?.information?.describe}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            information: {
              ...prev.information,
              describe: e.target.value,
            },
          }))
        }
      />
    </Grid>
  );
};

export default InformationPage;
