"use client";
import React, { useEffect, useState } from "react";


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

export default function Searchme() {
 
  const [searchText, setsearchText] = useState("Apple");
  const [apiData, setapiData] = useState<ApiResponse | null>(null);


  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setsearchText(event.currentTarget.value);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setapiData(data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, [searchText]);

  console.log(apiData);

  return (
    <>
      <div>
        <div className="text-container w-full h-1/4 flex justify-center items-center">
          {/* search icon  */}
          <span className="relative left-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </span>

          {/* input  */}
          <input
            type="text"
            name="text"
            id="text"
            onKeyDown={handleKeyDown}
            className="border-2 border-[#CED9E3] bg-[#F1F4F7] rounded-lg p-3 w-1/2 pl-12"
            placeholder="Search me"
          />
        </div>

        {/*dictionary*/}

        <div className="dictionary h-2/4 flex justify-center items-start py-5 rounded-lg">
          <div className="container border-2 border-[#CED9E3] h-5/6 w-1/2 p-3 rounded-lg flex flex-col justify-start">
            
            <div className="flex p-2 items-center">
              
              
              {apiData && Array.isArray(apiData) && (
                <div className="ml-4">{apiData[0]?.phonetic}</div>
              )}
            </div>
            
            {/* tags */}
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


    </>
  );
}
