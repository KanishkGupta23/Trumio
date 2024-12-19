import React from "react";
import "./scrapeDataCard.css"; // Optional for additional styling

const ScrapeDataCard = ({ scrapedData }) => {
  return (
    <div className="scrape-card bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-xl mb-4">Hey! I got your Data</h2>
        {scrapedData?(
            <div className="scrapedDetails">
                <p>{scrapedData}</p>
            </div>
        ):(
            <p>Data not found!</p>
        )
    }
    </div>
  );
}
export default ScrapeDataCard;
