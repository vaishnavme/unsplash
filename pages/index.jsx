import { useState, useEffect } from 'react';
import { Container, ImageDetails, ImageGrid } from '../components';
import styles from '../styles/Home.module.css';
import axios from 'axios';

//api variables
import { BASE_URL } from '../API';
const clientId = process.env.NEXT_PUBLIC_API_KEY;

export default function Home() {
   const [pageData, setPageData] = useState([]);
   const [isDataFetching, setDataFetching] = useState(false);
   const [page, setPage] = useState(1);

   // note self -> single image & modal
   const [isModalVisible, setModalVisible] = useState(false);
   const [imageInfo, setImageInfo] = useState(null);

   async function fetchData() {
      const urlPageNo = `&page=${page}`;
      const url = `${BASE_URL}/${urlPageNo}`;
      try {
         const response = await axios.get(
            `https://api.unsplash.com/photos?page=${page}`,
            {
               headers: {
                  Authorization: `Client-ID ${clientId}`
               }
            }
         );
         console.log(page);
         if (page === 1) {
            return setPageData(response.data);
         } else {
            setPageData((prevData) => [...prevData, ...response.data]);
            setDataFetching(false);
         }
      } catch (error) {
         console.log(error);
      }
   }

   const handleScroll = () => {
      if (
         window.innerHeight + document.documentElement.scrollTop >
         document.documentElement.offsetHeight
      ) {
         setPage((prevState) => prevState + 1);
         setDataFetching(true);
      }
   };

   useEffect(() => {
      if (!isDataFetching) return;
      fetchData();
   }, [isDataFetching]);

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   useEffect(() => {
      fetchData();
   }, []);

   const viewImageDetailsHandler = (image) => {
      setModalVisible(true);
      setImageInfo(image);
      console.log(image);
   };

   return (
      <Container>
         <h1>Image Gallary</h1>
         <ImageGrid
            pageData={pageData}
            showImageModal={viewImageDetailsHandler}
         />
         {isModalVisible && (
            <ImageDetails
               imageInfo={imageInfo}
               setModalVisible={setModalVisible}
            />
         )}
         {isDataFetching && <h1>Loading...</h1>}
      </Container>
   );
}
