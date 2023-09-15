import React from "react";

const CsvDownloadButton = () => {
  const handleDownload = async () => {
    try {
      // Send a request to your backend API to generate the CSV
      const response = await fetch(
        "https://1cxmul59q5.execute-api.ap-south-1.amazonaws.com/api/admin/exportCsv"
      ); // Replace with your actual API endpoint

      if (!response.ok) {
        throw new Error("CSV generation failed");
      }

      // Convert the response to a Blob
      const blob = await response.blob();

      // Create a temporary URL to the Blob
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "bills.csv"; // Set the desired filename

      // Programmatically click the anchor to start the download
      a.click();

      // Clean up by revoking the temporary URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV:", error);
      // Handle the error as needed (e.g., show an error message)
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Bill CSV</button>
    </div>
  );
};

export default CsvDownloadButton;
