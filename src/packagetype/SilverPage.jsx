import { Link } from "react-router-dom";
import "./GoldPage.css"

export default function SilverPage() {

    return(
        
    <div >
    
            <div className="confirmorder">
                 <h2>Silver package</h2>
                 <p>Price:2000 kr</p>
                 <p>Cleaner:2 per</p>
                 <div className="insert">
                    <input type="text" placeholder="Please insert your time" />
                    <input type="text" placeholder="date yyyy-mm-dd" />
                    <input type="text" placeholder="Please insert your mail" />
                    <input type="text" placeholder="Please insert your phone" />
                    <input type="text" placeholder="Please insert your adress" />
                 </div>
                    <Link style={{textDecoration:"none"}} to={""}>
                        <h2 style={{color:"#CBB26A"}}>Reserve</h2>
                    </Link> 
                    
                </div>

</div>)
};
