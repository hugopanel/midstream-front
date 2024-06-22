import { Suspense } from 'react';
import MyComponent from './MyComponent';
export default function ResetPwd() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MyComponent />
        </Suspense>);
}