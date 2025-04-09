import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAdsMeta = createAsyncThunk('campaigns/getAdsMeta', async (form) =>{
    console.log('form', form);
    let url = `${import.meta.env.VITE_AWS_BACKEND}/meta/facebook/?token=${form.token}&init=${form.filters.date.since}&end=${form.filters.date.until}&breakdowns=${form.filters.breakDown}&group_day=${form.filters.groupDay}` 
    const response = await axios.get(url)
    return response.data
})

export const saveCopies = createAsyncThunk('campaigns/saveCopies', async (data) =>{
    let url = `${import.meta.env.VITE_AWS_BACKEND}/campaigns/save-campaigns/`
    return await axios.post(url,data)
})

export const saveMetas = createAsyncThunk('campaigns/saveMeta', async (data) =>{
    let url = `${import.meta.env.VITE_AWS_BACKEND}/meta/`
    return await axios.post(url,data)
})

export const getCopies = createAsyncThunk('campaigns/getCopies', async () =>{
    let url = `${import.meta.env.VITE_AWS_BACKEND}/product/`
    const response = await axios.get(url)
    console.log('response.data', response.data)
    return response.data
})

export const getMetas = createAsyncThunk('campaigns/getMetas', async () =>{
    let url = `${import.meta.env.VITE_AWS_BACKEND}/meta/`
    const response = await axios.get(url)
    console.log('response.data', response.data)
    return response.data
})

export const getCampaigns = createAsyncThunk('campaigns/getCampaigns', async () =>{
    let url = `${import.meta.env.VITE_AWS_BACKEND}/campaign/`
    const response = await axios.get(url)
    console.log('response.data', response.data)
    return response.data
})

export const getCampaignsHistory = createAsyncThunk('campaigns/getCampaignsHistory', async (filters) =>{
    let url = `${import.meta.env.VITE_AWS_BACKEND}/campaign_history_by_period/?date_init=` + filters.date_init + "&date_end=" + filters.date_end + "&range=" + filters.range
    const response = await axios.get(url)
    console.log('response.data', response.data)
    return response.data
})

//Metodos referente a sessão do facebook
export const metaTokenIsValid = createAsyncThunk('campaigns/metaTokenIsValid', async (token) =>{
    let url = `${import.meta.env.VITE_AWS_BACKEND}/meta-session/is_valid_token/?access_token=` + token
    const response = await axios.get(url)
    return response.data
})

export const metaAuthUrl = createAsyncThunk('campaigns/metaAuthUrl', async () =>{
    let url = `${import.meta.env.VITE_AWS_BACKEND}/meta-session/get_url/`
    const response = await axios.get(url)
    return response.data
})

export const metaGetAccessToken = createAsyncThunk('campaigns/metaGetAccessToken', async (code) =>{
    let url = `${import.meta.env.VITE_AWS_BACKEND}/meta-session/callback/?code=` + code
    const response = await axios.get(url)
    return response.data
})