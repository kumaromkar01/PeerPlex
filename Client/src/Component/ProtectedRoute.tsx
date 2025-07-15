import { useEffect, useState } from "react"
import { verify } from "../Services/api";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

interface props {
    children: React.ReactNode,
}

function ProtectedRoute({ children }: props) {

    const [loading, setloading] = useState(true);
    const [valid, setValid] = useState(false);
    useEffect(() => {

        const verification = async () => {
            const token = localStorage.getItem('token');
            if(!token){
                setloading(false);
                setValid(false);
                return;
            }
            setloading(true);
            try {
                const res = await verify(token as string);
                console.log(res);   
                if (res.status == 200) {
                    console.log('Yes'); 
                    setValid(true);
                }
            }
            catch (error) {
                toast.error(error as string);
                setValid(false);
            }
            finally {
                setloading(false);
            }
        }
        verification();

    }, [])
    if (loading) return <div>loading....</div>;

    if (!valid) {
        toast.error('invalid user token');
        return <Navigate to='/login' replace/>
    }

    if (valid) return <>{children}</>;
}

export default ProtectedRoute
