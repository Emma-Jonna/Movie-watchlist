import { Link } from "react-router-dom";

type PropsType = {
    location: string,
    text: string,
}

export default function BackButton(props: PropsType) {
    return (
        <div className="movie-card-button-container">
            <Link className="movie-card-button" to={props.location}>
                {props.text}
            </Link>
        </div>
    )
}