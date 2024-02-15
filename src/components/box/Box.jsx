import "./Box.css";

export default function Box({ children }) {
    return (
        <>
            <div className="box">
                { children }
            </div>
        </>
    )
}