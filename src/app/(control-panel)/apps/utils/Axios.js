import axios from 'axios';
import _ from 'lodash';


export async function request(requestData, thunkAPI, configs=false) {
    let request = null;
    try{
        switch (requestData.type) {
            case 'POST': request = await axios.post(requestData.url, requestData.data, configs.header); break;
            case 'PUT': request = await axios.put(requestData.url, requestData.data, configs.header); break;
            case 'DELETE': request = await axios.delete(requestData.url); break;
            case 'PATCH': request = await axios.patch(requestData.url, requestData.data); break;
            case 'GET': request = await axios.get(requestData.url); break;
        }
        return request.data
    }catch (error) {
        console.log('fim erro requisição',error.response.data)
        return thunkAPI.rejectWithValue(error.response.data);
    }

}