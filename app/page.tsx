import Search from "./components/Search"

export default function Home(){
    return( 
        <div className="flex-col items-center ">

            <div className="w-2/3 h-16 border rounded-3xl mt-32 ml-56 bg-stone-100">
                <Search />
                
            </div>
        </div>
      

    )
}