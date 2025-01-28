import axios from "axios";
import React, { useEffect, useState } from "react";

const Data = () => {
  const [state, setState] = useState({ datas: [] });
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://servicecheckapp.vercel.app/api/technician/")
      .then((res) => {
        let data = res.data;
        console.log("technician name=", data);
        let old = { ...state };
        old.datas = data;
        setState(old);
      });
  };

  return (
    <div>
      {state.datas.map((item, i) => {
        return (
          <div>
            <p>{item.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Data;
