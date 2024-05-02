import React, { useState } from "react";
import { Box, Button, Grid, Tab, Tabs } from "@mui/material";
import Divider from "@mui/material/Divider";
import InformationPage from "./informationPage";
import DetailCampaignPage from "./detailCampaignPage";
import { Campaign, ErrorList } from "../interface";
import { generateUniqueId } from "../utils";

const CampaignPage = () => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [data, setData] = useState<Campaign>({
    information: {
      name: "",
      describe: "",
    },
    subCampaigns: [
      {
        name: "Chiến dịch con 1",
        status: true,
        ads: [{ adsName: "Quảng cáo 1", quantity: 0, id: generateUniqueId() }],
        id: generateUniqueId(),
      },
    ],
  });
  const [errorList, setErrorList] = useState<ErrorList>({
    informationName: false,
    subCampaignsList: [],
    adsList: [],
  });

  const handleChangeTab = (__event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleValidation = () => {
    const subCampaignsList: string[] = [];
    const adsList: string[] = [];

    if (data.information.name === "") {
      setErrorList((prev) => ({
        ...prev,
        informationName: true,
      }));
    }

    data.subCampaigns.forEach((subCampaign) => {
      if (subCampaign.name === "" || subCampaign.ads.length === 0) {
        subCampaignsList.push(subCampaign.id);
      }
      subCampaign.ads.forEach((ads) => {
        if (ads.adsName === "") {
          adsList.push(ads.id);
        }
        if (ads.quantity < 1) {
          adsList.push(ads.id);
        }
      });
      if (
        subCampaign.name !== "" &&
        subCampaign.ads.some((ads) => ads.quantity < 1 || ads.adsName === "")
      ) {
        subCampaignsList.push(subCampaign.id);
      }
    });

    setErrorList((prev) => ({
      ...prev,
      subCampaignsList,
      adsList,
    }));

    console.log(subCampaignsList, adsList);
    if (
      subCampaignsList.length !== 0 ||
      adsList.length !== 0 ||
      data.information.name === ""
    ) {
      alert("Vui lòng điền đúng và đầy đủ thông tin");
    } else {
      alert("Thành công");
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        height={40}
        bgcolor={"#4e4e4e"}
        color={"white"}
        justifyContent={"center"}
      >
        <Box width={120} lineHeight={"center"} textAlign={"center"}>
          Yêu cầu
        </Box>
        <Box width={120} lineHeight={"center"} textAlign={"center"}>
          Demo
        </Box>
      </Box>
      <Box paddingTop={"20px"}>
        <Box display={"flex"} padding={"10px 20px"} justifyContent={"end"}>
          <Button variant="contained" onClick={handleValidation}>
            Submit
          </Button>
        </Box>
        <Divider />
        <Box
          marginTop={"20px"}
          marginX={"auto"}
          width={"96%"}
          sx={{ boxShadow: 1 }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid item xs={8}>
              <Box borderBottom={1} borderColor="#000">
                <Tabs
                  value={tabValue}
                  onChange={handleChangeTab}
                  aria-label="disabled tabs example"
                >
                  <Tab label="thông tin" />
                  <Tab label="chiến dịch con" />
                </Tabs>
              </Box>
              <Box padding={"8px"}>
                {tabValue === 0 ? (
                  <InformationPage
                    data={data}
                    errorList={errorList}
                    setData={setData}
                  />
                ) : (
                  <DetailCampaignPage
                    data={data}
                    setData={setData}
                    errorList={errorList}
                  />
                )}
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CampaignPage;
