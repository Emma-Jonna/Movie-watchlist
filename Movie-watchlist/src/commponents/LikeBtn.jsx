import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function LikeBtn({ Like }) {
    const [like, setLike] = useState(false)
    
    function clickLike() {
        setLike(!like);
    }
    
    /*  */
    Like ? setLike(true) : setLike(false);

    return <FontAwesomeIcon onClick={clickLike} icon={faHeart}  color={like ? "var(--flame)" : "var(--prussian-blue)"} />
}