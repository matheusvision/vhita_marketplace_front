import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {request} from 'src/app/(control-panel)/apps/utils/Axios.js'

export const getMetrics = createAsyncThunk('campaigns/getMetrics', async (filters, thunkAPI) =>{
    let url = `${import.meta.env.VITE_AWS_BACKEND}/campaign_history_by_period/?date_init=` + filters['date_init'] + "&date_end=" + filters['date_end'] + "&range=" + filters['range'] + "&meta=" + filters['meta']
    return await request({
        type: 'GET', 
        url: url, 
    }, thunkAPI)
})