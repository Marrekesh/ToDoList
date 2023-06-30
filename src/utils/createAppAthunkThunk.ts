import { createAsyncThunk } from "@reduxjs/toolkit";

import {AppThunkDispatchType, AppRootStateType} from "../state/store/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType;
    dispatch: AppThunkDispatchType;
    rejectValue: null;
}>();