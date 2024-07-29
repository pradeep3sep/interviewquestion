import React, { useCallback, useRef, useState, useEffect } from 'react';
import styles from './index.module.css';

export default function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef();

  useEffect(() => {
    setLoading(true);
    setError(false);
    const controller = new AbortController();

    fetch(`https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=10`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setItems((prevItems) => [...new Set([...prevItems, ...data.map((b) => b.title)])]);
        setHasMore(!(data.at(-1)?.id === 5000 || data.length === 0));
        setLoading(false);
      })
      .catch((e) => {
        if (e.name === 'AbortError') return;
        setError(true);
      });

    return () => controller.abort();
  }, [pageNumber]);

  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  return (
    <>
      {items?.map((item, index) => {
        if (items.length === index + 1) {
          return (
            <div className={`${styles['book-title']}`} ref={lastBookElementRef} key={item}>
              {item}
            </div>
          );
        } else {
          return (
            <div className={`${styles['book-title']}`} key={item}>
              {item}
            </div>
          );
        }
      })}

      {loading && <div className={styles.loader}></div>}
      <div>{error && 'Error'}</div>
    </>
  );
}
