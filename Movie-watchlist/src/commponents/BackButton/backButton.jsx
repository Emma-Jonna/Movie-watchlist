import { Link, Navigate, useNavigate } from "react-router-dom";

export default function BackButton(props) {
    return (
        <div className="movie-card-button-container">
            <Link className="movie-card-button" to={props.location}>
                {props.text}
            </Link>
        </div>
    );
}
