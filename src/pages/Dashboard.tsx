import React from 'react';

const Dashboard = () => {
    // todo: data from store
    return (
        <div className="dashboard-container">
            <h1>Welcome to your Dashboard!</h1>
            <div className="cards-container">
                <div className="card">
                    <h2>My profile</h2>
                    <p></p>
                </div>
                <div className="card">
                    <h2>Add post</h2>
                    <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className="card">
                    <h2>Card 3</h2>
                    <p></p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
