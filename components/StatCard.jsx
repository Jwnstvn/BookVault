import "../styles/StatCard.css";

function StatCard({ icon, title, value }) {
    return (
        <div className="stat-card">

            <div className="stat-icon">
                {icon}
            </div>

            <h3>{value}</h3>

            <p>{title}</p>

        </div>
    );
}

export default StatCard;