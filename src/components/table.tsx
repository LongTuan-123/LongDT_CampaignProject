import { useState } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Campaign, ErrorList } from "../interface";
import { generateUniqueId } from "../utils";
import CustomNumberInput from "./numberInput";

interface AdsTableProps {
  data: Campaign;
  currentSubCampaignIndex: number;
  errorList: ErrorList;
  setData: React.Dispatch<React.SetStateAction<Campaign>>;
}

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "adsName",
    numeric: false,
    disablePadding: true,
    label: "Tên quảng cáo",
  },
  {
    id: "adsQuantity",
    numeric: true,
    disablePadding: false,
    label: "Số lượng",
  },
  {
    id: "deleteAll",
    numeric: true,
    disablePadding: false,
    label: "Số lượng",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  handleCreateAds: () => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { handleCreateAds, onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all Ads",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => {
          if (headCell.id !== "deleteAll")
            return (
              <TableCell
                key={headCell.id}
                align={"left"}
                padding={headCell.disablePadding ? "none" : "normal"}
              >
                {headCell.label}
              </TableCell>
            );
          else
            return (
              <TableCell align="center">
                <Button
                  onClick={handleCreateAds}
                  variant="outlined"
                  startIcon={<AddIcon />}
                >
                  Thêm
                </Button>
              </TableCell>
            );
        })}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleDeleteMultipleAds: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, handleDeleteMultipleAds } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Danh sách quảng cáo
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteMultipleAds}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
    </Toolbar>
  );
}
export default function AdsTable({
  data,
  currentSubCampaignIndex,
  errorList,
  setData,
}: AdsTableProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const rows = [...data.subCampaigns[currentSubCampaignIndex].ads];

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }

    setSelected([]);
  };

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleCreateAds = () => {
    const newAds = {
      adsName: `Quảng cáo ${
        data.subCampaigns[currentSubCampaignIndex].ads.length + 1
      }`,
      quantity: 0,
      id: generateUniqueId(),
    };
    const updatedSubCampaigns = [...data.subCampaigns];
    updatedSubCampaigns[currentSubCampaignIndex].ads.push(newAds);

    setData((prevData) => ({
      ...prevData,
      subCampaigns: updatedSubCampaigns,
    }));
  };

  const handleChangeAdsName = (idToChange: string, newAdsName: string) => {
    const updatedSubCampaigns = [...data.subCampaigns];
    const currentSubCampaign = updatedSubCampaigns[currentSubCampaignIndex];
    const updatedAds = currentSubCampaign.ads.map((ad) =>
      ad.id === idToChange ? { ...ad, adsName: newAdsName } : ad
    );
    currentSubCampaign.ads = updatedAds;

    setData((prevData) => ({
      ...prevData,
      subCampaigns: updatedSubCampaigns,
    }));
  };

  const handleChangeAdsQuantity = (
    idToChange: string,
    adsQuantity: number | null
  ) => {
    if (adsQuantity) {
      const updatedSubCampaigns = [...data.subCampaigns];
      const currentSubCampaign = updatedSubCampaigns[currentSubCampaignIndex];
      const updatedAds = currentSubCampaign.ads.map((ad) =>
        ad.id === idToChange ? { ...ad, quantity: adsQuantity } : ad
      );
      currentSubCampaign.ads = updatedAds;

      setData((prevData) => ({
        ...prevData,
        subCampaigns: updatedSubCampaigns,
      }));
    }
  };

  const handleDeleteMultipleAds = () => {
    const updatedSubCampaigns = [...data.subCampaigns];
    const remainingIds: string[] = [];

    updatedSubCampaigns[currentSubCampaignIndex].ads = updatedSubCampaigns[
      currentSubCampaignIndex
    ].ads.filter((ad) => {
      if (!selected.includes(ad.id)) {
        remainingIds.push(ad.id);
        return true;
      }
      return false;
    });

    setData((prevData) => ({
      ...prevData,
      subCampaigns: updatedSubCampaigns,
    }));
    setSelected([]);
  };

  const handleDeleteAds = (idToDelete: string) => {
    const updatedSubCampaigns = [...data.subCampaigns];
    const updatedAds = updatedSubCampaigns[currentSubCampaignIndex].ads.filter(
      (ad) => ad.id !== idToDelete
    );
    updatedSubCampaigns[currentSubCampaignIndex].ads = updatedAds;

    setData((prevData) => ({
      ...prevData,
      subCampaigns: updatedSubCampaigns,
    }));
    setSelected((prev) => prev.filter((item) => item === idToDelete));
  };

  const isSelected = (id: string) => {
    return selected.indexOf(id) !== -1;
  };

  console.log(errorList);
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDeleteMultipleAds={handleDeleteMultipleAds}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
              handleCreateAds={handleCreateAds}
            />
            <TableBody>
              {data.subCampaigns[currentSubCampaignIndex].ads.map(
                (row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={() => handleClick(row.id)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <TextField
                          fullWidth={true}
                          id="description"
                          variant="standard"
                          required
                          error={errorList.adsList.includes(row.id)}
                          value={row.adsName}
                          sx={{ flex: 6 }}
                          onChange={(e) =>
                            handleChangeAdsName(row.id, e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell align="left">
                        <CustomNumberInput
                          value={row.quantity}
                          numberId={row.id}
                          isError={errorList.adsList.includes(row.id)}
                          handleChangeAdsQuantity={handleChangeAdsQuantity}
                        ></CustomNumberInput>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          disabled={selected.length > 0}
                          onClick={() => handleDeleteAds(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
