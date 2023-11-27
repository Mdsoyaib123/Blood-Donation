import axios from "axios";
import { useEffect, useState } from "react";

const useAddressData = () => {
    const [district, setDistrict] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    useEffect(() => {
        fetch("/districts.json")
          .then((res) => res.json())
          .then((data) => {
            setDistrict(data[2].data);
          });
          
        axios.get("/upazilas.json").then((res) => {
          setUpazilas(res.data[2].data);
        });

        
      }, []);
    return [district,upazilas]
};

export default useAddressData;