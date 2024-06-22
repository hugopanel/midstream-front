import { Suspense } from 'react';
import Login from './Login';
export default function ResetPwd() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Login />
        </Suspense>);
}