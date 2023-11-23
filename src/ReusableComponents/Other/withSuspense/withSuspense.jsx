import React, { Suspense } from 'react'
import { Spinner } from 'reactstrap'

export function withSuspense(LazyLoadedComponent) {

    return (props) => {
        return <Suspense fallback={<Spinner />}>
            <LazyLoadedComponent {...props} />
        </Suspense>
    }
}
