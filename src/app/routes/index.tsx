"use client"
import {ReactNode, useEffect} from "react";
import {useRouter} from "next/navigation";
import {checkUserAuthenticated} from "../functions/checkUserAuthenticated/checkUserAuthenticated";
import {APP_ROUTES} from "@/app/routes/app-routes";

type PrivateRouteProps = {
    children: ReactNode;
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
    const { push } = useRouter();

    const isUserAuthenticated = checkUserAuthenticated();

    useEffect(() => {
        if(!isUserAuthenticated){
            push(APP_ROUTES.public.register)
        }
    }, [isUserAuthenticated, push]);

    return(
        <>
            {!isUserAuthenticated && null}
    {isUserAuthenticated && children}
    </>
)
}

export default PrivateRoute;