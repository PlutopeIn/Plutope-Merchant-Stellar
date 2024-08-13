import dataService from "./dataService";
import { toast } from "react-toastify";

export const postApi = async (path, data,displayToast=true) => {
  try {
    let response = await dataService.post(path, data);
    if (response?.data?.status === 200 || response?.data?.status === 201) {
      if(displayToast)
      {
        toast.success(response?.data?.message);
      }
      return response.data;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const getApi = async (path) => {
  try {
    let response = await dataService.get(path);
    if (response?.data?.status === 200 || response?.data?.status === 201) {
      return response?.data?.data;
    }
  } catch (error) {}
};

export const postWithNavigate = async (path, data, navigate, navigatePath) => {
  try {
    let response = await dataService.post(path, data);
    if (response?.data?.status === 200 || response?.data?.status === 201) {
      toast.success(response?.data?.message);
      navigate(`/${navigatePath}`);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const postWithNavigateAndState = async (
  path,
  data,
  navigate,
  navigatePath,
  stateKeys = []
) => {
  try {
    let response = await dataService.post(path, data);
    if (response?.data?.status === 200 || response?.data?.status === 201) {
      toast.success(response?.data?.message);
      const state = stateKeys.reduce((acc, key) => {
        if (response?.data?.data[key]) {
          acc[key] = response?.data?.data[key];
        }
        return acc;
      }, {});
      navigate(`/${navigatePath}`, { state });
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const postWithNavigateAndDispatch = async (
  path,
  data,
  navigate,
  navigatePath,
  dispatch,
  action
) => {
  try {
    let response = await dataService.post(path, data);
    if (response?.data?.status === 200 || response?.data?.status === 201) {
      toast.success(response?.data?.message);
      dispatch(action(response?.data?.data));
      navigate(`/${navigatePath}`);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const postWithDispatch = async (path, dispatch, action) => {
  try {
    let response = await dataService.post(path);
    if (response?.data?.status === 200 || response?.data?.status === 201) {
      toast.success(response?.data?.message);
      dispatch(action(response?.data?.data));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
