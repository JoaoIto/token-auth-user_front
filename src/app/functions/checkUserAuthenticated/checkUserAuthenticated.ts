"use client"
import { getStorageItem } from '../getStorageItem/getStorageItem';

export const checkUserAuthenticated = () => {
    const userToken = getStorageItem();
    return !!userToken;
}