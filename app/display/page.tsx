"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";

interface ApiResponse {
    word: string;
    phonetic: string;
    phonetics: {
      text: string;
      audio: string;
      sourceUrl: string;
      license: {
        name: string;
        url: string;
      };
    }[];
    meanings: {
      partOfSpeech: string;
      definitions: {
        definition: string;
        synonyms: string[];
        antonyms: string[];
      }[];
      synonyms: string[];
      antonyms: string[];
    }[];
  }

  export default function Page() {
    const [text,setText] = useState<string | null>("Apple")
    const searchParams = useSearchParams();

    useEffect(()=>{
        const search = searchParams.get("search")
        setText(search)
      },[searchParams])

      const [apiData, setapiData] = useState<ApiResponse | null>(null)
      
      const fetchData = async () => {
        try {
          const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          setapiData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();

      return(
        <div className='h-screen'>

        <div className="text-container w-full h-1/6 flex justify-center items-center">
          <p className='font-medium text-xl'>
  
             Word: <span> {apiData && Array.isArray(apiData) && (apiData[0]?.word)}</span> 
          </p>
        </div>
         {/*dictionary*/}

         <div className="dictionary h-2/4 flex justify-center items-start py-5 rounded-2xl">
         <div className="container border-2 border-[#CED9E3] h-5/6 w-1/2 p-3 rounded-2xl flex flex-col justify-start">
           
           <div className="flex p-2 items-center">
             
             
             {apiData && Array.isArray(apiData) && (
               <div className="ml-4">{apiData[0]?.phonetic}</div>
             )}
           </div>
           
          
           <div className="flex p-2">
             {apiData && Array.isArray(apiData) && (
               <div className="my-2 flex">
                 {apiData[0]?.meanings.map((meaning: any, index: number) => (
                   <div
                     key={index}
                     className={`${
                       meaning.partOfSpeech === "noun"
                         ? "bg-black text-white"
                         : "bg-[#DEDEDE]"
                     } px-4 mr-2 rounded-md`}
                   >
                     {meaning.partOfSpeech}
                   </div>
                 ))}
               </div>
             )}
           </div>

          
           <div className="flex p-2">
             <ul className=" ">
               {apiData &&
                 Array.isArray(apiData) &&
                 apiData[0]?.meanings
                   .slice(0, 1)
                   .map((meaning: any, index: number) => (
                     <li key={index}>
                       <ul>
                         {meaning.definitions
                           .slice(0, 2)
                           .map((definition: any, idx: number) => (
                             <li key={idx}>
                               {idx + 1}. {definition.definition}
                               <br />
                             </li>
                           ))}
                       </ul>
                     </li>
                   ))}
             </ul>
           </div>
         </div>
       </div>
     </div>

      );
    }
