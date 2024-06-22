import { Suspense } from 'react';
import RegisterConfirm from './RegisterConfirm';
export default function RegisterTwo() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RegisterConfirm />
        </Suspense>);
}