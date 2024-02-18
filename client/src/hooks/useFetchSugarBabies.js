// src/hooks/useFetchSugarBabies.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSugarBabies } from "../features/users/userSlice";

const useFetchSugarBabies = () => {
  const dispatch = useDispatch();
  const sugarBabies = useSelector((state) => state.users.sugarBabies);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSugarBabies());
    }
  }, [status, dispatch]);

  return { sugarBabies, status, error };
};

export default useFetchSugarBabies;
