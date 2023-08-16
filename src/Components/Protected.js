import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Protected(props) {
  const navigate = useNavigate();
  const userDetailList = useSelector((state) => state.userDetails);

  const { Component } = props;
  useEffect(() => {
    if (!Object.keys(userDetailList).length) {
      navigate("/");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
}
