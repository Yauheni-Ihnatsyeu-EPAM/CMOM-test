import axios from "axios";
import { useEffect, useState } from "react";
import { API as CoinsAPI } from '../utils/initiate.api';

interface RequestState<T> {
    loading: boolean;
    data?: T;
    error?: object;
}

type FetchFucntionType = (url: string, params?: {}) => Promise<void>;

export const useCoinsQuery = <T>(url: string, params: {} = {}):RequestState<T> & { fetchData: FetchFucntionType} => {

    const [status, setStatus] = useState<RequestState<T>>({
        loading: true,
        data: undefined,
        error: undefined
      });
    const fetchData: FetchFucntionType = async(url: string, params: {} = {}) => {
        
        CoinsAPI.get(url, { params })
        .then(function (response) {
           
            setStatus({loading: false, data: response.data});
        }).catch((error) => {
            setStatus({loading: false, error})
        });
      }
      useEffect(() => {fetchData(url, params)}, []);
      return {...status, fetchData};
}