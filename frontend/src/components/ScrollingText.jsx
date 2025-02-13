// import { useState, useEffect } from "react";

// const ScrollingText = () => {
//     const [message, setMessage] = useState("Loading updates...");

//     useEffect(() => {
//         fetch("http://localhost:5001/api/updates")
//             .then((response) => response.json())
//             .then((data) => setMessage(data.message))
//             .catch((error) => console.error("Error fetching update:", error));
//     }, []);

//     return (
//         <div className="scrolling-text-container">
//             <p className="scrolling-text">{message}</p>
//         </div>
//     );
// };

// export default ScrollingText;
import { useState, useEffect } from "react";
import axios from "axios";

const ScrollingText = () => {
    const [message, setMessage] = useState("Loading updates...");

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/system/updates");
                setMessage(response.data.message);
            } catch (error) {
                setMessage("Unable to fetch updates");
            }
        };

        fetchMessage();
    }, []);

    return <div className="scrolling-text">{message}</div>;
};

export default ScrollingText;
