import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  CardTitle
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

// Custom Scrollbar
import SimpleBar from "simplebar-react";

// import images

import { CiCalendar } from "react-icons/ci";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { TbFileExport } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi2";
import { GoGraph } from "react-icons/go";
import { LuClipboardList } from "react-icons/lu";
import { LuMessageSquareWarning } from "react-icons/lu";
import { PiNetworkLight } from "react-icons/pi";


//i18n
import { withTranslation } from "react-i18next";
import axiosInstance from 'pages/Utility/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkOrders } from 'store/actions';
import { FadeLoader } from 'react-spinners';
import { formatDateTimeToAmPm } from 'helpers/dateFormat_helper';
import Cookies from 'js-cookie';
import BarChart from 'pages/AllCharts/chartjs/barchart';
import { set } from 'store';
import CountCard from 'components/cards/CountCard';

const Dashboard = props => {
  const [menu, setMenu] = useState(false);
  const [dashboardDetails, setDashboardDetails] = useState();
  const [dashboard, setDashboard] = useState()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState()
  // const id = JSON.parse(Cookies.get('authUser'))?.userId
  const permissions = [];

  // Selectors to access Redux state
  const workOrders = [];

  const toggle = () => {
    setMenu(!menu);
  };

  // const fetchDashboardDetails = async () => {
  //   try {
  //     const response = await axiosInstance('V1/dashboard/summary');
  //     setDashboardDetails(response?.data?.data);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   fetchDashboardDetails()
  // }, [])

  function formatDateToCustom(dateString) {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = date
      .toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }


  useEffect(() => {
    if (dashboard?.result2?.[0]?.MonthlyWiseTotalCount) {
      setData({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Work Orders",
            backgroundColor: "#02a499",
            borderColor: "#02a499",
            borderWidth: 1,
            hoverBackgroundColor: "#02a499",
            hoverBorderColor: "#02a499",
            data: [],
          },
        ],
      })
    }
  }, [dashboard]);

  const thStyle = {
    textAlign: 'left',
    padding: '12px',
    borderBottom: '1px solid rgb(241 241 241)',
    whiteSpace: 'nowrap',
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid rgb(241 241 241)',
    whiteSpace: 'nowrap',
  };

  const tdTitle = {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: '12px',
    borderBottom: '1px solid rgb(241 241 241)',
    whiteSpace: 'nowrap',
    color: "black",
    cursor: "default"
  }



  document.title = "Dashboard | Menahub-mvec";
  return (
    <React.Fragment>
      <div className="page-content d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
      <Container fluid className="py-4">
        <Row className="justify-content-center text-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm">
              <CardBody>
                <span style={{fontSize:'40px'}}>🚧</span>
                <h3 className="mb-3">We’re Working on Something Great!</h3>
                <p className="text-muted">
                  This section is currently under development. Stay tuned — exciting updates are on the way!
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any
};

// export default withTranslation()(Dashboard);
export default Dashboard;
