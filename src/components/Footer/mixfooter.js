import Footer from "./footer";
import Sletter from "./Sletter";

const MixFooter = () => {
    return ( 
        <div className="relative">
            <div className="relative w-full flex justify-center"></div> 
            <div className="relative w-full flex justify-center">
                <Sletter />
            </div> 
            <div style={{backgroundColor:"rgb(234 234 234)"}} className="pt-48 -mt-48"> 
                <Footer />
            </div>
        </div>
    );
}
 
export default MixFooter;
