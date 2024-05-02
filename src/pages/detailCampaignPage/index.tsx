import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { GridCheckCircleIcon } from "@mui/x-data-grid";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import { Campaign, ErrorList, SubCampaign } from "../../interface";
import AdsTable from "../../components/table";
import { generateUniqueId } from "../../utils";

export interface DetailCampaignPageProps {
  data: Campaign;
  errorList: ErrorList;
  setData: React.Dispatch<React.SetStateAction<Campaign>>;
}

const DetailCampaignPage = ({
  data,
  errorList,
  setData,
}: DetailCampaignPageProps) => {
  const [currentSubCampaignIndex, setCurrentSubCampaignIndex] =
    useState<number>(0);

  const handleAddSubCampaign = () => {
    const subCampaignQuantity = data.subCampaigns.length;
    const newSubCampaign = {
      name: `Chiến dịch con ${subCampaignQuantity + 1}`,
      status: true,
      ads: [{ adsName: "Quảng cáo 1", quantity: 0, id: generateUniqueId() }],
      id: generateUniqueId(),
    };

    setData((prev) => ({
      ...prev,
      subCampaigns: [...prev.subCampaigns, newSubCampaign],
    }));
  };

  const handleChangeSubCampaignName = (value: string) => {
    const listSubCampaign = [...data.subCampaigns];
    listSubCampaign[currentSubCampaignIndex].name = value;
    setData((prev) => ({
      ...prev,
      subCampaigns: listSubCampaign,
    }));
  };

  const handleChangeSubCampaignStatus = (value: boolean) => {
    const listSubCampaign = [...data.subCampaigns];
    listSubCampaign[currentSubCampaignIndex].status = value;
    setData((prev) => ({
      ...prev,
      subCampaigns: listSubCampaign,
    }));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Button onClick={handleAddSubCampaign}>
          <AddCircleIcon width={48} fontSize="inherit" color="primary" />
        </Button>
        <Box
          padding={"12px"}
          width={"100%"}
          sx={{
            display: "flex",
            overflowX: "auto",
            "& > :not(style)": {
              m: 1,
              width: 210,
              height: 120,
            },
          }}
        >
          {data.subCampaigns.map((item: SubCampaign, index: number) => {
            const totalAds = item.ads.reduce((acc, cur) => {
              return acc + cur.quantity;
            }, 0);

            return (
              <Paper>
                <Card
                  onClick={() => {
                    setCurrentSubCampaignIndex(index);
                  }}
                  variant="outlined"
                  sx={{
                    minWidth: "210px",
                    height: "100%",
                    border:
                      currentSubCampaignIndex === index
                        ? "2px solid #2196F3"
                        : "",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: errorList.subCampaignsList.includes(item.id)
                          ? "red"
                          : "",
                      }}
                    >
                      {item.name}
                      <GridCheckCircleIcon
                        sx={{
                          width: "12px",
                          height: "12px",
                          fill: item.status ? "#339933" : "##8D8D8D",
                        }}
                      />
                    </Typography>
                    <Typography variant="body2">
                      Số lượng quảng cáo : {totalAds}
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            );
          })}
        </Box>
      </Box>
      <Box display={"flex"} padding={"8px"} height={"72px"}>
        <TextField
          fullWidth={true}
          id="description"
          label="Tên chiến dịch con"
          variant="standard"
          helperText="Incorrect entry."
          value={data.subCampaigns[currentSubCampaignIndex].name}
          placeholder="Chiến dịch con 1"
          sx={{ flex: 6 }}
          onChange={(e) => handleChangeSubCampaignName(e.target.value)}
        />
        <Box
          sx={{ flex: 3 }}
          display={"flex"}
          justifyContent={"center"}
          margin={"auto"}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() =>
                    handleChangeSubCampaignStatus(
                      !data.subCampaigns[currentSubCampaignIndex].status
                    )
                  }
                  checked={data.subCampaigns[currentSubCampaignIndex].status}
                />
              }
              label="Đang hoạt động"
            />
          </FormGroup>
        </Box>
      </Box>
      <Box>
        <Box display={"flex"} padding={"16px"} marginTop={"16px"}>
          <AdsTable
            data={data}
            errorList={errorList}
            currentSubCampaignIndex={currentSubCampaignIndex}
            setData={setData}
          />
        </Box>
        <Divider />
      </Box>
    </Box>
  );
};

export default DetailCampaignPage;
