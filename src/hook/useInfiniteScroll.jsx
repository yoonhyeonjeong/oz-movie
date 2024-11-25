import {useEffect, useRef} from "react";

const useInfiniteScroll = (callback, isLoading, hasMore) => {
    const observerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isLoading && hasMore) {
                    callback(); // 데이터 로드 함수 호출
                }
            },
            {threshold: 1.0}
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [callback, isLoading, hasMore]);

    return observerRef;
};

export default useInfiniteScroll;
