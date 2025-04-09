import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const setMetricsFilter = createAsyncThunk(
    'metricsFilterApp/setMetricsFilters',
    async (form: { date_init: string; date_end: string; range: string, meta: string }, thunkAPI) => {
        return form;
    }
);


