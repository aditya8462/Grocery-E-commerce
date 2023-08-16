import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

const CurrentLogin = () => {
  const userDetailList = useSelector((state) => state.userDetails);
  return (
    <div>
      <Grid className="project__caddcontainer" container spacing={2}>
        <Grid className="project__caddbox" item xs={12}>
          <span class="project__address2">1</span>
          <div>
            <div className="project__dladress2">
              LOGIN
              <svg
                height="10"
                width="16"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="project__righticon"
              >
                <path
                  d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                  stroke="#2974f0"
                ></path>
              </svg>
            </div>
            <div className="project__caddressdetail">
              <span>
                <span class="project__cdname">
                  {userDetailList.firstname} {userDetailList.lastname}
                </span>
                <span class="project__clmobile">
                  +91{userDetailList.mobileno}
                </span>
              </span>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CurrentLogin;
