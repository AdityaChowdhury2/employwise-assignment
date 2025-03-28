"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Pagination({
  totalPages,
  currentPage,
  basePath,
}: {
  totalPages: number;
  currentPage: number;
  basePath: string;
}) {
  const router = useRouter();
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          onClick={() => {
            // setCurrentPage(i);
            router.push(`${basePath}/${i}`);
          }}
          className="w-10 h-10"
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => {
          router.push(`${basePath}/${currentPage - 1}`);
        }}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex space-x-2"> {renderPaginationButtons()}</div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          router.push(`${basePath}/${currentPage + 1}`);
        }}
        // onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </>
  );
}
