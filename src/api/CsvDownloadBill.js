import React from "react";
import { Button } from "@chakra-ui/react";
import { TEST_URL } from "./URL";
import { MdDownload } from "react-icons/md";

const CsvDownloadButton = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch(`${TEST_URL}/api/admin/exportCsv`);

      if (!response.ok) {
        throw new Error("CSV generation failed");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bills.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  return (
    <div>
      <Button
        colorScheme="blue"
        size="md"
        borderRadius="md"
        fontWeight="semibold"
        rightIcon={<MdDownload />}
        onClick={handleDownload}
      >
        Download Bill CSV
      </Button>
    </div>
  );
};

export default CsvDownloadButton;
