import { useContext, useState ,useEffect} from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";



 
const PromptFilter = () => {

    const [prompt,setPrompt] =useState('');
    const [visible,setVisible]=useState(false);
    const location =useLocation();

    const [isLoading, setIsLoading] = useState(false);
    const {backendUrl, setAiSearchResults,aiShowSearch,setAiShowSearch} =useContext(ShopContext)

    const handleSubmit =async (e) =>{
        e.preventDefault();
        if (!prompt.trim()) return;
          setIsLoading(true);
          try {
            const response =await axios.post(backendUrl+'/api/ai/search', { prompt });
            setAiSearchResults(response.data)
            console.log("AI Response:", response.data);
          } catch (error) {
            console.error('AI search error:', error);
             toast.error(error.message);
          }finally {
      setIsLoading(false);
    }

    }
        useEffect(()=>{
            
            if(location.pathname.includes('collection')){
                setVisible(true);
            }
            else{
                setVisible(false);
            }
        },[location]);
   
  return  aiShowSearch && visible ?(
    <div className="border-t border-b bg-gray-50 text-center  py-4">
        <div className="relative flex items-center justify-center w-full px-4">
        <form onSubmit={handleSubmit} className="flex items-center justify-center border border-gray-400 px-5 py-2 w-full max-w-2xl bg-white">
            <input type="text" value={prompt} onChange={(e)=>setPrompt(e.target.value)}
            placeholder="Describe what you're looking for (e.g. 'Winter wear men jacket under 100')" 
                           className="flex-1 outline-none bg-transparent text-sm px-3 w-full min-w-[100px]"  />

            <button type="submit"
            className="ml-2 text-sm text-blue-500 whitespace-nowrap px-3"
            disabled={isLoading}>{isLoading ? 'Searching...' : 'Search'}</button>
        </form>
        <img onClick={()=> {setAiShowSearch(false)
        }} src={assets.cross_icon} className='absolute right-6 sm:right-[25%] p-1 w-4 h-4 cursor-pointer'/>
       </div>
    </div>
  ): null
}

export default PromptFilter