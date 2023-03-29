import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  Distritos,
  Departamentos,
  Paises,
  Provincias,
} from './index'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function PageUbicacion() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', minHeight:"100vh",padding:"30px"}}>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Paises" {...a11yProps(0)} style={{textTransform:'capitalize',fontSize:"16px"}} />
          <Tab label="Departamentos" {...a11yProps(1)} style={{textTransform:'capitalize',fontSize:"16px"}}/>
          <Tab label="Provincias" {...a11yProps(2)} style={{textTransform:'capitalize',fontSize:"16px"}} />
          <Tab label="Distritos" {...a11yProps(3)}  style={{textTransform:'capitalize',fontSize:"16px"}}/>
        </Tabs>
      </Box>
      <div className="border bg-white rounded-b-lg shadow-md">
      <TabPanel value={value} index={0}>
        <Paises></Paises>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Departamentos></Departamentos>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Provincias></Provincias>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Distritos></Distritos>
      </TabPanel>
      </div>
    </Box>
  );
}