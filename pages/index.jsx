import { useState, useEffect, useRef, useCallback } from 'react';
import { Container, ImageDetails, ImageGrid } from '../components';
import axios from 'axios';

//api variables
import { BASE_URL } from '../API';
const clientId = process.env.NEXT_PUBLIC_API_KEY;

export default function Home() {
   const [pageData, setPageData] = useState([]);
   const [isLoading, setLoading] = useState(false);
   const [page, setPage] = useState(1);

   // note self -> single image & modal
   const [isModalVisible, setModalVisible] = useState(false);
   const [imageInfo, setImageInfo] = useState(null);

   // observer
   const observer = useRef();
   const lastElement = useCallback(
      (node) => {
         if (isLoading) return;
         if (observer.current) observer.current.disconnect();
         observer.current = new IntersectionObserver(
            (entries) => {
               if (entries[0].isIntersecting) {
                  //get first entrie of target element
                  setPage((prevPage) => prevPage + 1);
               }
            },
            { threshold: 1 }
         );
         // observe current node
         if (node) observer.current.observe(node);
      },
      [isLoading]
   );

   async function fetchData(page) {
      try {
         setLoading(true);
         const response = await axios.get(`${BASE_URL}page=${page}`, {
            headers: {
               Authorization: `Client-ID ${clientId}`
            }
         });
         setPageData((prevData) => [...prevData, ...response.data]);
         setLoading(false);
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   }

   useEffect(() => {
      fetchData(page);
   }, [page]);

   const viewImageDetailsHandler = (image) => {
      setModalVisible(true);
      setImageInfo(image);
      console.log(image);
   };

   return (
      <Container>
         <div className="header">
            <h1 className="heading">Image Gallery</h1>
         </div>
         {pageData.length > 0 && (
            <ImageGrid
               pageData={pageData}
               showImageModal={viewImageDetailsHandler}
               lastElementRef={lastElement}
            />
         )}
         {isModalVisible && (
            <ImageDetails
               imageInfo={imageInfo}
               setModalVisible={setModalVisible}
            />
         )}
         {isLoading && <i className="bx bx-loader-alt bx-spin"></i>}
      </Container>
   );
}
